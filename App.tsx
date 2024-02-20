import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/auth/Login';
import SplashScreen from './src/screens/intro/SplashScreen';
import Register from './src/screens/auth/Register';
import HomeScreen from './src/screens/tabs/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from './src/screens/tabs/CartScreen';
import FavoritesScreen from './src/screens/tabs/FavoritesScreen';
import OrderScreen from './src/screens/tabs/OrderScreen';
import SettingScreen from './src/screens/SettingScreen';
import DetailScreen from './src/screens/DetailScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import PersonScreen from './src/screens/PersonScreen';

const homeName = 'HomeScreen';
const cartScreen = 'CartScreen';
const favorScreen = 'FavoritesScreen';
const orderScreen = 'OrderScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeScreen" component={MainContainer} />
        <Stack.Screen name='SettingScreen' component={SettingScreen} />
        <Stack.Screen name='DetailScreen' component={DetailScreen} />
        <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
        <Stack.Screen name='PersonScreen' component={PersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainContainer = () => {
  return (
      <Tab.Navigator 
        initialRouteName={homeName} 
        screenOptions={{
          tabBarStyle: {backgroundColor: '#0C0F14', borderTopWidth: 0, height: 70},
          tabBarActiveTintColor: '#D17842',
          tabBarHideOnKeyboard: true,
          tabBarLabel:()=> null}} >
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                style={{height: 24, width: 24, tintColor: focused ? '#D17842' : undefined}}
                source={require('./assets/images/home.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name={cartScreen}
          component={CartScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                style={{height: 27, width: 24, tintColor: focused ? '#D17842' : undefined}}
                source={require('./assets/images/cart.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name={favorScreen}
          component={FavoritesScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                style={{height: 24, width: 27, tintColor: focused ? '#D17842' : undefined}}
                source={require('./assets/images/favor.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name={orderScreen}
          component={OrderScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                style={{height: 27, width: 22, tintColor: focused ? '#D17842' : undefined}}
                source={require('./assets/images/order.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default App;