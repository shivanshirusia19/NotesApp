import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const NoteCard = ({notesData, deleteNote}) => {
  const dark = useSelector((state) => state.home.themeDark);
  console.log(dark);
  const {createdDate, data, id} = notesData;

  return (
    <View style={[styles.container, dark && darkTheme.container]}>
      <View style={styles.dateView}>
        <Text style={[styles.date, dark && darkTheme.date]}>{createdDate}</Text>
        <TouchableOpacity onPress={() => deleteNote(id)}>
          <Text style={[styles.noteContent, dark && darkTheme.noteContent]}>
            X
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.noteContent, dark && darkTheme.noteContent]}>
        {data}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  date: {
    fontSize: 14,
    color: '#E62D1D',
    fontWeight: '400',
  },
  noteContent: {
    color: '#383972',
    marginTop: 10,
    fontWeight: '500',
    fontSize: 16,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#383972',
  },
  noteContent: {
    color: 'white',
  },
  date: {
    color: '#ed5b4e',
  },
});

export default NoteCard;
