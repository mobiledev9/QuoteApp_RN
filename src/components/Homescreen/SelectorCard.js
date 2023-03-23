import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Onboardingstyles} from '../OnBoarding/Onboardingstyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';
import {CustomColors} from '../../theme/CustomColors';
import {Img} from '../../theme/Img';
import {Strings} from '../../theme/Strings';
import {HomeScreenStyles} from '../../screens/HomePage/HomeScreenStyles';

const SelectorCard = ({CardText, CardIcon, hideText, MainStyle, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[MainStyle, HomeScreenStyles.SelectCardMainView]}>
      <Image
        resizeMode="contain"
        source={CardIcon}
        style={{height: hp(5), width: hp(5)}}
      />
      {hideText ? null : (
        <Text style={HomeScreenStyles.buttonText}>{CardText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SelectorCard;
