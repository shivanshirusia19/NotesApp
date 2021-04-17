import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHeading: 'Login',
      optionalHeading: 'Sign Up',
      isSelectedLogin: true,
      isSelectedSignup: false,
    };
  }

  onPressLogin = () => {
    this.setState({
      isSelectedLogin: true,
      isSelectedSignup: false,
    });
  };

  onPressSignup = () => {
    this.setState({
      isSelectedLogin: false,
      isSelectedSignup: true,
    });
  };

  toNavigateHome = () => {
    this.props.navigation.navigate('DrawerScreen');
  };

  render() {
    const {
      selectedHeading,
      optionalHeading,
      isSelectedLogin,
      isSelectedSignup,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={this.onPressLogin}>
            <Text
              style={
                isSelectedLogin ? styles.selectedText : styles.unselectedText
              }>
              {selectedHeading}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressSignup}>
            <Text
              style={
                isSelectedSignup ? styles.selectedText : styles.unselectedText
              }>
              {optionalHeading}
            </Text>
          </TouchableOpacity>
        </View>
        {isSelectedLogin && !isSelectedSignup ? (
          // < toNavigateHome={this.toNavigateHome} />
          <LoginScreen toNavigateHome={this.toNavigateHome} />
        ) : (
          <SignupScreen toNavigateHome={this.toNavigateHome} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
