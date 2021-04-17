import React from 'react';
import {StyleSheet, Alert, TouchableOpacity, Text} from 'react-native';
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
      const UserData = {
        email: userInfo.user.email,
        username: userInfo.user.email,
        password: userInfo.user.id,
        phone: 9876543210,
        name: userInfo.user.name,
        socialId: userInfo.user.id,
      };
      console.log(userInfo.user.name);
      callback(UserData);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Process Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Process in Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services are not available');
      } else {
        Alert.alert('Something else went wrong...', error.toString());
        this.setState({
          error,
        });
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
        'signOut(): Revoke Access \n signOut: SIGN_OUT, google layout',
      );
    } catch (error) {
      console.error('signOut(): ', error);
    }
  };
  return (
    <TouchableOpacity onPress={signOut}>
      <Text>Google Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 20,
  },
  messageText: {
    fontSize: 16,
  },
  button: {
    width: 200,
    height: 50,
  },
  userInfoContainer: {
    marginVertical: 20,
  },
  profileImageContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  displayTitle: {
    fontSize: 22,
    color: '#010101',
  },
});

export {GoogleLoginButton, GoogleLogoutButton};
