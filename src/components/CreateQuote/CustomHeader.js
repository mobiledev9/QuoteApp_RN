import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {CustomColors} from '../../theme/CustomColors';
import {Img} from '../../theme/Img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const CustomHeader = ({onSave, saveRef, iconRightColor, isBack, title}) => {
  return (
    <View
      style={{
        height: hp(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity style={{marginLeft: wp(2.5)}} onPress={isBack}>
        <Image
          resizeMode="contain"
          source={Img.leftarrow}
          style={{height: hp(2.8), width: hp(6.4)}}
        />
      </TouchableOpacity>
      {title && (
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: hp(2),
            color: CustomColors.black,
          }}>
          {title}
        </Text>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            source={Img.home}
            style={{height: hp(3.5), width: hp(3.5)}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} ref={saveRef}>
          <Image
            resizeMode="contain"
            source={Img.save}
            style={{
              height: hp(2.9),
              width: hp(2.9),
              marginHorizontal: wp(4),
              tintColor: iconRightColor,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
