import {GET_NOTES, ADD_NOTE, DELETE_NOTE, TOGGLE_THEME} from './actionType';

const initialState = {
  notes: undefined,
  themeDark: false,
};

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case ADD_NOTE:
      return {
        notes: action.payload,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((item) => item.id !== action.payload),
      };
    case TOGGLE_THEME:
      return {
        ...state,
        themeDark: !state.themeDark,
      };
    default:
      return state;
  }
}
