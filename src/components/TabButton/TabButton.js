import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {CustomColors} from '../../theme/CustomColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const TabButton = ({ref, onPress, title, icon, dotColor}) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      style={{
        marginHorizontal: wp(5),
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            height: hp(0.8),
            width: hp(0.8),
            backgroundColor: dotColor,
            borderRadius: 100,
            marginBottom: hp(0.8),
          }}></View>
        <Image
          resizeMode="contain"
          source={icon}
          style={{height: hp(5), width: hp(5)}}
        />
      </View>

      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: CustomColors.black,
          fontSize: hp(1.5),
          marginTop: hp(0.5),
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default TabButton;
