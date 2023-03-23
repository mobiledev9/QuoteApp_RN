import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import ColorPicker, {Panel1, HueSlider} from 'reanimated-color-picker';
import Slider from 'react-native-slider';
import {CustomColors} from '../../theme/CustomColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const ShadowModal = ({
  onChangeColor,
  onBlur,
  onLeftRight,
  onUpDown,
  xValue,
  yValue,
  bValue,
}) => {
  const TextSlider = ({
    name,
    onValueChange,
    minValue,
    maxvalue,
    value,
    step,
  }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          marginRight: wp(5),
          width: wp(20),
        }}>
        {name}
      </Text>
      <Slider
        value={value}
        onSlidingComplete={onValueChange}
        trackStyle={{height: 10, width: wp(55)}}
        maximumTrackTintColor={CustomColors.lightGray}
        minimumTrackTintColor={CustomColors.bottomtabbg}
        thumbTintColor={CustomColors.black}
        minimumValue={minValue}
        maximumValue={maxvalue}
        step={step}
      />
    </View>
  );

  return (
    <TouchableWithoutFeedback>
      <View
        onStartShouldSetResponder={() => true}
        style={{
          flex: 1,
        }}>
        <ColorPicker
          value={'red'}
          sliderThickness={25}
          thumbSize={20}
          onComplete={onChangeColor}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Panel1 style={styles.shadow} />
            <HueSlider
              thumbShape="pill"
              thumbSize={30}
              style={{...styles.shadow, marginVertical: hp(2)}}
              height={hp(5)}
              thumbColor="#00121a"
            />
          </View>
        </ColorPicker>
        <TextSlider
          name="Blur"
          onValueChange={onBlur}
          value={bValue}
          minValue={0}
          maxvalue={10}
          step={2}
        />
        <TextSlider
          name="Left-Right"
          onValueChange={onLeftRight}
          value={xValue}
          minValue={-4}
          maxvalue={4}
        />
        <TextSlider
          name="Up-down"
          onValueChange={onUpDown}
          value={yValue}
          minValue={-4}
          maxvalue={4}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  hueOpacityPreviewContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  shadow: {
    height: hp(10),
    width: wp(70),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default ShadowModal;
