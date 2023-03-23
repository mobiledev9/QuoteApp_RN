import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
// import {HueSaturationValuePicker} from 'react-native-reanimated-color-picker';
import ColorPicker, {
  Panel1,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import {CustomColors} from '../../theme/CustomColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const ColorSlider = ({onChangeColor}) => {
  return (
    <TouchableWithoutFeedback>
      <View
        onStartShouldSetResponder={() => true}
        style={{
          flex: 1,
          backgroundColor: CustomColors.white,
        }}>
        <ColorPicker
          value={'red'}
          sliderThickness={25}
          thumbSize={20}
          onComplete={onChangeColor}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Panel1 style={styles.shadow} />

            <View style={styles.hueOpacityPreviewContainer}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <HueSlider
                  thumbSize={30}
                  thumbShape="pill"
                  style={[{marginBottom: hp(2)}, styles.shadow]}
                  thumbColor="#00121a"
                />
                <OpacitySlider
                  thumbSize={30}
                  thumbShape="pill"
                  style={styles.shadow}
                  thumbColor="#00121a"
                />
              </View>
            </View>
          </View>
        </ColorPicker>
        {/* <HueSaturationValuePicker
          thumbSize={20}
          wheelStyle={{flex: 1, alignSelf: 'center'}}
          sliderStyle={{height: 20, width: wp(50)}}
          onColorChangeComplete={onChangeColor}
        /> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ColorSlider;

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
