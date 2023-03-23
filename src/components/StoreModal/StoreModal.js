import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CustomColors} from '../../theme/CustomColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const StoreModal = ({isShare, isSavePDF, isSaveJPG, isSaveGallery}) => {
  const Button = ({title, onPress}) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        paddingVertical: hp(0.3),
        backgroundColor: CustomColors.white,
        marginVertical: hp(0.5),
        paddingHorizontal: wp(4),
      }}>
      <Text
        style={{
          textAlign: 'left',
          fontFamily: 'Poppins-Regular',
          fontSize: hp(2),
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={{width: wp(50), alignItems: 'center', paddingVertical: hp(1)}}>
      <Button title="Share" onPress={isShare} />
      <Button title="Save as PDF" onPress={isSavePDF} />
      <Button title="Save as JPG" onPress={isSaveJPG} />
      <Button title="Save to Gallery" onPress={isSaveGallery} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StoreModal;
