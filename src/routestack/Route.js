import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/OnBoarding/Onboarding';
import Homescreen from '../screens/HomePage/Homescreen';
import Createquote from '../screens/CreateQuote/Createquote';
import Quotes from '../screens/Quotes/Quotes';
import CreatedQuotes from '../screens/CreatedQuotes/CreatedQuotes';
import {CustomColors} from '../theme/CustomColors';

const Stack = createNativeStackNavigator();

const screens = [
  {
    name: 'Onboarding',
    component: Onboarding,
  },
  {
    name: 'Homescreen',
    component: Homescreen,
  },
  {
    name: 'Createquote',
    component: Createquote,
  },
  {
    name: 'Quotes',
    component: Quotes,
  },
  {
    name: 'CreatedQuotes',
    component: CreatedQuotes,
  },
];

class Route extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: CustomColors.primarybg}}>
        <StatusBar
          backgroundColor={CustomColors.primarybg}
          barStyle="default"
          showHideTransition="fade"
          hidden={true}
        />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {screens.map(item => (
              <Stack.Screen name={item.name} component={item.component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default Route;
