import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {Notes, NotesGet} from '../services/action';

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data: '',
      notes: {},
      listcontant: [],
      isRefreshing: false,
      modalVisible: false,
    };
    this.props.NotesGet(this.props.id);
  }

  componentDidMount() {
    this.props.NotesGet(this.props.id);
    this.result();
  }

  result = () =>
    this.props.listData.reduce((accumulator, currentValue) => {
      var newtitle = currentValue.title;
      var data = currentValue.data;
      var flag = true;
      accumulator.map((item, index) => {
        if (newtitle === item.title) {
          flag = false;
          accumulator[index].data.push(data);
        }
      });
      if (flag) {
        accumulator.push({title: newtitle, data: [data]});
      }
      return accumulator;
    }, this.state.listcontant);

  componentDidUpdate(prevProp) {
    if (this.props.listData !== prevProp.listData) {
      this.render();
    }
  }

  saveData = async () => {
    const obj = this.state;
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(obj));
    } catch (error) {
      console.log(error);
    }
  };

  getData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      const result = JSON.parse(data);
      this.setState(result);
    } catch (error) {
      console.log(error);
    }
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  submitData = () => {
    const data = {
      title: this.state.title,
      data: this.state.data,
    };
    this.props.Notes(data, this.props.id);
    this.setState({modalVisible: false});
    this.props.NotesGet(this.props.id);
  };

  refreshList = (refresh) => {
    this.setState({
      isRefreshing: refresh,
    });
  };

  renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.listItemContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddNotes', {item})}>
            <View style={styles.data}>
              <Text style={this.props.dark ? styles.DarkdataTxt : styles.txt}>
                {item.title}
              </Text>
              <View style={styles.count}>
                <Text style={styles.counttxt}>{item.data.length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={this.props.dark ? styles.DarkConatiner : styles.container}>
        <View style={styles.header}>
          <Text
            style={
              this.props.dark
                ? styles.darkFirstHeaderText
                : styles.firstHeaderText
            }>
            MY{' '}
          </Text>
          <Text
            style={
              this.props.dark
                ? styles.darkSecondHeaderText
                : styles.secondHeaderText
            }>
            Notes
          </Text>
        </View>
        <View style={styles.listConatiner}>
          <FlatList
            data={
              this.state.listcontant !== null
                ? this.state.listcontant
                : this.props.listData
            }
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => {
                  this.refreshList(true);
                  this.props.NotesGet(this.props.id);
                  setTimeout(() => {
                    this.refreshList(false);
                  }, 1000);
                }}
              />
            }
          />
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={this.props.dark ? styles.menuIconDark : styles.menuIcon}
              source={require('../../assets/menuIcon.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addIconContainer}
            onPress={() => this.setModalVisible(true)}>
            <Image
              style={styles.addIcon}
              source={require('../../assets/addIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <Modal visible={this.state.modalVisible}>
          <View
            style={
              this.props.dark
                ? styles.DarkModalContainer
                : styles.Modalcontainer
            }>
            <View style={styles.submitIcon}>
              <Text style={this.props.dark ? styles.darkTitle : styles.title}>
                ADD NOTE
              </Text>
              <TouchableOpacity
                style={styles.crossContainer}
                onPress={() => this.setModalVisible(false)}>
                <Image
                  style={
                    this.props.dark ? styles.darkCrossIcon : styles.crossIcon
                  }
                  source={require('../../assets/crossIcon.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={
                this.props.dark
                  ? styles.darkTitleContainer
                  : styles.titleContainer
              }>
              <TextInput
                multiline={true}
                style={this.props.dark ? styles.darkTitle : styles.title}
                placeholder="Enter Title"
                onChangeText={(text) => this.setState({title: text})}
              />
            </View>
            <View
              style={
                this.props.dark
                  ? styles.darkNoteContainer
                  : styles.noteContainer
              }>
              <TextInput
                multiline={true}
                style={this.props.dark ? styles.darkNote : styles.note}
                placeholder="Enter Note"
                onChangeText={(text) => this.setState({data: text})}
              />
            </View>
            <View style={styles.submitIcon}>
              <TouchableOpacity
                style={styles.doneContainer}
                onPress={() => this.submitData()}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {console.log('list data', this.props.listData)}
        {console.log('Dark ', this.props.dark)}
        {console.log('Id', this.props.id)}
        {console.log('list', this.state.listcontant)}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listData: state.notes,
    id: state.list,
    dark: state.darkScreen,
  };
};
const mapDispatchToProps = (dispatch) => ({
  NotesGet: (id) => dispatch(NotesGet(id)),
  Notes: (data, id) => dispatch(Notes(data, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  DarkConatiner: {
    flex: 1,
    backgroundColor: 'black',
  },
  icontxt: {
    fontSize: 15,
    marginLeft: 10,
    color: 'red',
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    marginLeft: 30,
  },
  firstHeaderText: {
    fontSize: 50,
    color: 'red',
    fontWeight: '800',
  },
  darkFirstHeaderText: {
    fontSize: 50,
    color: 'white',
    fontWeight: '800',
  },
  secondHeaderText: {
    fontSize: 50,
    color: 'darkblue',
    fontWeight: '800',
  },
  darkSecondHeaderText: {
    fontSize: 50,
    color: 'blue',
    fontWeight: '800',
  },
  addIconContainer: {
    margin: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 50,
  },
  titleContainer: {
    margin: 12,
    borderWidth: 2,
    padding: 10,
    height: 60,
    borderRadius: 10,
  },
  darkTitleContainer: {
    margin: 12,
    borderTopWidth: 1,
    padding: 10,
    height: 60,
    borderColor: 'white',
  },
  title: {
    fontSize: 20,
  },
  note: {
    fontSize: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  darkTitle: {
    fontSize: 30,
    color: 'white',
  },
  darkNote: {
    fontSize: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'white',
  },
  noteContainer: {
    height: 300,
    borderWidth: 1,
    margin: 12,
    padding: 15,
    borderRadius: 10,
  },
  darkNoteContainer: {
    height: 200,
    borderWidth: 1,
    margin: 12,
    padding: 15,
    borderRadius: 10,
    borderColor: 'white',
  },
  menuIconDark: {
    margin: 10,
    height: 35,
    width: 35,
    tintColor: 'white',
  },
  menuIcon: {
    margin: 10,
    height: 35,
    width: 35,
  },
  addIcon: {
    height: 50,
    width: 50,
    tintColor: 'white',
  },
  Modalcontainer: {
    marginTop: 60,
  },

  DarkModalContainer: {
    marginTop: 60,
    flex: 1,
    backgroundColor: 'black',
  },
  listConatiner: {
    height: 550,
  },
  listItemContainer: {
    marginTop: 50,
  },
  txt: {
    fontSize: 30,
    color: 'darkblue',
    fontWeight: '700',
    marginLeft: 30,
  },
  submitIcon: {
    alignSelf: 'center',
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
  },
  DarkdataTxt: {
    fontSize: 30,
    color: 'white',
    fontWeight: '700',
    marginLeft: 30,
  },
  count: {
    borderColor: '#f5afc0',
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f5afc0',
  },
  counttxt: {
    fontSize: 30,
    color: 'darkblue',
    fontWeight: '700',
  },
  crossContainer: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'red',
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  crossIcon: {
    height: 20,
    width: 20,
    tintColor: 'black',
  },
  darkCrossIcon: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
  doneContainer: {
    height: '10%',
    width: '50%',
    backgroundColor: 'red',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  doneText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
