import {StyleSheet} from 'react-native';
import {CustomColors} from '../../theme/CustomColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

export const HomeScreenStyles = StyleSheet.create({
  // Select card Component

  SelectCardMainView: {
    backgroundColor: CustomColors.authortext,
    width: wp(20.5),
    height: wp(30),
    borderRadius: 10,
    marginLeft: wp(2.5),
    shadowOffset: {width: 1, height: 0},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(2),
    marginTop: hp(1.5),
    color: CustomColors.black,
  },

  // Arrow Header

  headerRowView: {
    marginBottom: hp(2.5),
    marginTop: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(2.2),
    color: CustomColors.black,
  },

  // Main Header Text

  MainheaderText: {
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(2.2),
    color: CustomColors.black,
    marginTop: hp(2.5),
  },

  // Home Main Card

  mainCardBGView: {
    width: wp(90),
    alignSelf: 'center',
    marginTop: hp(2.5),
    height: hp(32.5),
  },
  mainCardViewImageBG: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    paddingVertical: hp(2.5),
  },
});
