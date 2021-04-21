import axios from 'axios';
import projectmapping from '../ProjectMapping.json';
export const REQUEST_DROPDOWN = 'REQUEST_DROPDOWN'
export const RECEIVE_DROPDOWN = 'RECEIVE_DROPDOWN'
export const REQUEST_POPULATE = 'REQUEST_POPULATE'
export const RECEIVE_POPULATE = 'RECEIVE_POPULATE'
export const REQUEST_FILTER = 'REQUEST_FILTER'
export const REQUEST_QUALITYDROPDOWN = 'REQUEST_QUALITYDROPDOWN'
export const RECEIVE_QUALITYDROPDOWN = 'RECEIVE_QUALITYDROPDOWN'
export const RESPONSE_URLSTATUS = 'RESPONSE_URLSTATUS'
export const ERROR_URLSTATUS = 'ERROR_URLSTATUS'

function requestDropdown() {
    return {
      type: REQUEST_DROPDOWN
    }
  }
  
function responseDropdown(json) {
    return {
      type: RECEIVE_DROPDOWN,
      data:json.data
    }
  }
function errorDropdown(json) {
	return {
		type: 'ERROR',
		data: json
	}
}

function requestPopulate() {
  return {
    type: REQUEST_POPULATE
  }
}

function responsePopulate(json) {
  return {
    type: RECEIVE_POPULATE,
    data:json.data
  }
}
function errorPopulate(json) {
  return {
    type: 'ERROR',
    data: json
  }
}
function requestFilterProjectData(json) {
  return {
    type: REQUEST_FILTER,
    data: json
  }
}

function requestQualityDropdown() {
  return {
    type: REQUEST_QUALITYDROPDOWN
  }
}

function responseQualityDropdown(json) {
  return {
    type: RECEIVE_QUALITYDROPDOWN,
    data:json.data
  }
}

function responseURLStatus(URL,key) {
  return {
    type: RESPONSE_URLSTATUS,
    data: 'UP',
    URL:URL,
    key:key
  }
}
function errorURLStatus(URL,key) {
  return {
    type: ERROR_URLSTATUS,
    data: 'DOWN',
    URL:URL,
    key:key
  }
}

var axiosConfig = {
    auth: {
        username: 'admin',
        password: 'cc5c1a2f72554208a6d23a9fe6564c45'
      },
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
  };
  var axiosCommonConfig = {
   
    headers: {
        
        "Access-Control-Allow-Origin": "*",
    }
  };
export function fetchDropDownData() {
    return dispatch => {
        dispatch(requestDropdown())
        return axios.get('http://172.31.31.187:8080/api/json',axiosConfig)
                    .then(function(response) {
                      dispatch(responseDropdown(response));
                    })
                    .catch(function(response){
                      dispatch(errorDropdown(response));				
                    })
    }
}
export function populateDetailData(jobName){
    return dispatch => {
      dispatch(requestPopulate())
      let url = 'http://172.31.31.187:8080/job/'+jobName+'/api/json?tree=builds[number,timestamp,id,result,duration]'
      return axios.get(url,axiosConfig)
                  .then(function(response) {
                    dispatch(responsePopulate(response));
                  })
                  .catch(function(response){
                    dispatch(errorPopulate(response));				
                  })
  }
}
export function filterProjectData(projectName){
    return dispatch => {
      dispatch(requestFilterProjectData(projectName))      
  }
}
export function fetchQualityDropDownData(){
  return dispatch => {
    dispatch(requestQualityDropdown())
    let url = projectmapping.sonar.serverURL+'/api/components/search?qualifiers=TRK'
    return axios.get(url)
                .then(function(response) {
                  dispatch(responseQualityDropdown(response));
                })
                .catch(function(response){
                  dispatch(errorPopulate(response));				
                })
  }
}
export function pingURLForStatus(URL,key){
  return dispatch => {    
      return axios.get(URL,axiosConfig)
                  .then(function(response) {
                    dispatch(responseURLStatus(URL,key));
                  })
                  .catch(function(response){
                    dispatch(errorURLStatus(URL,key));				
                  })
    }
}