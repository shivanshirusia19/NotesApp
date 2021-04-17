import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerScreen from '../screens/DrawerScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import MenuScreen from '../screens/MenuScreen';
// import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="DrawerScreen"
          component={DrawerScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddNotes"
          component={AddNoteScreen}
          options={{
            title: '',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
