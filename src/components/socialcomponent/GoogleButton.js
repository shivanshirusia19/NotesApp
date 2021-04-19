import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '260374356350-vd2bb7021jbhm36fg2ekhvgloftfvkkp.apps.googleusercontent.com',
});

const GoogleLoginButton = ({callback}) => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const userData = {
        username: userInfo.user.email,
        password: userInfo.user.id,
        phone: 9999999999,
        name: userInfo.user.name,
        socialId: userInfo.user.id,
      };
      callback(userData);
      // Dispatch Action
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED:', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS:', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE:', error);
      } else {
        console.log('Error:', error);
      }
    }
  };

  return (
    <GoogleSigninButton
      style={styles.button}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  );
};

const GoogleLogoutButton = () => {
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log(
        'signOut(): REVOKE_ACCESS \nsignOut: SIGN_OUT, google logout',
      );
    } catch (error) {
      console.log('signOut(): ', error);
    }
  };

  return (
    <TouchableOpacity onPress={signOut}>
      <Text>Google Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
  },
});

export {GoogleLoginButton, GoogleLogoutButton};
