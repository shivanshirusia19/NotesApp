import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import NotesScreen from '../screens/NotesScreen';
import MenuScreen from '../screens/MenuScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import {DrawerContent} from './DrawerContent';
import {getNotes} from '../services/Home/action';

const Drawer = createDrawerNavigator();

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: true,
      isLoaded: false,
    };
    this.checkStorage();
  }
  checkStorage = async () => {
    const data = await AsyncStorage.getItem('@user_id');
    if (data !== null) {
      console.log(data);
      this.props.getNotes(data);
      this.setState({isEmpty: false, isLoaded: true});
    } else {
      this.setState({isLoaded: true});
    }
  };

  render() {
    const {isEmpty, isLoaded} = this.state;
    return (
      <NavigationContainer>
        {isLoaded ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            keyboardHandlingEnabled
            mode="card"
            initialRouteName={isEmpty ? 'LoginScreen' : 'MenuScreen'}
            screenOptions={{headerShown: false}}>
            <Drawer.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Drawer.Screen
              options={{
                gestureEnabled: false,
              }}
              name="SignupScreen"
              component={SignupScreen}
            />
            <Drawer.Screen name="MenuScreen" component={MenuScreen} />
            <Drawer.Screen name="NotesScreen" component={NotesScreen} />
            <Drawer.Screen name="AddNoteScreen" component={AddNoteScreen} />
          </Drawer.Navigator>
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#E62D1D" />
          </View>
        )}
      </NavigationContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getNotes: (value) => dispatch(getNotes(value)),
});

export default connect(null, mapDispatchToProps)(Routes);

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
