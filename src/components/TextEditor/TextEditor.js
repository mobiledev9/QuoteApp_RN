import React from 'react';
import {View, Text, StyleSheet, Modal, TextInput, Platform} from 'react-native';
import IconButton from '../IconButton/IconButton';
import {CustomColors} from '../../theme/CustomColors';
import {Img} from '../../theme/Img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const TextEditor = ({
  isOpen,
  isClose,
  isDelete,
  isDone,
  value,
  onChangeText,
}) => {
  return (
    <Modal visible={isOpen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton icon={Img.cancel} size={hp(4)} onPress={isClose} />
          <IconButton icon={Img.delete} size={hp(3)} onPress={isDelete} />
          <IconButton icon={Img.done} size={hp(3)} onPress={isDone} />
        </View>
        <View
          style={{
            backgroundColor: CustomColors.lightGray,
            height: Platform.OS == 'android' ? hp(90) : hp(80),
            marginHorizontal: wp(5),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            multiline
            placeholder="Quotes"
            placeholderTextColor={CustomColors.lightGray4}
            style={{
              width: '80%',
              textAlign: 'center',
              color: CustomColors.black,
              fontSize: hp(2.5),
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginTop: Platform.OS == 'android' ? 0 : hp(5),
  },
});

export default TextEditor;
