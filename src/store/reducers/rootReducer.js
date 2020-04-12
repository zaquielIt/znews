import { combineReducers } from 'redux';
import newsReducer from './news';
import covidReducer from './coronavirus';
export default combineReducers({
    newsReducer,
    covidReducer
});