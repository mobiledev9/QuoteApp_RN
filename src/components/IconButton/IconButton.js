import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const IconButton = ({icon, onPress, size, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icon}
        resizeMode="center"
        style={{height: size, width: size, tintColor: color}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default IconButton;
