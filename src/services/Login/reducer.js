import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SOCIAL,
  SIGNUP_DIRECT,
  SIGNUP_SOCIAL,
  LOGOUT,
} from './actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userId: undefined,
  userName: undefined,
};

const storeData = async (uID, uNAME) => {
  try {
    await AsyncStorage.multiSet([
      ['@user_id', uID.toString()],
      ['@user_name', uNAME.toString()],
    ]);
  } catch (e) {
    console.log(e);
  }
};

export default function LoginReducer(state = initialState, action) {
  if (
    action.payload &&
    (action.type === 'AUTHENTICATE_USER' ||
      action.type === 'SIGNUP_DIRECT' ||
      action.type === 'AUTHENTICATE_USER_SOCIAL' ||
      action.type === 'SIGNUP_SOCIAL')
  ) {
    const {id, name} = action.payload;
    storeData(id, name);
  }
  switch (action.type) {
    case SIGNUP_DIRECT:
      return {
        ...state,
        userId: action.payload.id,
        userName: action.payload.name,
      };
    case AUTHENTICATE_USER_SOCIAL:
      return {
        ...state,
        userId: action.payload.id,
        userName: action.payload.name,
      };
    case SIGNUP_SOCIAL:
      return {
        ...state,
        userId: action.payload.id,
        userName: action.payload.name,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        userId: action.payload.id,
        userName: action.payload.name,
      };
    case LOGOUT:
      return {
        userId: undefined,
      };
    default:
      return state;
  }
}
