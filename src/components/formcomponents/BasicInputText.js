import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const BasicTextInput = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  type,
  getInput,
  multiline,
  maxLength,
  customStyle,
}) => {
  const [input, setInput] = useState('');
  const [secure, setSecure] = useState(secureTextEntry);
  const dark = useSelector((state) => state.home.themeDark);
  const user = useSelector((state) => state.login.userId);

  return (
    <View style={styles.inputViewWrapper}>
      <TextInput
        secureTextEntry={secure}
        keyboardType={keyboardType}
        autoCorrect={false}
        autoCapitalize="none"
        value={input}
        onChangeText={(text) => {
          setInput(text);
          getInput(text);
        }}
        placeholder={placeholder}
        style={[
          styles.inputBox,
          customStyle,
          dark && user && darkTheme.inputBox,
        ]}
        placeholderTextColor="#ccc"
        multiline={multiline}
        maxLength={maxLength}
      />
      {type && type === 'password' && (
        <TouchableOpacity
          style={styles.inputIconView}
          onPress={() => setSecure(!secure)}>
          <Image
            style={styles.showImage}
            source={require('../../assets/passwordeyeIcon1.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputViewWrapper: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputIconView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    minHeight: 50,
    height: 55,
    width: '90%',
    backgroundColor: '#fff',
    fontSize: 18,
    padding: 10,
    color: '#000',
  },
  showImage: {
    alignSelf: 'center',
    width: 35,
    height: 35,
    tintColor: 'darkgrey',
  },
});

const darkTheme = StyleSheet.create({
  inputBox: {
    backgroundColor: '#262626',
    color: 'white',
  },
});

export default BasicTextInput;
