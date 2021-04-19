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

import {signUpDirect} from '../services/Login/action';
import {connect} from 'react-redux';
import BasicTextInput from '../components/formcomponents/BasicInputText';

class SignupScreen extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    repassword: '',
    phone: '',
  };

  getEmail = (text) => this.setState({email: text});
  getUserName = (text) => this.setState({username: text});
  getPassword = (text) => this.setState({password: text});
  getRePassword = (text) => this.setState({repassword: text});
  getPhone = (text) => this.setState({phone: text});

  validateText = () => {
    const {username, password, email, repassword, phone} = this.state;
    let passCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    // Password must have at least one number and at least one special character.
    let usernameCheck = /^[a-z0-9_-]{4,16}$/;
    // Alphanumeric string that may include _ and – having a length of 3 to 16 characters.
    let phonenoCheck = /^([ 0-9]){10,16}$/;
    let emailCheck = /(.+)@(.+){2,}\.(.+){2,}/;

    if (username === '') {
      Alert.alert('Empty Username', 'Please Fill the Username');
    } else if (password === '') {
      Alert.alert('Empty Password', 'Please Fill the Password');
    } else if (email === '') {
      Alert.alert('Empty Email', 'Please Fill the Email');
    } else if (repassword === '') {
      Alert.alert('Empty Repeat-Password', 'Please Fill the Repeat-Password');
    } else if (phone === '') {
      Alert.alert('Empty Phone', 'Please Fill the Phone');
    } else if (!usernameCheck.test(username)) {
      Alert.alert(
        'Username',
        'Username may include _ and – having a length of 4 to 16 characters.',
      );
    } else if (!emailCheck.test(email)) {
      Alert.alert('Email', 'Invalid Email, Email must have @.');
    } else if (!phonenoCheck.test(phone)) {
      Alert.alert('Phone', 'Phone Number must have + 91, Ex +91 9999999999');
    } else if (!passCheck.test(password)) {
      Alert.alert(
        'Password',
        'Password must have at least one number and at least one special character.',
      );
    } else if (!passCheck.test(repassword)) {
      Alert.alert(
        'Repeat Password',
        'Password must have at least one number and at least one special character.',
      );
    } else if (password !== repassword) {
      Alert.alert('Password', 'Repeat Password does not match your password');
    } else {
      this.signUp();
    }
  };

  signUp = () => {
    const userData = this.state;
    const callback = (message) => {
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
    this.props.signUpDirect(userData, callback);
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarHeading}>Sign Up</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.topBarLink}>Login</Text>
          </TouchableOpacity>
        </View>

        <BasicTextInput
          placeholder="Email address"
          keyboardType="email-address"
          getInput={(text) => this.getEmail(text)}
        />

        <BasicTextInput
          placeholder="Username"
          keyboardType="default"
          getInput={(text) => this.getUserName(text)}
        />

        <BasicTextInput
          placeholder="Phone Number"
          keyboardType="number-pad"
          getInput={(text) => this.getPhone(text)}
        />

        <BasicTextInput
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          type="password"
          getInput={(text) => this.getPassword(text)}
        />

        <BasicTextInput
          placeholder="Repeat Password"
          keyboardType="default"
          secureTextEntry={true}
          type="password"
          getInput={(text) => this.getRePassword(text)}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.validateText()}>
          <Image
            style={styles.checkImage}
            source={require('../assets/checkIcon.png')}
          />
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomBar}>
          <Text style={styles.bottomBarText}>Terms of Service</Text>
        </TouchableOpacity>
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
  checkImage: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    tintColor: 'blue',
    marginHorizontal: 20,
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
  bottomBar: {
    alignItems: 'center',
  },
  bottomBarText: {
    color: 'gray',
    fontSize: 18,
  },
});

const mapDispatchToProps = (dispatch) => ({
  signUpDirect: (userData, callback) =>
    dispatch(signUpDirect(userData, callback)),
});

export default connect(null, mapDispatchToProps)(SignupScreen);
