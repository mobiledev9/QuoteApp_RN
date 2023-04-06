import React from 'react';
import {Text} from 'react-native';
import {HomeScreenStyles} from '../../screens/HomePage/HomeScreenStyles';

const MainHeader = ({HeaderText}) => {
  return <Text style={HomeScreenStyles.MainheaderText}>{HeaderText}</Text>;
};

export default MainHeader;
