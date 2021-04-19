import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {addNote} from '../services/Home/action';
import {connect} from 'react-redux';
import BasicTextInput from '../components/formcomponents/BasicInputText';

class AddNoteScreen extends Component {
  state = {
    title: '',
    data: '',
  };

  getTitle = (text) => this.setState({title: text});
  getData = (text) => this.setState({data: text});

  validateText = () => {
    const {title, data} = this.state;
    if (title === '') {
      Alert.alert('Empty Title', 'Please Fill the Title');
    } else if (data === '') {
      Alert.alert('Empty Note', 'Please Fill the Note');
    } else {
      this.newNote();
    }
  };

  newNote = () => {
    const {title, data} = this.state;
    this.props.addNote(this.props.userId, title, data);
    this.props.navigation.navigate('MenuScreen');
  };

  render() {
    const dark = this.props.themeDark;
    return (
      <View style={[styles.container, dark && darkTheme.container]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MenuScreen')}
          style={styles.notesNav}>
          <Text style={[styles.notesNavText, dark && darkTheme.notesNavText]}>
            Back
          </Text>
          <Text style={[styles.notesNavText, dark && darkTheme.notesNavText]}>
            My Notes
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading}>
          <Text style={dark && darkTheme.colorRed}>Add </Text>
          <Text style={[styles.colorBlue, dark && darkTheme.colorWhite]}>
            Note
          </Text>
        </Text>
        <View>
          <BasicTextInput
            placeholder="Title"
            keyboardType="default"
            getInput={(text) => this.getTitle(text)}
          />

          <BasicTextInput
            placeholder="Note"
            keyboardType="default"
            getInput={(text) => this.getData(text)}
            customStyle={styles.noteFieldInput}
            multiline={true}
            maxLength={500}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            onPress={() => this.validateText()}
            style={styles.addBtn}>
            <Text style={styles.addBtnText}>Add Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  heading: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#E62D1D',
    letterSpacing: 1.5,
    marginVertical: 20,
  },
  colorBlue: {
    color: '#383972',
  },
  noteFieldInput: {
    height: 200,
  },
  addBtn: {
    backgroundColor: '#383972',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  addBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
  },
  btnWrapper: {
    flex: 0.9,
    justifyContent: 'flex-end',
  },
  notesNav: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },
  notesNavText: {
    color: '#383972',
    fontSize: 16,
  },
  addIcon: {
    height: 50,
    width: 50,
    tintColor: 'white',
  },
  menuIcon: {
    margin: 10,
    height: 35,
    width: 35,
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
  },
  notesNavText: {
    color: 'white',
  },
  colorRed: {
    color: '#ed5b4e',
  },
  colorWhite: {
    color: 'white',
  },
  textInput: {
    backgroundColor: '#262626',
  },
  menuIconDark: {
    tintColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  userId: state.login.userId,
  themeDark: state.home.themeDark,
});

const mapDispatchToProps = (dispatch) => ({
  addNote: (id, title, data) => dispatch(addNote(id, title, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteScreen);
