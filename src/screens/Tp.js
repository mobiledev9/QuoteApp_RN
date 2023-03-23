import React, { useState } from 'react';
import { View, Button, PanResponder, Animated, StyleSheet } from 'react-native';

const Tp = () => {
  const [pan, setPan] = useState(new Animated.ValueXY());
  const [isPressed, setIsPressed] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => isPressed,
    onPanResponderMove: (e, gesture) => {
      Animated.event([null, { dx: pan.x, dy: pan.y }])(e, gesture);
    },
    onPanResponderRelease: () => setIsPressed(false),
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[pan.getLayout(), styles.view]}
        {...panResponder.panHandlers}
      >
        <Button
          title="Press me"
          onPress={() => setIsPressed(true)}
          style={styles.button}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default Tp;