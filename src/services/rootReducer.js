import {combineReducers} from 'redux';
import homeReducer from './Home/reducer';
import loginReducer from './Login/reducer';

export default combineReducers({
  home: homeReducer,
  login: loginReducer,
});
