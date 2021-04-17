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
import {connect} from 'react-redux';
import {SignupUser} from '../services/action';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      phone: null,
      isSecurePassword: true,
      isSecureRepeatPassword: true,
      socialId: null,
    };
  }

  changePasswordVisible = () => {
    this.setState({isSecurePassword: !this.state.isSecurePassword});
  };

  changeRepeatPasswordVisible = () => {
    this.setState({isSecureRepeatPassword: !this.state.isSecureRepeatPassword});
  };

  showAlert = () => {
    Alert.alert('Alert', 'Invalid Input type', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ]);
  };

  onConditionCheck = () => {
    const user = {
      username: this.state.email,
      password: this.state.password,
      name: this.state.username,
      mobile: this.state.phone,
      socialId: this.state.socialId,
    };
    this.props.SignupUser(user);
    // this.props.toNavigateHome();
    this.props.navigation.navigate('DrawerScreen');
  };

  onSignup = () => {
    const {email, username, password, repeatPassword} = this.state;
    let emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordcheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    let check = true;

    if (email === '' || !emailCheck.test(email)) {
      console.log('email');
      check = false;
      this.showAlert();
    } else if (
      username === '' ||
      username.length < 4 ||
      username.indexOf(' ') >= 0
    ) {
      console.log('username');
      check = false;
      this.showAlert();
    } else if (password === '' || !passwordcheck.test(password)) {
      console.log('password');
      check = false;
      this.showAlert();
    } else if (password !== repeatPassword) {
      console.log('repeat password');
      check = false;
      this.showAlert();
    }

    if (check) {
      this.onConditionCheck();
      // this.props.toNavigateHome();
    }
  };

  render() {
    const {isSecurePassword, isSecureRepeatPassword} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.unselectedText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.selectedText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Image
          style={styles.icon}
          source={require('../../assets/profileIcon1.png')}
        />
        <TextInput
          style={styles.textInput}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.textInput}
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          placeholder="Username"
        />
        <View style={styles.textInputView}>
          <TextInput
            style={styles.passwordTextInput}
            value={this.state.phone}
            onChangeText={(phone) => this.setState({phone})}
            placeholder="Phone Nymber"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.passwordTextInput}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            placeholder="Password"
            secureTextEntry={isSecurePassword}
          />
          <TouchableOpacity onPress={this.changePasswordVisible}>
            <Image
              style={styles.showImage}
              source={require('../../assets/passwordeyeIcon1.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.passwordTextInput}
            value={this.state.repeatPassword}
            onChangeText={(repeatPassword) => this.setState({repeatPassword})}
            placeholder="Repeat Password"
            secureTextEntry={isSecureRepeatPassword}
          />
          <TouchableOpacity onPress={this.changeRepeatPasswordVisible}>
            <Image
              style={styles.showImage}
              source={require('../../assets/passwordeyeIcon1.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.onSignup} style={styles.signIn}>
          <Image
            style={styles.checkImage}
            source={require('../../assets/checkIcon.png')}
          />
          <Text style={styles.signInText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.footerText}>Terms of Service</Text>
        </TouchableOpacity>
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
    height: 50,
    width: '78%',
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
    fontSize: 18,
    color: 'darkgrey',
    marginVertical: 10,
  },
  textInputView: {
    height: 50,
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
});

const mapStateToProps = (state) => {
  return {
    listData: state.list,
  };
};

const mapDispatchToProps = (dispatch) => ({
  SignupUser: (user) => dispatch(SignupUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
