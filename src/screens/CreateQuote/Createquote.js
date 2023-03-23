import React, {Component, createRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  PanResponder,
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  Platform,
  TouchableNativeFeedback,
  LogBox,
  PermissionsAndroid,
} from 'react-native';
import Popover from 'react-native-popover-view';
import FastImage from 'react-native-fast-image';
import Tooltip from 'react-native-walkthrough-tooltip';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import RNImageToPdf from 'react-native-image-to-pdf';
import ViewShot from 'react-native-view-shot';
import tinycolor from 'tinycolor2';
import Share from 'react-native-share';
import ImagePicker from 'react-native-image-crop-picker';
import {openDatabase} from 'react-native-sqlite-storage';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {
  ColorMatrix,
  concatColorMatrices,
  contrast,
  saturate,
  brightness,
  temperature,
  hueRotate,
  grayscale,
  tint,
  sepia,
} from 'react-native-color-matrix-image-filters';
import CustomHeader from '../../components/CreateQuote/CustomHeader';
import {CustomColors} from '../../theme/CustomColors';
import {Img} from '../../theme/Img';
import {shareOption} from '../../theme/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';
import {Onboardingstyles} from '../OnBoarding/Onboardingstyles';
import ColorsSheet from '../../components/ColorsSheet/ColorsSheet';
import TextEditor from '../../components/TextEditor/TextEditor';
import TextEditorSheet from '../../components/TextEditorSheet/TextEditorSheet';
import ColorSlider from '../../components/ColorSlider/ColorSlider';
import FontSheet from '../../components/FontSheet/FontSheet';
import EffectModal from '../../components/EffectModal/EffectModal';
import ShadowModal from '../../components/ShadowModal/ShadowModal';
import StoreModal from '../../components/StoreModal/StoreModal';
import TabButton from '../../components/TabButton/TabButton';

var db = openDatabase({
  name: 'example.db',
  createFromLocation: 1,
});

class Createquote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPop: false,
      isIndex: 0,
      oldColor: '',
      showPicker: false,
      editorPosition: {x: 0, y: 0},
      text: '',
      pan: new Animated.ValueXY(),
      deg: 0,
      edittext: '',
      newheight: 50,
      newwidth: 80,
      isResize: false,
      isMore: 10,

      isOpenColorSheet: false,
      quoteBg: 'transparent',
      bgColor: null,
      bgImage: null,
      gradiantBgImage: null,
      isOpenTextEditor: false,
      quoteText: '',
      quoteSize: hp(2),
      quoteAlign: 'center',
      quoteLineSpace: 20,
      quoteLetterSpace: 0,
      quoteTextColor: CustomColors.white,
      quoteFontFamily: 'Poppins-Regular',
      quoteShadowColor: 'transparent',
      quoteShadowRadius: 0,
      quoteShadowOffsetWidth: 0,
      quoteShadowOffsetHeight: 0,

      blurOpacity: 0,
      brightness: 1,
      saturation: 1,
      contrast: 1,
      temperature: 0,
      hue: 0,
      grayscale: -1,
      tint: 0,
      sepia: 0,

      isQuoteBox: false,
      isColorModal: false,
      isFontModal: false,
      isShadowModal: false,
      isSaveModal: false,
      isShare: false,

      wallpapers: [],
    };

    this.viewRef = createRef();
    this.saveRef = createRef();
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
    this.getTemplates();
  }

  UNSAFE_componentWillMount() {
    this._val = {x: 0, y: 0};
    this.state.pan.addListener(value => (this._val = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event(
        [null, {dx: this.state.pan.x, dy: this.state.pan.y}],
        {useNativeDriver: false},
      ),
    });

    this.newResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => this.state.isResize,
      onPanResponderMove: (event, gestureState) => {
        this.setState(state => ({
          newheight: state.newheight + gestureState.dy,
          newwidth: state.newwidth + gestureState.dx,
        }));
      },
      onPanResponderRelease: () => this.setState({isResize: false}),
    });
  }

  myAsyncPDFFunction = async uri => {
    const date = new Date();
    try {
      const options = {
        imagePaths: [uri.replace('file://', '')],
        name: `${Math.floor(date.getTime() + date.getSeconds() / 2)}quote.pdf`,
        maxSize: {
          width: 900,
          height: 900,
        },
        quality: 0.7,
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);

      console.log(pdf);
      if (pdf.filePath) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        )
          .then(resp => {
            console.log(resp);
            RNFetchBlob.fs
              .cp(
                pdf.filePath,
                RNFetchBlob.fs.dirs.DocumentDir +
                  `/${pdf.filePath.split('/')[8]}`,
              )
              .then(() => {
                this.setState({isVisible: false});
                alert('succes');
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    } catch (e) {
      console.log(e);
    }
  };

  getTemplates = async () => {
    var data = [];
    await db.transaction(tx => {
      tx.executeSql('SELECT * FROM images', [], (tx, results) => {
        var len = results.rows.length;

        for (var i = 0; i < len; i++) {
          data = [...data, results.rows.item(i)];
        }
        this.setState({wallpapers: data});
      });
    });
  };

  storeQuotes = async uri => {
    RNFetchBlob.fs
      .readFile(uri, 'base64')
      .then(async data => {
        var base64Data = `data:image/png;base64,` + data;
        var date = new Date();

        await db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO Quotes (quote, createdAt) VALUES (?,?)',
            [base64Data, date.toISOString()],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                console.log('Data Inserted Successfully....');
              } else console.log('Failed....');
            },
          );
        });
      })
      .catch(err => console.log(err));
  };

  changeColor = (colorHsvOrRgb, resType) => {
    if (resType === 'end') {
      this.setState({
        quoteTextColor: tinycolor(colorHsvOrRgb).toHexString(),
      });
    }
  };

  shareCreatedQuote = async (uri, optionID) => {
    RNFetchBlob.fs
      .readFile(uri, 'base64')
      .then(async data => {
        var base64Data = `data:image/png;base64,` + data;

        optionID == 10 && Share.open({url: base64Data});
        const email = {
          email: 'email@example.com',
          social: Share.Social.EMAIL,
          failOnCancel: false,
          url: base64Data,
        };
        const option = {
          social:
            optionID == 2
              ? Share.Social.WHATSAPP
              : optionID == 3
              ? Share.Social.MESSENGER
              : optionID == 4
              ? Share.Social.FACEBOOK
              : optionID == 5
              ? Share.Social.TWITTER
              : optionID == 6
              ? Share.Social.INSTAGRAM
              : optionID == 7
              ? Share.Social.PINTEREST
              : optionID == 8
              ? Share.Social.LINKEDIN
              : Share.Social.SNAPCHAT,
          url: base64Data,
        };

        await Share.shareSingle(optionID == 1 ? email : option);
      })
      .catch(err => console.log(err));
  };

  isOpenImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({bgImage: image.path});
    });
  };

  render() {
    const {
      isIndex,
      quoteText,
      wallpapers,
      bgColor,
      bgImage,
      gradiantBgImage,
      newheight,
      newwidth,
      quoteBg,
      quoteLineSpace,
      quoteLetterSpace,
      quoteTextColor,
      quoteSize,
      quoteAlign,
      quoteFontFamily,
      quoteShadowColor,
      quoteShadowRadius,
      quoteShadowOffsetHeight,
      quoteShadowOffsetWidth,
      isSaveModal,
      isShare,
      isMore,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: CustomColors.primarybg}}>
        <View style={Onboardingstyles.mainbg}>
          <CustomHeader
            isBack={() => this.props.navigation.goBack()}
            saveRef={this.saveRef}
            iconRightColor={
              isSaveModal ? CustomColors.bottomtabbg : CustomColors.black
            }
            onSave={() => this.setState({isSaveModal: true})}
          />

          <ViewShot
            ref={this.viewRef}
            options={{fileName: 'img', format: 'jpg', quality: 0.9}}>
            <View
              style={{
                backgroundColor: CustomColors.bottomtabbg,
                height: Platform.OS == 'android' ? hp(68) : hp(60),
                width: wp(100),
              }}>
              {bgColor && typeof bgColor == 'object' ? (
                <LinearGradient
                  colors={bgColor}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}></LinearGradient>
              ) : bgColor && typeof bgColor == 'string' ? (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: bgColor,
                  }}></View>
              ) : (
                <TouchableNativeFeedback
                  onPress={() => this.setState({isQuoteBox: false})}>
                  <ColorMatrix
                    matrix={concatColorMatrices(
                      saturate(this.state.saturation),
                      contrast(this.state.contrast),
                      brightness(this.state.brightness),
                      temperature(this.state.temperature),
                      hueRotate(this.state.hue),
                      tint(this.state.tint),
                      sepia(this.state.sepia),
                      grayscale(this.state.grayscale),
                    )}>
                    <ImageBackground
                      resizeMode="stretch"
                      blurRadius={this.state.blurOpacity}
                      source={
                        gradiantBgImage
                          ? {uri: gradiantBgImage}
                          : bgImage
                          ? {uri: bgImage}
                          : Img.roadsample
                      }
                      style={{
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {quoteText && (
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Animated.View
                            {...this.panResponder.panHandlers}
                            style={{
                              borderWidth: this.state.isQuoteBox ? 1 : 0,
                              borderColor: CustomColors.white,
                              width: newwidth,
                              height: newheight,
                              marginHorizontal: wp(5),
                              transform: [
                                ...this.state.pan.getTranslateTransform(),
                                ...[{rotate: `${this.state.deg}deg`}],
                              ],
                            }}>
                            <View
                              style={{
                                width: newwidth,
                                height: newheight,
                                justifyContent: 'center',
                                // backgroundColor: 'red',
                              }}
                              {...this.newResponder.panHandlers}>
                              <Text
                                onPress={() =>
                                  this.setState({isQuoteBox: true})
                                }
                                style={{
                                  color: quoteTextColor,
                                  textAlignVertical: 'center',
                                  marginHorizontal: wp(2),
                                  fontSize: quoteSize,
                                  textAlign: quoteAlign,
                                  letterSpacing: quoteLetterSpace,
                                  lineHeight: quoteLineSpace,
                                  fontFamily: quoteFontFamily,
                                  textShadowColor: quoteShadowColor,
                                  textShadowRadius: quoteShadowRadius,
                                  textShadowOffset: {
                                    height: -quoteShadowOffsetHeight,
                                    width: quoteShadowOffsetWidth,
                                  },
                                }}>
                                {quoteText}
                              </Text>
                              {this.state.isQuoteBox && (
                                <>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({deg: this.state.deg + 90});
                                    }}
                                    style={{
                                      position: 'absolute',
                                      top: -20,
                                      alignSelf: 'center',
                                    }}>
                                    <Image
                                      source={Img.undo}
                                      style={{height: hp(3), width: hp(3)}}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      this.setState({isIndex: 0, quoteText: ''})
                                    }
                                    style={{
                                      position: 'absolute',
                                      top: -10,
                                      right: -10,
                                    }}>
                                    <Image
                                      resizeMode="contain"
                                      source={Img.cancel}
                                      style={{height: hp(3), width: hp(3)}}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onLongPress={() => {
                                      this.setState({
                                        isResize: true,
                                      });
                                    }}
                                    style={{
                                      position: 'absolute',
                                      right: -10,
                                      bottom: -10,
                                    }}>
                                    <Image
                                      source={Img.arrow}
                                      style={{height: hp(3), width: hp(3)}}
                                    />
                                  </TouchableOpacity>
                                </>
                              )}
                            </View>
                          </Animated.View>
                        </View>
                      )}
                    </ImageBackground>
                  </ColorMatrix>
                </TouchableNativeFeedback>
              )}
            </View>
          </ViewShot>
          {isIndex == 0 && (
            <View
              style={{
                backgroundColor: CustomColors.white,
                elevation: 5,
                width: wp(90),
                alignSelf: 'center',
                borderRadius: 10,
                marginTop: hp(2),
                padding: hp(1),
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isOpenColorSheet: true,
                    });
                  }}>
                  <Image
                    resizeMode="contain"
                    source={Img.colorpicker}
                    style={{height: hp(6), width: hp(6), marginRight: wp(2.5)}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    borderRightWidth: 1,
                    borderColor: CustomColors.bordercolor,
                  }}
                />
                <FlatList
                  data={wallpapers.slice(0, isMore)}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <Pressable
                      onPress={() =>
                        this.setState({
                          bgImage: 'data:image/png;base64,' + item.data,
                          gradiantBgImage: null,
                          bgColor: null,
                        })
                      }>
                      <FastImage
                        style={{
                          height: hp(6),
                          width: hp(6),
                          marginLeft: wp(2.5),
                          borderRadius: 10,
                        }}
                        source={{
                          uri: 'data:image/png;base64,' + item.data,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </Pressable>
                  )}
                />
                <TouchableOpacity
                  onPress={() => this.setState({isMore: isMore + 10})}>
                  <FastImage
                    source={Img.rightarrow}
                    style={{
                      height: hp(4),
                      width: hp(4),
                      marginVertical: hp(1),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {isIndex == 2 && (
            <View
              style={{
                backgroundColor: CustomColors.white,
                elevation: 5,
                width: wp(90),
                alignSelf: 'center',
                borderRadius: 10,
                marginTop: hp(2),
                padding: hp(1),
              }}>
              <TextEditorSheet
                isIncrease={() =>
                  this.setState({
                    quoteSize: quoteSize < 40 ? quoteSize + 2 : 40,
                    quoteLineSpace:
                      quoteSize < 40 ? quoteLineSpace + 5 : quoteLineSpace,
                  })
                }
                isDecrease={() =>
                  this.setState({
                    quoteSize: quoteSize > 15 ? quoteSize - 2 : 15,
                    quoteLineSpace:
                      quoteSize > 15 ? quoteLineSpace - 5 : quoteLineSpace,
                  })
                }
                isLeft={() => this.setState({quoteAlign: 'left'})}
                isCenter={() => this.setState({quoteAlign: 'center'})}
                isRight={() => this.setState({quoteAlign: 'right'})}
                isLineSpaceD={() =>
                  this.setState({
                    quoteLineSpace:
                      quoteLineSpace > 20 ? quoteLineSpace - 5 : quoteLineSpace,
                  })
                }
                isLineSpaceI={() =>
                  this.setState({
                    quoteLineSpace:
                      quoteLineSpace < 50 ? quoteLineSpace + 5 : quoteLineSpace,
                  })
                }
                isLetterSpaceD={() =>
                  this.setState({
                    quoteLetterSpace:
                      quoteLetterSpace > 0
                        ? quoteLetterSpace - 1
                        : quoteLetterSpace,
                  })
                }
                isLetterSpaceI={() =>
                  this.setState({
                    quoteLetterSpace:
                      quoteLetterSpace < 10
                        ? quoteLetterSpace + 1
                        : quoteLetterSpace,
                  })
                }
              />
            </View>
          )}
          {isIndex == 5 && (
            <EffectModal
              onBlur={val => this.setState({blurOpacity: val})}
              onBrightness={val => this.setState({brightness: val})}
              onContrast={val => this.setState({contrast: val == 0 ? 1 : val})}
              onSaturation={val =>
                this.setState({saturation: val == 0 ? 1 : val})
              }
              onTemperature={val => this.setState({temperature: val})}
              onHue={val => this.setState({hue: val})}
              onVintage={val => this.setState({grayscale: val})}
              onExposure={val => this.setState({tint: val})}
              onColorize={val => this.setState({sepia: val})}
              onxProcess={val => this.setState({night: val})}
            />
          )}

          <View
            style={{
              width: wp(100),
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: CustomColors.bottomtabbg,
              height: Platform.OS == 'android' ? hp(12) : hp(10),
              position: 'absolute',
              bottom: hp(0),
            }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              <TabButton
                onPress={() => {
                  this.isOpenImagePicker();
                  this.setState({
                    isIndex: 0,
                    showPop: true,
                  });
                }}
                title="Background"
                icon={isIndex == 0 ? Img.blackgallery : Img.gallery}
                dotColor={isIndex == 0 ? CustomColors.black : 'transparent'}
              />
              <TabButton
                onPress={() =>
                  this.setState({
                    isIndex: 1,
                    showPop: true,
                  })
                }
                title="Text"
                icon={isIndex == 1 ? Img.textblack : Img.text}
                dotColor={isIndex == 1 ? CustomColors.black : 'transparent'}
              />
              <TabButton
                onPress={() =>
                  this.setState({
                    isIndex: 2,
                    showPop: true,
                  })
                }
                title="Property"
                icon={isIndex == 2 ? Img.propertyblack : Img.property}
                dotColor={isIndex == 2 ? CustomColors.black : 'transparent'}
              />
              <Tooltip
                isVisible={this.state.isFontModal}
                disableShadow
                content={
                  <FontSheet
                    onSelect={font => this.setState({quoteFontFamily: font})}
                  />
                }
                contentStyle={{borderRadius: 10}}
                backgroundColor="transparent"
                placement="top"
                onClose={() => this.setState({isFontModal: false})}>
                <TabButton
                  onPress={() =>
                    this.setState({
                      isIndex: 3,
                      showPop: true,
                      isFontModal: true,
                    })
                  }
                  title="Font"
                  icon={isIndex == 3 ? Img.fontblack : Img.font}
                  dotColor={isIndex == 3 ? CustomColors.black : 'transparent'}
                />
              </Tooltip>

              <Tooltip
                isVisible={this.state.isColorModal}
                disableShadow
                closeOnContentInteraction={false}
                backgroundColor="transparent"
                content={
                  <ColorSlider
                    onChangeColor={color => {
                      this.setState({
                        quoteTextColor: color.hex,
                      });
                    }}
                  />
                }
                contentStyle={{
                  borderRadius: 10,
                  width: wp(90),
                  paddingVertical: hp(2),
                }}
                placement="top"
                onClose={() => this.setState({isColorModal: false})}>
                <TabButton
                  onPress={() =>
                    this.setState({
                      isIndex: 4,
                      showPop: true,
                      isColorModal: true,
                    })
                  }
                  title="Color"
                  icon={isIndex == 4 ? Img.colorblack : Img.color}
                  dotColor={isIndex == 4 ? CustomColors.black : 'transparent'}
                />
              </Tooltip>

              <TabButton
                onPress={() =>
                  this.setState({
                    isIndex: 5,
                    showPop: true,
                  })
                }
                title="Effect"
                icon={isIndex == 5 ? Img.effectblack : Img.effect}
                dotColor={isIndex == 5 ? CustomColors.black : 'transparent'}
              />
              <Tooltip
                isVisible={this.state.isShadowModal}
                disableShadow
                backgroundColor="transparent"
                closeOnContentInteraction={false}
                content={
                  <ShadowModal
                    xValue={quoteShadowOffsetWidth}
                    yValue={quoteShadowOffsetHeight}
                    bValue={quoteShadowRadius}
                    onBlur={val =>
                      this.setState({
                        quoteShadowRadius: Number(val.toFixed(2)),
                        quoteShadowColor: quoteShadowColor,
                      })
                    }
                    onLeftRight={val =>
                      this.setState({
                        quoteShadowOffsetWidth: Number(val.toFixed(2)),
                        quoteShadowColor: quoteShadowColor,
                      })
                    }
                    onUpDown={val =>
                      this.setState({
                        quoteShadowOffsetHeight: Number(val.toFixed(2)),
                        quoteShadowColor: quoteShadowColor,
                      })
                    }
                    onChangeColor={color => {
                      this.setState({
                        quoteShadowColor: color.hex,
                      });
                    }}
                  />
                }
                contentStyle={{
                  borderRadius: 10,
                  width: wp(90),
                  paddingVertical: hp(2),
                  paddingHorizontal: wp(4),
                }}
                placement="top"
                onClose={() => this.setState({isShadowModal: false})}>
                <TabButton
                  onPress={() =>
                    this.setState({
                      isIndex: 6,
                      showPop: true,
                      isShadowModal: true,
                    })
                  }
                  title="Shadow"
                  icon={isIndex == 6 ? Img.shadowblack : Img.shadow}
                  dotColor={isIndex == 6 ? CustomColors.black : 'transparent'}
                />
              </Tooltip>
            </ScrollView>
          </View>

          {/* Models and Popover Modals */}
          <ColorsSheet
            isOpen={this.state.isOpenColorSheet}
            isClose={() => {
              this.setState({isOpenColorSheet: false});
              this.viewRef.current
                .capture()
                .then(uri => {
                  this.setState({gradiantBgImage: uri, bgColor: null});
                  console.log('do something with ', uri);
                })
                .catch(err => console.log('err:', err));
            }}
            onChangeColor={item =>
              this.setState({
                bgColor: item,
              })
            }
          />

          <TextEditor
            isOpen={isIndex == 1}
            isClose={() => this.setState({isIndex: 0, quoteText: ''})}
            isDone={() => this.setState({isIndex: 0, isQuoteBox: true})}
            value={quoteText}
            onChangeText={text => this.setState({quoteText: text})}
          />

          <Popover
            from={this.saveRef}
            isVisible={isSaveModal}
            popoverStyle={{borderRadius: 10, marginTop: hp(2)}}
            arrowSize={{height: 0, width: 0}}
            onRequestClose={() => this.setState({isSaveModal: false})}>
            <StoreModal
              isShare={() =>
                Platform.OS == 'android'
                  ? this.setState({isSaveModal: false, isShare: true})
                  : (this.setState({isSaveModal: false}),
                    setTimeout(() => {
                      this.setState({isShare: true});
                    }, 2000))
              }
              isSavePDF={() => {
                this.viewRef.current.capture().then(uri => {
                  this.myAsyncPDFFunction(uri);
                });
              }}
              isSaveGallery={() => {
                this.viewRef.current.capture().then(uri => {
                  this.storeQuotes(uri);
                  CameraRoll.saveToCameraRoll(uri)
                    .then(
                      this.setState({isSaveModal: false}),
                      alert('Photo saved to Gallery'),
                    )
                    .catch(err => console.log('err:', err));
                });
              }}
            />
          </Popover>

          <Modal
            isVisible={isShare}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={() => this.setState({isShare: false})}>
            <View
              style={{
                backgroundColor: CustomColors.white,
                width: wp(100),
                alignSelf: 'center',
                bottom: hp(-3),
                position: 'absolute',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                paddingVertical: hp(4),
                paddingHorizontal: wp(2),
                alignItems: 'center',
              }}>
              <FlatList
                data={shareOption}
                numColumns={5}
                keyExtractor={item => item.id}
                contentContainerStyle={{margin: 4}}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.viewRef.current.capture().then(uri => {
                        this.shareCreatedQuote(uri, item.id);
                      })
                    }>
                    <Image
                      source={item.icon}
                      style={{
                        height: hp(7),
                        width: hp(7),
                        marginHorizontal: wp(1.5),
                        marginVertical: hp(4),
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>
          {/* Models and Popover Modals */}
        </View>
      </SafeAreaView>
    );
  }
}

export default Createquote;
