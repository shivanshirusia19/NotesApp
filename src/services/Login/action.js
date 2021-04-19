import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SOCIAL,
  SIGNUP_DIRECT,
  SIGNUP_SOCIAL,
  LOGOUT,
} from './actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL, USERS, AUTHENTICATE} from '../constants';

export const signUpDirect = (userInfo, callback) => async (dispatch) => {
  const {username, password, phone} = userInfo;
  const response = await fetch(`${URL + USERS}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      name: username,
      phone,
      socialId: null,
    }),
  });
  const {status, body, message} = await response.json();
  if (status) {
    callback(status);
    dispatch({
      type: SIGNUP_DIRECT,
      payload: {
        id: body.id,
        name: username,
      },
    });
  } else {
    callback(message);
  }
};

export const authenticateUserSocial = (socialId, name, callback) => async (
  dispatch,
) => {
  const response = await fetch(`${URL + AUTHENTICATE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({socialId}),
  });
  const {status, id} = await response.json();
  if (status) {
    callback(status);
    dispatch({
      type: AUTHENTICATE_USER_SOCIAL,
      payload: {
        id,
        name,
      },
    });
  } else {
    callback(status);
  }
};

export const signUpSocial = (userInfo, callback) => async (dispatch) => {
  const {username, name, password, phone, socialId} = userInfo;
  const response = await fetch(`${URL + USERS}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      name,
      phone,
      socialId,
    }),
  });
  const {status, body, message} = await response.json();
  if (status) {
    callback(status);
    dispatch({
      type: SIGNUP_SOCIAL,
      payload: {
        id: body.id,
        name,
      },
    });
  } else {
    callback(message);
  }
};

export const authenticateUser = (userInfo, callback) => async (dispatch) => {
  const {username, password} = userInfo;
  const response = await fetch(`${URL + AUTHENTICATE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  });
  const {status, id, message} = await response.json();
  if (status) {
    callback(status);
    dispatch({
      type: AUTHENTICATE_USER,
      payload: {
        id,
        name: username,
      },
    });
  } else {
    callback(message);
  }
};

export const logOut = () => async (dispatch) => {
  if (clearAll()) {
    dispatch({
      type: LOGOUT,
    });
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.log('AsyncStorage: Logout =>', e);
  }
  return false;
};
