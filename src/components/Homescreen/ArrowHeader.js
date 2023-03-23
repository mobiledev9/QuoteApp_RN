import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';
import {Img} from '../../theme/Img';
import {HomeScreenStyles} from '../../screens/HomePage/HomeScreenStyles';

const ArrowHeader = ({HeaderText, isMore}) => {
  return (
    <View style={HomeScreenStyles.headerRowView}>
      <Text style={HomeScreenStyles.headerText}>{HeaderText}</Text>

      <TouchableOpacity onPress={isMore}>
        <Image
          resizeMode="contain"
          source={Img.rightarrow}
          style={{height: hp(3), width: hp(3)}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ArrowHeader;
