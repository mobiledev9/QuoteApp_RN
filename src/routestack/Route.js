import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/OnBoarding/Onboarding';
import Homescreen from '../screens/HomePage/Homescreen';
import Createquote from '../screens/CreateQuote/Createquote';
import Quotes from '../screens/Quotes/Quotes';
import CreatedQuotes from '../screens/CreatedQuotes/CreatedQuotes';

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
    );
  }
}

export default Route;
