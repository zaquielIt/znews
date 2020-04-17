import { combineReducers } from 'redux';
import { localizeReducer as localize } from "react-localize-redux";
import newsReducer from './news';
import covidReducer from './coronavirus';
export default combineReducers({
    localize,
    newsReducer,
    covidReducer
});