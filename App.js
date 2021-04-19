import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native';
import Routes from './src/routes/Routes';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    const dark = this.props.themeDark;
    if (dark) {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#262626');
        StatusBar.setTranslucent(true);
      }
    } else {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('white');
        StatusBar.setTranslucent(true);
      }
    }
    return (
      <>
        <StatusBar />
        <SafeAreaView style={[styles.container, dark && styles.darkBackground]}>
          <Routes />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...Platform.select({
      android: {
        paddingTop: 40,
      },
    }),
  },
  darkBackground: {
    backgroundColor: '#262626',
  },
});

const mapStateToProps = (state) => ({
  themeDark: state.home.themeDark,
});

export default connect(mapStateToProps)(App);
