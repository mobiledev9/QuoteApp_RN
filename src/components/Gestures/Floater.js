import React from 'react';
import {View, Text} from 'react-native';

export const LeftSwipeActions = () => {
  return (
    <View
      style={{flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center'}}
    >
      <Text
        style={{
          color: '#40394a',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        Bookmark
      </Text>
    </View>
  );
};
export const rightSwipeActions = () => {
  return (
    <View
      style={{
        backgroundColor: '#ff8303',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <Text
        style={{
          color: '#1b1a17',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        Delete
      </Text>
    </View>
  );
};
export const swipeFromLeftOpen = () => {
  alert('Swipe from left');
};
export const swipeFromRightOpen = () => {
  alert('Swipe from right');
};
