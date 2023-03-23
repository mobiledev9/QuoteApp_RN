//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CustomColors} from '../../theme/CustomColors';
import {Img} from '../../theme/Img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';
import {Strings} from '../../theme/Strings';
import {Onboardingstyles} from './Onboardingstyles';

const ScreensData = [
  {
    logo: Img.logo1,
    quote: Strings.screen1text,
    author: '- MARTHA BECK',
    bottomlogo: Img.bottomlogo,
    suggestion: `Get your quote of the day and brighten your mornings.`,
  },
  {
    logo: Img.logo2,
    quote: Strings.screen2text,
    author: '- George Bernard Shaw',
    bottomlogo: Img.bottomlogo2,
    suggestion: `Create your own motivational quotes for yourself and people around you.`,
  },
  {
    logo: Img.logo3,
    quote: Strings.screen3text,
    author: '- Mother Teresa',
    suggestion: `Share quotes and feelings with your loved ones for your every mood.`,
  },
];

const renderItem = ({item, index}) => {
  return (
    <View style={Onboardingstyles.sliderview}>
      <Image
        resizeMode={item.logo === Img.logo3 ? 'stretch' : 'contain'}
        style={Onboardingstyles.mainlogo}
        source={item.logo}
      />
      <View style={{marginTop: hp(52.5), alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(8),
          }}>
          <FastImage
            source={Img.openQuote}
            style={{
              height: hp(3),
              width: hp(3),
              marginBottom: hp(2),
            }}
            tintColor={CustomColors.black}
          />
          <Text style={Onboardingstyles.mainquote}>{item.quote}</Text>
          <FastImage
            source={Img.closeQuote}
            style={{
              height: hp(3),
              width: hp(3),
              alignSelf: 'flex-end',
              // marginBottom: hp(1),
            }}
            tintColor={CustomColors.black}
          />
        </View>

        <Text style={Onboardingstyles.authortext}>{item.author}</Text>
      </View>
      <Text style={Onboardingstyles.suggestiontext}>{item.suggestion}</Text>
      <Image
        resizeMode="contain"
        style={Onboardingstyles.bottomlogo}
        source={item.bottomlogo}
      />
    </View>
  );
};

class OnBoarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIndex: 0,
    };
  }

  render() {
    return (
      <View style={Onboardingstyles.mainbg}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          horizontal={true}
          data={ScreensData}
          renderItem={renderItem}
          onScrollEndDrag={() => {}}
          onMomentumScrollEnd={event => {
            const index = Math.floor(
              Math.floor(event.nativeEvent.contentOffset.x) /
                Math.floor(event.nativeEvent.layoutMeasurement.width),
            );
            this.setState({
              isIndex: index,
            });
          }}
        />

        <View style={Onboardingstyles.paginationview}>
          {ScreensData.map((item, index) => (
            <View
              style={[
                Onboardingstyles.paginationdot,
                {
                  backgroundColor:
                    this.state.isIndex === index
                      ? CustomColors.authortext
                      : CustomColors.restdot,
                },
              ]}></View>
          ))}
        </View>

        {this.state.isIndex === 2 ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Homescreen');
            }}
            style={Onboardingstyles.bottomfilledbutton}>
            <Text style={Onboardingstyles.getstartedbutton}>
              {Strings.getstarted}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

export default OnBoarding;
