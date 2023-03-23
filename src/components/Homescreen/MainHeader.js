//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Onboardingstyles} from '../OnBoarding/Onboardingstyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';
import {CustomColors} from '../../theme/CustomColors';
import {Img} from '../../theme/Img';
import {Strings} from '../../theme/Strings';
import SelectorCard from '../../components/Homescreen/SelectorCard';
import ArrowHeader from '../../components/Homescreen/ArrowHeader';
import { HomeScreenStyles } from '../../screens/HomePage/HomeScreenStyles';

const MainHeader = ({HeaderText}) => {
  return (
    <Text
      style={HomeScreenStyles.MainheaderText}
    >
      {HeaderText}
    </Text>
  );
};

export default MainHeader;
