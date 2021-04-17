import {
  CREATE_USER,
  LOGIN_USER,
  SOCIAL_USER,
  NOTES,
  GETNOTES,
  DELETENOTES,
  DARK_MODE,
} from './actionType';

const initialState = {
  list: null,
  notes: [],
  darkScreen: false,
};
export default function ApiReducer(state = initialState, action) {
  console.log('Action ', action);
  console.log('State ', state);
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        list: action.id,
      };
    case LOGIN_USER:
      return {
        ...state,
        list: action.id,
      };
    case SOCIAL_USER:
      return {
        list: action.id,
      };
    case NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case GETNOTES:
      return {
        ...state,
        notes: [...action.payload.response],
      };
    case DELETENOTES:
      return {
        ...state,
        notes: [...action.payload.response],
      };
    case DARK_MODE:
      return {
        darkScreen: !state.darkScreen,
      };
    default:
      return state;
  }
}
