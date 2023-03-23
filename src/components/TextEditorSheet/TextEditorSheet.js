import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import IconButton from '../IconButton/IconButton';
import {Img} from '../../theme/Img';
import {CustomColors} from '../../theme/CustomColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const TextEditorSheet = ({
  isIncrease,
  isDecrease,
  isLeft,
  isCenter,
  isRight,
  isLineSpaceD,
  isLineSpaceI,
  isLetterSpaceD,
  isLetterSpaceI,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={styles.text}>Text size</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <IconButton icon={Img.increase} size={hp(4)} onPress={isIncrease} />
          <IconButton icon={Img.decrease} size={hp(4)} onPress={isDecrease} />
        </View>
      </View>
      <View>
        <Text style={styles.text}>Text alignment</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp(1),
          }}>
          <IconButton icon={Img.alignLeft} size={hp(3)} onPress={isLeft} />
          <IconButton icon={Img.alignCenter} size={hp(3)} onPress={isCenter} />
          <IconButton icon={Img.alignRight} size={hp(3)} onPress={isRight} />
        </View>
      </View>
      <View>
        <Text style={styles.text}>Line spacing</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <IconButton
            icon={Img.lineSpace1}
            size={hp(3)}
            onPress={isLineSpaceI}
          />
          <IconButton
            icon={Img.lineSpace2}
            size={hp(4)}
            onPress={isLineSpaceD}
          />
        </View>
      </View>
      <View>
        <Text style={styles.text}>Letter spacing</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <IconButton
            icon={Img.letterSpace1}
            size={hp(4)}
            onPress={isLetterSpaceI}
          />
          <IconButton
            icon={Img.letterSpace2}
            size={hp(4)}
            onPress={isLetterSpaceD}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: hp(1.5)},
});

export default TextEditorSheet;
