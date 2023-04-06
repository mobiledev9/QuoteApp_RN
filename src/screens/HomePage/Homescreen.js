import React, {Component, createRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image';
import {openDatabase} from 'react-native-sqlite-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import ViewShot from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import {showMessage} from 'react-native-flash-message';
import {Onboardingstyles} from '../OnBoarding/Onboardingstyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';
import {CustomColors} from '../../theme/CustomColors';
import {Img} from '../../theme/Img';
import {Strings} from '../../theme/Strings';
import SelectorCard from '../../components/Homescreen/SelectorCard';
import ArrowHeader from '../../components/Homescreen/ArrowHeader';
import MainHeader from '../../components/Homescreen/MainHeader';
import {HomeScreenStyles} from './HomeScreenStyles';

var db = openDatabase({
  name: 'example.db',
  createFromLocation: 1,
});
const Categories = [
  {name: 'Sad', img: Img.sadcircle},
  {name: 'Life', img: Img.lifecircle},
  {name: 'Love', img: Img.lovecircle},
  {name: 'Happy', img: Img.happycircle},
  {name: 'Hope', img: Img.birdcircle},
  {name: 'Travel', img: Img.travelcircle},
  {name: 'Trust', img: Img.trustcircle},
  {name: 'Friends', img: Img.friendscircle},
];

class Homescreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copyQuote: '',
      quoteOfday: Strings.screen1text,
      quotes: [],
      isShare: false,
    };
    this.viewRef = createRef();
  }
  componentDidMount() {
    this.getStoredQuotes();
    this.props.navigation.addListener('focus', () => {
      this.getStoredQuotes();
    });
  }

  getStoredQuotes = async () => {
    var data = [];
    await db.transaction(tx => {
      tx.executeSql('SELECT * FROM Quotes', [], (tx, results) => {
        var len = results.rows.length;

        for (var i = 0; i < len; i++) {
          data = [...data, results.rows.item(i)];
        }
        this.setState({quotes: data.reverse()});
      });
    });
  };

  render() {
    const {quotes, quoteOfday} = this.state;
    return (
      <SafeAreaView style={Onboardingstyles.mainbg}>
        <MainHeader HeaderText={Strings.createquote} />
        <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          <ViewShot
            ref={this.viewRef}
            options={{
              fileName: 'img',
              format: 'jpg',
              quality: 0.9,
              width: wp(90),
              borderRadius: 10,
              backgroundColor: CustomColors.white,
            }}
            style={{
              width: wp(90),
              height: hp(30),
              alignSelf: 'center',
              marginTop: hp(3),
            }}>
            <FastImage
              resizeMode="stretch"
              style={{flex: 1}}
              source={Img.quotebox}>
              <View style={HomeScreenStyles.mainCardViewImageBG}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: hp(2.5),
                    color: CustomColors.black,
                  }}>
                  {Strings.quoteofday}
                </Text>
                {!this.state.isShare && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({isShare: true});
                      this.viewRef.current.capture().then(uri => {
                        RNFetchBlob.fs
                          .readFile(uri, 'base64')
                          .then(async data => {
                            var base64Data = `data:image/png;base64,` + data;
                            await Share.open({url: base64Data});
                          })
                          .catch(err => console.log(err));
                      });
                    }}>
                    <Image
                      resizeMode="contain"
                      source={Img.share}
                      style={{height: hp(4), width: hp(4)}}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: wp(2),
                  width: wp(45),
                  bottom: hp(8),
                  position: 'absolute',
                }}>
                <Text
                  style={[
                    Onboardingstyles.mainquote,
                    {
                      fontSize: hp(2),
                      alignSelf: 'center',
                      marginTop: hp(2),
                      fontFamily: 'JosefinSans-Medium',
                    },
                  ]}>
                  <FastImage
                    source={Img.openQuote}
                    style={{
                      height: hp(2.5),
                      width: hp(2.5),
                    }}
                    tintColor={CustomColors.black}
                  />{' '}
                  {quoteOfday}{' '}
                  <FastImage
                    source={Img.closeQuote}
                    style={{
                      height: hp(2.5),
                      width: hp(2.5),
                    }}
                    tintColor={CustomColors.black}
                  />
                </Text>
              </View>
              {!this.state.isShare && (
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(quoteOfday);
                    showMessage({
                      message: 'Copied',
                      type: 'info',
                      position: 'bottom',
                    });
                  }}
                  style={{position: 'absolute', bottom: wp(5), right: wp(5)}}>
                  <Image
                    resizeMode="contain"
                    source={Img.copy}
                    style={{height: hp(4), width: hp(4)}}
                  />
                </TouchableOpacity>
              )}
            </FastImage>
          </ViewShot>
          <ArrowHeader
            HeaderText={'Create Quotes'}
            isMore={() =>
              this.props.navigation.navigate('CreatedQuotes', {quotes})
            }
          />
          <View style={{marginHorizontal: wp(2.5), flexDirection: 'row'}}>
            <SelectorCard
              onPress={() => {
                this.props.navigation.navigate('Createquote');
              }}
              MainStyle={{marginRight: wp(2)}}
              hideText
              CardIcon={Img.plus}
            />
            {quotes.length > 0 && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={quotes.slice(0, 5)}
                renderItem={({item}) => (
                  <FastImage
                    source={{uri: item.quote}}
                    style={{
                      width: wp(20.5),
                      height: wp(30),
                      marginHorizontal: wp(2),
                      borderRadius: 10,
                    }}
                  />
                )}
              />
            )}
          </View>

          <ArrowHeader HeaderText={'Quote Categories'} />
          <View style={{marginLeft: wp(2.5)}}>
            <FlatList
              scrollEnabled={false}
              numColumns={4}
              data={Categories}
              renderItem={({item}) => (
                <SelectorCard
                  onPress={() => this.props.navigation.navigate('Quotes')}
                  MainStyle={{marginBottom: hp(2.5)}}
                  CardText={item.name}
                  CardIcon={item.img}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Homescreen;
