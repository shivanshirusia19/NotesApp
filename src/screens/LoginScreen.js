import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {
  authenticateUserSocial,
  signUpSocial,
  authenticateUser,
} from '../services/Login/action';
import BasicTextInput from '../components/formcomponents/BasicInputText';
import {GoogleLoginButton} from '../components/socialcomponent/GoogleButton';

class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
  };

  getUserName = (text) => this.setState({username: text});
  getPassword = (text) => this.setState({password: text});

  validateText = () => {
    const {username, password} = this.state;
    if (username === '') {
      Alert.alert('Empty Username', 'Please Fill the Username');
    } else if (password === '') {
      Alert.alert('Empty Password', 'Please Fill the Password');
    } else {
      this.login();
    }
  };

  userInfoCallBackSocial = async (userInfo) => {
    const authUserSocialcallback = (status) => {
      const callback = (signupstatus) => {
        signupstatus && this.props.navigation.navigate('MenuScreen');
      };

      if (status === true) {
        this.props.navigation.navigate('MenuScreen');
      } else {
        console.log('If Else Block -> Else: ', userInfo);
        this.props.signUpSocial(userInfo, callback);
      }
    };
    this.props.authenticateUserSocial(
      userInfo.socialId,
      userInfo.name,
      authUserSocialcallback,
    );
  };

  login = async () => {
    const userInfo = this.state;
    const loginCallback = (message) => {
      if (message === true) {
        this.props.navigation.navigate('MenuScreen');
      } else {
        Alert.alert('Error', message, [
          {
            text: 'Close',
            style: 'cancel',
          },
        ]);
      }
    };
    this.props.authenticateUser(userInfo, loginCallback);
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarHeading}>Login</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.topBarLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <BasicTextInput
          placeholder="Username or email address"
          keyboardType="default"
          getInput={(text) => this.getUserName(text)}
        />

        <BasicTextInput
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          type="password"
          getInput={(text) => this.getPassword(text)}
        />

        <TouchableOpacity
          onPress={() => this.validateText()}
          style={styles.loginButton}>
          <Image
            style={styles.checkImage}
            source={require('../assets/checkIcon.png')}
          />
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.bottomBar}>
          <Text style={styles.bottomBarText}>Login with</Text>
          <View style={styles.bottomBarSocial}>
            <GoogleLoginButton
              callback={(value) => this.userInfoCallBackSocial(value)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  topBar: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBarHeading: {
    fontSize: 36,
    fontWeight: '600',
  },
  topBarLink: {
    color: '#aaa',
    fontSize: 20,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 60,
    ...Platform.select({
      ios: {
        shadowColor: 'blue',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  loginButtonText: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'blue',
    letterSpacing: 1.3,
  },
  loginButtonIcon: {
    marginRight: 10,
  },
  checkImage: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    tintColor: 'blue',
    marginHorizontal: 20,
  },
  bottomBar: {
    alignItems: 'center',
  },
  bottomBarText: {
    color: 'gray',
    marginBottom: 15,
    fontSize: 18,
  },
  bottomBarSocial: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-evenly',
  },
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUserSocial: (userData, userName, callback) =>
    dispatch(authenticateUserSocial(userData, userName, callback)),

  signUpSocial: (userData, callback) =>
    dispatch(signUpSocial(userData, callback)),

  authenticateUser: (userData, callback) =>
    dispatch(authenticateUser(userData, callback)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
