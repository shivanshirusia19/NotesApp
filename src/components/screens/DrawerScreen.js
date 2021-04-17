import * as React from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {DarkMode} from '../services/action';
import MenuScreen from './MenuScreen';
import LogOut from '../component/LogOut';
const Drawer = createDrawerNavigator();

class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView
        {...props}
        style={this.props.darkScreen ? styles.drawer : null}>
        <DrawerItemList {...props} />
        <View style={styles.toggle}>
          <Switch
            value={this.props.darkScreen}
            trackColor={{false: 'grey', true: 'black'}}
            thumbColor={this.props.darkScreen ? 'darkcyan' : 'white'}
            onValueChange={(text) => {
              this.props.DarkMode();
              props.navigation.closeDrawer();
            }}
          />
        </View>
      </DrawerContentScrollView>
    );
  };
  render() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: this.props.darkScreen ? 'white' : 'black',
          inactiveTintColor: this.props.darkScreen ? 'white' : 'black',
          itemStyle: {marginVertical: 5, fontSize: 20},
        }}
        drawerContent={(props) => <this.CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{drawerLabel: 'Menu', color: 'red'}}
        />
        <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggle: {
    alignSelf: 'center',
  },
  drawer: {
    backgroundColor: 'darkblue',
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    DarkMode: () => dispatch(DarkMode()),
  };
};
const mapStateToProps = (state) => {
  return {
    id: state.id,
    darkScreen: state.darkScreen,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);
