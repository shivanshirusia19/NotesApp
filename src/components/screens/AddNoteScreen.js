import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

import {Delete, NotesGet} from '../services/action';
class AddNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
    };
  }
  componentDidMount() {
    this.Animation();
    this.props.Delete();
  }
  Animation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(),
    );
  };
  deleteData = (noteid) => {
    this.props.Delete(this.props.id, noteid);
    this.props.NotesGet(this.props.id);
  };

  DataStyling = ({item}) => {
    return (
      <>
        <Animated.View
          style={[
            styles.dataConatiner,
            {
              opacity: this.state.fadeAnim,
            },
          ]}>
          <View style={styles.box}>
            <Text style={this.props.dark ? styles.darktxt : styles.txt}>
              {item.data}
            </Text>
            <TouchableOpacity onPress={() => this.deleteData(item.id)}>
              <Icons name={'cross'} size={40} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </>
    );
  };

  render() {
    const {item} = this.props.route.params;
    let Data;
    if (this.props.notes !== undefined) {
      Data = this.props.notes.filter((data) => data.title === item.title);
    }

    return (
      <>
        <SafeAreaView />
        <View style={this.props.dark ? styles.DarkContainer : styles.container}>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: this.state.fadeAnim,
              },
            ]}>
            <Text
              style={this.props.dark ? styles.darkHeaderTxt : styles.headerTxt}>
              {item.title}
            </Text>
            <View style={styles.headerTxtCounts}>
              <Text style={styles.headerTxt}>{Data.length}</Text>
            </View>
          </Animated.View>
          <FlatList
            data={Data}
            renderItem={this.DataStyling}
            keyExtractor={(key) => key.id}
          />
          {console.log('data', item)}
          {console.log('Notes', this.props.notes)}
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  DarkContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    marginTop: 20,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 30,
  },
  headerTxt: {
    fontSize: 40,
    color: 'red',
    fontWeight: '800',
  },
  darkHeaderTxt: {
    fontSize: 40,
    color: 'white',
    fontWeight: '800',
  },
  headerTxtCounts: {
    borderColor: '#f5afc0',
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f5afc0',
  },
  txt: {
    color: 'blue',
    fontSize: 20,
    marginLeft: 30,
  },
  darktxt: {
    color: 'lightblue',
    fontSize: 20,
    marginLeft: 30,
  },
  dataConatiner: {
    margin: 20,
  },
  box: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginRight: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    id: state.list,
    notes: state.notes,
  };
};
const mapDispatchToProps = (dispatch) => ({
  NotesGet: (id) => dispatch(NotesGet(id)),
  Delete: (id, noteid) => dispatch(Delete(id, noteid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddNotes);
