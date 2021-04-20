import { combineReducers } from 'redux';
import {REQUEST_DROPDOWN,RECEIVE_DROPDOWN,REQUEST_POPULATE,RECEIVE_POPULATE,REQUEST_FILTER,REQUEST_QUALITYDROPDOWN, RECEIVE_QUALITYDROPDOWN,RESPONSE_URLSTATUS,ERROR_URLSTATUS} from '../actions/index.js';

function fetchDropDownData(state={data:[]},action){
    switch(action.type){
        case REQUEST_DROPDOWN:
            return state
        case RECEIVE_DROPDOWN:
            return Object.assign({},state,{data:action.data})
        default:
            return state
    }
}

function populateDetailData(state={data:[]},action){
    switch(action.type){
        case REQUEST_POPULATE:
            return state
        case RECEIVE_POPULATE:
            return Object.assign({},state,{data:action.data})
        default:
            return state
    }
}

function filterProjectData(state={data:[]},action){
    switch(action.type){
        case REQUEST_FILTER:
            return Object.assign({},state,{data:action.data})
        default:
            return state
    }
}

function fetchQualityDropDownData(state={data:[]},action){
    switch(action.type){
        case REQUEST_QUALITYDROPDOWN:
            return state
        case RECEIVE_QUALITYDROPDOWN:
            return Object.assign({},state,{data:action.data})
        default:
            return state
    }
}

function pingURLForStatus(state={data:[]},action){
    switch(action.type){
        case RESPONSE_URLSTATUS:
            return Object.assign({},state,{data:action.data,URL:action.URL,server:action.key})
        case ERROR_URLSTATUS:
            return Object.assign({},state,{data:action.data,URL:action.URL,server:action.key})
        default:
            return state
    }
}

const rootreducer = combineReducers({fetchDropDownData,populateDetailData,filterProjectData,fetchQualityDropDownData,pingURLForStatus})
export default rootreducer