import React, {Component} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomHeader from '../../components/CreateQuote/CustomHeader';
import {CustomColors} from '../../theme/CustomColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

export default class CreatedQuotes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {quotes} = this.props.route.params;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: CustomColors.primarybg}}>
        <CustomHeader
          isBack={() => this.props.navigation.goBack()}
          title={'Quotes'}
        />
        <View
          style={{
            alignItems: 'center',
            width: wp(100),
          }}>
          <FlatList
            data={quotes}
            contentContainerStyle={{}}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <FastImage
                resizeMode="cover"
                source={{uri: item.quote}}
                style={{
                  height: hp(30),
                  width: wp(42),
                  margin: wp(3),
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: wp(5),
                }}
              />
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}
