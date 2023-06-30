import React, {useRef} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DragTextEditor, DragTextRef} from 'react-native-drag-text-editor';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {Img} from '../../theme/Img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const DragTectEditot = ({quote, onChangeText, textStyles, onRotate}) => {
  const DragTextEditorRef = useRef();
  const sharedSliderValue = useSharedValue();

  const IconButton = ({icon, onPress}) => (
    <TouchableOpacity style={styles.cornerStyles} onPress={onPress}>
      <Image
        resizeMode="contain"
        source={icon}
        style={{height: hp(3), width: hp(3)}}
      />
    </TouchableOpacity>
  );
  const _cornerComponent = [
    {
      side: 'TR',
      customCornerComponent: () => <IconButton icon={Img.cancel} />,
    },
  ];
  const _rotateComponent = {
    side: 'top',
    customRotationComponent: () => <IconButton icon={Img.undo} />,
  };
  const _resizerSnapPoints = ['right'];

  return (
    <GestureHandlerRootView style={{...StyleSheet.absoluteFillObject}}>
      <DragTextEditor
        ref={ref => (DragTextEditorRef.current = ref)}
        placeholder="Quote"
        value={quote}
        onChangeText={onChangeText}
        visible={true}
        resizerSnapPoints={_resizerSnapPoints}
        cornerComponents={_cornerComponent}
        rotationComponent={_rotateComponent}
        externalTextStyles={textStyles}
        externalBorderStyles={styles.borderStyles}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  borderStyles: {
    borderStyle: 'solid',
    borderColor: 'gray',
  },
  textStyles: {
    color: '#fff',
  },
  cornerStyles: {
    padding: 1,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: 'white',
    borderColor: '#aaa',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DragTectEditot;
