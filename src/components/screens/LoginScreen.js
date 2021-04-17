import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
// import {GoogleLoginButton} from '../component/GoogleSignIn';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {connect} from 'react-redux';
import {LoginUser, LoginGoogle, SignupUser} from '../services/action';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      socialId: null,
      userDetails: [],
      isSecurePassword: true,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '260374356350-vd2bb7021jbhm36fg2ekhvgloftfvkkp.apps.googleusercontent.com',
    });
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({
        userDetails: userInfo.user,
      });
      this.props.LoginGoogle(this.state.userDetails.id, status);
      const status = (message) => {
        if (message === true) {
          // this.props.toNavigateHome();
          this.props.navigation.navigate('DrawerScreen');
        } else {
          Alert.alert('Error', 'Not a Valid User', [
            {
              text: 'Close',
              style: 'cancel',
            },
          ]);
        }
      };
      // this.props.LoginGoogle(this.state.userDetails.id, status);
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

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({userDetails: null});
    } catch (error) {
      console.error(error);
    }
  };

  changePasswordVisible = () => {
    this.setState({isSecurePassword: !this.state.isSecurePassword});
  };

  showAlert = () => {
    Alert.alert('Alert', 'Invalid Input type', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ]);
  };

  onLogin = async () => {
    let check = true;
    if (this.state.username === '' || this.state.password === '') {
      check = false;
      this.showAlert();
    }
    const data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.username,
      id: this.state.socialId,
      mobile: this.state.socialId,
    };

    const status = (message) => {
      if (message === true) {
        // this.props.toNavigateHome();
        this.props.navigation.navigate('DrawerScreen');
      } else {
        Alert.alert('Error', 'Not a valis user', [
          {
            text: 'Close',
            style: 'cancel',
          },
        ]);
      }
    };
    if (check) {
      this.props.LoginUser(data, status);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Text style={styles.selectedText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.unselectedText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Image
          style={styles.icon}
          source={require('../../assets/profileIcon1.png')}
        />
        <TextInput
          style={styles.textInput}
          value={this.state.userDetails.name}
          onChangeText={(username) => this.setState({username})}
          placeholder="Username"
        />
        <View style={styles.textInputView}>
          <TextInput
            style={styles.passwordTextInput}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            placeholder="Password"
            secureTextEntry={this.state.isSecurePassword}
          />
          <TouchableOpacity onPress={this.changePasswordVisible}>
            <Image
              style={styles.showImage}
              source={require('../../assets/passwordeyeIcon1.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signIn}
          onPress={() => {
            this.onLogin();
            // this.props.toNavigateHome();
          }}>
          <Image
            style={styles.checkImage}
            source={require('../../assets/checkIcon.png')}
          />
          <Text style={styles.signInText}>LOG IN</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Login with</Text>

        <GoogleSigninButton
          style={styles.button}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: '12%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
  },
  unselectedText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 22,
  },
  icon: {
    width: 90,
    height: 90,
    tintColor: 'darkgrey',
    marginBottom: 15,
    marginTop: 10,
  },
  textInput: {
    height: 60,
    width: '78%',
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
    fontSize: 18,
    color: 'darkgrey',
    marginVertical: 10,
  },
  textInputView: {
    height: 60,
    width: '78%',
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordTextInput: {
    height: 60,
    width: '80%',
    fontSize: 18,
    color: 'darkgrey',
  },
  showImage: {
    alignSelf: 'center',
    width: 35,
    height: 35,
    tintColor: 'darkgrey',
  },
  signIn: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signInText: {
    color: '#6495ed',
    fontSize: 22,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  checkImage: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    tintColor: '#6495ed',
  },
  footerText: {
    fontSize: 18,
    color: 'darkgrey',
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    listData: state.list,
  };
};

const mapDispatchToProps = (dispatch) => ({
  LoginUser: (data, status) => dispatch(LoginUser(data, status)),
  LoginGoogle: (id, status) => dispatch(LoginGoogle(id, status)),
  SignupUser: (user) => dispatch(SignupUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
