import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const HeaderComp = ({title, count}) => {
  const dark = useSelector((state) => state.home.themeDark);

  return (
    <View style={styles.headerBar}>
      <Text style={[styles.headerTitle, dark && darkTheme.headerTitle]}>
        {title}
      </Text>
      <View
        style={[styles.headerCounterView, dark && darkTheme.headerCounterView]}>
        <Text style={[styles.headerCounter, dark && darkTheme.headerCounter]}>
          {count}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#E62D1D',
  },
  headerCounterView: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(230,45,29, 0.15)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCounter: {
    fontSize: 32,
    color: '#E62D1D',
    fontWeight: 'bold',
  },
});

const darkTheme = StyleSheet.create({
  headerTitle: {
    color: '#ed5b4e',
  },
  headerCounter: {
    color: '#ed5b4e',
  },
  headerCounterView: {
    backgroundColor: 'rgba(237, 91, 78, 0.25)',
  },
});

export default HeaderComp;
