import {StyleSheet} from 'react-native';
import {CustomColors} from '../../theme/CustomColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

export const Onboardingstyles = StyleSheet.create({
  // Onboarding Main Screen flex

  mainbg: {
    flex: 1,
    backgroundColor: CustomColors.primarybg,
  },
  sliderview: {
    width: wp(100),
    height: hp(100),
  },
  mainlogo: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: hp(50),
    width: wp(100),
  },
  mainquote: {
    fontFamily: 'Sunset-Italic',
    textAlign: 'center',
    color: 'black',
    fontSize: hp(2.5),
    marginHorizontal: wp(2),
  },
  authortext: {
    color: CustomColors.authortext,
    marginTop: hp(2.5),
    marginRight: wp(5),
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'Poppins-SemiBoldItalic',
  },
  suggestiontext: {
    width: wp(75),
    marginLeft: wp(7.5),
    color: CustomColors.greytext,
    fontSize: hp(2.2),
    textAlign: 'left',
    marginTop: hp(2.5),
    alignSelf: 'center',
    fontFamily: 'JosefinSans-Medium',
  },
  bottomlogo: {
    position: 'absolute',
    left: 0,
    bottom: hp(0),
    width: wp(20),
    bottom: wp(-20),
  },
  paginationview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: hp(15),
    left: wp(40),
  },
  paginationdot: {
    height: hp(2),
    width: hp(2),
    backgroundColor: 'black',
    borderRadius: 100,
    marginHorizontal: 4,
  },
  bottomfilledbutton: {
    height: hp(7),
    borderRadius: 10,
    backgroundColor: CustomColors.authortext,
    borderWidth: 1,
    width: wp(50),
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp(1),
    alignSelf: 'center',
    marginBottom: hp(4),
  },
  getstartedbutton: {
    fontSize: hp(2.5),
    color: CustomColors.black,
    lineHeight: hp(4),
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Regular',
  },

  //
});
