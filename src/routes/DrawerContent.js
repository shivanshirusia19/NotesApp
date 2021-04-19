import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Switch, Text} from 'react-native';
import {logOut} from '../services/Login/action';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOGGLE_THEME} from '../services/Home/actionType';

export function DrawerContent(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [isEnable, setIsEnable] = useState(false);
  const dark = useSelector((state) => state.home.themeDark);
  const isOn = () => {
    toggleTheme();
    setIsEnable((prevState) => !prevState);
  };
  const signOut = () => {
    dispatch(logOut());
    props.navigation.navigate('LoginScreen');
  };

  const toggleTheme = () => {
    dispatch({
      type: TOGGLE_THEME,
    });
  };

  useEffect(() => {
    (async function getData() {
      try {
        const user_name = await AsyncStorage.getItem('@user_name');
        setUsername(user_name);
      } catch (e) {
        console.log(e);
      }
    })();
  });

  return (
    <View style={[styles.container, dark && darkTheme.container]}>
      <View style={styles.drawerContent}>
        <View style={styles.preference}>
          <Text style={[styles.themeToggleText, dark && darkTheme.colorWhite]}>
            Dark Theme
          </Text>
          <View>
            <Switch
              style={styles.switch}
              trackColor={{true: '#383972', false: 'grey'}}
              thumbColor={isEnable ? '#fff' : '#ccc'}
              onValueChange={isOn}
              value={isEnable}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => signOut()}
        style={styles.bottomDrawerSection}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  drawerContent: {
    flex: 1,
  },
  userView: {
    paddingTop: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#383972',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  logoutText: {
    fontSize: 20,
    color: '#E62D1D',
    fontWeight: '800',
    marginLeft: 10,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  themeToggleText: {
    color: '#383972',
    fontSize: 20,
    fontWeight: '500',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
  },
  colorWhite: {
    color: 'white',
  },
});
