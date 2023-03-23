import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Pressable, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {CustomColors} from '../../theme/CustomColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const EffectModal = ({
  onBlur,
  onBrightness,
  onVintage,
  onContrast,
  onSaturation,
  onExposure,
  onxProcess,
  onTemperature,
  onHue,
  onColorize,
  value,
}) => {
  const [isFffect, setEffect] = useState('Blur');
  const effects = [
    {id: 1, name: 'Blur'},
    {id: 2, name: 'Brightness'},
    {id: 3, name: 'Contrast'},
    {id: 4, name: 'Saturation'},
    {id: 5, name: 'Exposure'},
    {id: 6, name: 'xProcess'},
    {id: 7, name: 'Temperature'},
    {id: 8, name: 'Hue'},
    {id: 9, name: 'Colorize'},
    {id: 10, name: 'Vintage'},
  ];
  return (
    <View style={styles.container}>
      <Slider
        step={1}
        minimumValue={
          isFffect == 'Blur' ? 0 : isFffect == 'Brightness' ? 1 : -5
        }
        maximumValue={isFffect == 'Blur' || isFffect == 'Brightness' ? 5 : 5}
        minimumTrackTintColor={
          isFffect == 'Blur' || isFffect == 'Brightness'
            ? CustomColors.bottomtabbg
            : CustomColors.lightGray
        }
        maximumTrackTintColor={
          isFffect == 'Blur' || isFffect == 'Brightness'
            ? CustomColors.lightGray
            : CustomColors.bottomtabbg
        }
        value={0}
        style={{width: wp(80)}}
        thumbTintColor={CustomColors.black}
        onValueChange={
          isFffect == 'Blur'
            ? onBlur
            : isFffect == 'Brightness'
            ? onBrightness
            : isFffect == 'Contrast'
            ? onContrast
            : isFffect == 'Saturation'
            ? onSaturation
            : isFffect == 'Exposure'
            ? onExposure
            : isFffect == 'xProcess'
            ? onxProcess
            : isFffect == 'Temperature'
            ? onTemperature
            : isFffect == 'Hue'
            ? onHue
            : isFffect == 'Colorize'
            ? onColorize
            : onVintage
        }
        inverted={isFffect == 'Blur' || isFffect == 'Brightness' ? false : true}
      />
      {/* <Slider
        value={0}
        useNativeDriver={true}
        onValueChange={onValueChange}
        minimumValue={isFffect == 'Blur' ? 0 : -50}
        maximumValue={isFffect == 'Blur' ? 1 : 50}
        trackStyle={{
          height: 10,
        }}
        maximumTrackTintColor={CustomColors.lightGray}
        minimumTrackTintColor={CustomColors.bottomtabbg}
        thumbStyle={{backgroundColor: CustomColors.black}}
        inverted
      /> */}
      <FlatList
        data={effects}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            style={{marginHorizontal: wp(2)}}
            onPress={() => setEffect(item.name)}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: hp(1.8),
                color:
                  isFffect == item.name
                    ? CustomColors.bottomtabbg
                    : CustomColors.black,
              }}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.white,
    elevation: 5,
    width: wp(90),
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: hp(2),
    padding: hp(1),
  },
});

export default EffectModal;
