import React, {Component} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomHeader from '../../components/CreateQuote/CustomHeader';
import {CustomColors} from '../../theme/CustomColors';
import {Img} from '../../theme/Img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

export default class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: [Img.bg1, Img.bg2, Img.bg3, Img.bg4, Img.bg5, Img.bg6],
    };
  }

  render() {
    const {background} = this.state;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: CustomColors.primarybg}}>
        <CustomHeader
          isBack={() => this.props.navigation.goBack()}
          title={'Life Quotes'}
        />
        <FlatList
          data={background}
          contentContainerStyle={{
            width: wp(100),
            alignItems: 'center',
          }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <FastImage
              resizeMode="cover"
              source={item}
              style={{
                height: hp(30),
                width: wp(42),
                margin: wp(3),
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: wp(5),
              }}>
              <FastImage
                source={Img.openQuote}
                style={{height: hp(3), width: hp(3), alignSelf: 'flex-start'}}
                tintColor={CustomColors.white}
              />
              <Text
                style={{
                  color: CustomColors.white,
                  fontSize: hp(1.9),
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'center',
                }}>
                The greatest glory in living lies not in never falling, but in
                rising every time we fall.
              </Text>
              <FastImage
                source={Img.closeQuote}
                style={{height: hp(3), width: hp(3), alignSelf: 'flex-end'}}
                tintColor={CustomColors.white}
              />
            </FastImage>
          )}
        />
      </SafeAreaView>
    );
  }
}
