import React, {Component} from 'react';
import {View} from 'react-native';
class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginScreen: true,
    };
  }
  render() {
    return (
      <View>
        {this.state.loginScreen
          ? this.props.navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            })
          : null}
      </View>
    );
  }
}
export default LogOut;
