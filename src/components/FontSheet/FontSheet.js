import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import {CustomColors} from '../../theme/CustomColors';
import {fonts} from '../../theme/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const FontSheet = ({onSelect}) => {
  return (
    <TouchableWithoutFeedback>
      <View
        onStartShouldSetResponder={() => true}
        style={{
          height: hp(50),
          width: wp(50),
          backgroundColor: CustomColors.white,
          // alignItems: 'center',
        }}>
        <FlatList
          data={fonts}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Pressable onPress={() => onSelect(item.font)}>
              <Text
                style={{
                  fontFamily: item.font,
                  textAlign: 'center',
                  margin: hp(1),
                }}>
                {item.text}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default FontSheet;
