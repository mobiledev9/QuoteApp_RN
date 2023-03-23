import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {CustomColors} from '../../theme/CustomColors';
import {Colors, GradiantColors} from '../../theme/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const ColorsSheet = ({isOpen, onChangeColor, isClose}) => {
  const [tab, setTab] = useState(0);
  const [id, setId] = useState();

  const TabItem = ({
    title,
    onPress,
    bgColor,
    titleColor,
    borderRight,
    borderLeft,
  }) => (
    <TouchableOpacity
      style={{
        ...styles.tabItem,
        backgroundColor: bgColor,
        borderRightWidth: borderRight,
        borderLeftWidth: borderLeft,
      }}
      onPress={onPress}>
      <Text style={{color: titleColor}}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <Modal isVisible={isOpen} onBackdropPress={isClose} backdropOpacity={0}>
      <View style={styles.conatiner}>
        <View style={styles.tabView}>
          <TabItem
            onPress={() => {
              setId();
              setTab(0);
            }}
            title="Color"
            bgColor={tab == 0 ? CustomColors.authortext : CustomColors.white}
            titleColor={tab == 0 ? CustomColors.white : CustomColors.black}
            borderRight={tab == 0 ? 1 : 0}
          />
          <TabItem
            onPress={() => {
              setId();
              setTab(1);
            }}
            title="Gradient"
            bgColor={tab == 1 ? CustomColors.authortext : CustomColors.white}
            titleColor={tab == 1 ? CustomColors.white : CustomColors.black}
            borderLeft={tab == 1 ? 1 : 0}
          />
        </View>
        <View style={{marginBottom: hp(5), paddingVertical: hp(1)}}>
          {tab == 0 ? (
            <FlatList
              data={Colors}
              contentContainerStyle={{
                alignItems: 'center',
              }}
              showsVerticalScrollIndicator={false}
              numColumns={7}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    setId(item.id);
                    onChangeColor(item.code.hex);
                  }}
                  style={{
                    ...styles.colorItem,
                    backgroundColor: item.code.hex,
                    borderWidth: item.id == id ? 2 : 0,
                    borderColor: CustomColors.blue,
                  }}
                />
              )}
            />
          ) : (
            <FlatList
              data={GradiantColors}
              contentContainerStyle={{alignItems: 'center'}}
              showsVerticalScrollIndicator={false}
              numColumns={7}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <Pressable
                  onPress={() => {
                    setId(index);
                    onChangeColor(item.colors);
                  }}>
                  <LinearGradient
                    colors={item.colors}
                    style={{
                      ...styles.colorItem,
                      borderWidth: index == id ? 2 : 0,
                      borderColor: CustomColors.blue,
                    }}
                  />
                </Pressable>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: CustomColors.white,
    height: hp(40),
    width: wp(100),
    bottom: hp(-5),
    position: 'absolute',
    alignSelf: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    paddingBottom: hp(5),
  },
  tabView: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: CustomColors.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    borderWidth: 1,
  },
  tabItem: {
    height: hp(5),
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  colorItem: {
    height: hp(5),
    width: hp(5),
    margin: wp(0.7),
    borderRadius: 10,
  },
});
export default ColorsSheet;
