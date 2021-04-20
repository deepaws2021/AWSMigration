import React,{Component} from 'react';
import {Panel} from 'react-bootstrap';
import GridC from '../components/GridC';
import {Grid,Row,Col} from 'react-bootstrap';
import BarchartC from '../components/BarchartC';
import DateTimePanel from './DateTimePanel';
import NavigationC from '../components/NavigationC';
import BarchartGroupC from '../components/BarchartGroupC';
import LinechartC from '../components/LinechartC';
import {fetchDropDownData, populateDetailData} from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isNull, getFormatedDateString, getFormatedDate, millisToMinutesAndSeconds, getFormatedDateForKey, getDateFromString, getDayFromDate, getTimeToDisplay}  from '../utils/utility'
import EnvironmentStatusCheckPanel from './EnvironmentStatusCheckPanel';
import BuildSettingPanel from '../modal/BuildSettingPanel';
import projectmapping from '../../../ProjectMapping.json';
import ConfigureAlertC from '../components/ConfigureAlertC';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import NotificationC from '../components/NotificationC';

var titleToShow;

class BuildPanel extends Component{
    onSelectAlert(eventKey){
        titleToShow = eventKey;        
        this.setState({navSubTitle:eventKey});
        this.child.callBackMethod(eventKey);
        const { dispatch } = this.props
        dispatch(populateDetailData(eventKey));
    }
    refreshClick() {
        this.setTimer();
    }
    settingClick() {
        this.buildSetting.handleShow();       
    }
    saveForm(){
        this.buildSetting.handleSaveClose();
        this.setTimer();
        this.setState({configureView:false}); 
        this.child.callBackMethod('Select Job');
        const { dispatch } = this.props;
        dispatch(fetchDropDownData());
    }
     options = {
        onRowClick: function(row) {
          window.open("http://localhost:8080/job/"+titleToShow+"/"+row.id,"_blank");
        },
        onRowDoubleClick: function(row) {
          alert(`You double click build id: ${row.id}`);
        }
      };
    nameFormatter(cell) {        
        if(cell == 'SUCCESS'){            
           return '<p><font color=\'green\'>success</p>';
        }
        if(cell == 'FAILURE'){            
            return '<p><font color=\'red\'>failure</p>';
        }
        if(cell == 'ABORTED'){            
            return '<p><font color=\'grey\'>aborted</p>';
        }
        if(cell == 'UNSTABLE'){            
            return '<p><font color=\'yellow\'>unstable</p>';
        }
    }
    componentDidMount() {
        this.props.inputRef(this);
        setInterval(this.setTimer,10000);
        const { dispatch } = this.props;
        dispatch(fetchDropDownData());
    }
    componentWillUnmount() {
        
    }
    childCallbackMethod(){
        this.child.callBackMethod('Select Job');
        titleToShow = null;
    }
    constructor(props){
        super(props);
        this.nameFormatter = this.nameFormatter.bind(this);
        this.onSelectAlert = this.onSelectAlert.bind(this);
        this.refreshClick = this.refreshClick.bind(this);
        this.settingClick = this.settingClick.bind(this);
        
        this.saveForm = this.saveForm.bind(this);
        this.state={navSubTitle:'Select Job',configureView:(projectmapping.jenkins.serverURL != '' ?false:true)};
        this.setTimer = this.setTimer.bind(this);
    }
    setTimer(){
        if(!(titleToShow === null || titleToShow === '' || titleToShow == undefined)){ console.log('timer calling populate data....');
            const { dispatch } = this.props
            dispatch(populateDetailData(titleToShow));
        }
    }

    linerchartDateRange = [new Date(2017, 10, 15), new Date(2017, 10, 28)]
    render(){
        
        if(this.state.configureView){
            return (
                <Panel bsStyle="danger" >                 
                <NavigationC title={"BUILD"} inputRef={ref => (this.child = ref)}  dropDownNotRequired={true} onSetting={this.settingClick}/>                             
                <Panel.Body>
                    <ConfigureAlertC inputRef={ref => (this.configure = ref)}/>
                    <BuildSettingPanel inputRef={ref => (this.buildSetting = ref)} submitform = {this.saveForm}/>
                </Panel.Body>                
                </Panel>
            );
        }else{
        return (
            <Panel>             
                <NavigationC title={"BUILD"}  inputRef={ref => (this.child = ref)} subtitle={this.state.navSubTitle} type = {"jenkins"} data = {this.props.navDropDowndata} onclick={this.onSelectAlert} filter = {this.props.filter} mappingEnable = {true} onRefresh={this.refreshClick} onSetting={this.settingClick}/>
                <Panel.Body> 
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td> 
                                <u><b><p align="left">BUILDS PER DAY</p></b></u>
                            </td>
                            <td>
                                <u><b><p align="left">LATEST BUILDS</p></b></u>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <BarchartGroupC data={this.props.barchartGroupData} isBuild={true} width={300}/>
                            </td>
                            <td width="50%">
                                <GridC data={this.props.gridData} nameFormatter={this.nameFormatter} options={this.options} isBuild = {true}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <u><b><p align="left">BUILD DURATION</p></b></u>
                            </td>
                            <td>
                                <u><b><p align="left">TOTAL BUILDS</p></b></u>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <LinechartC data = {this.props.linechartData} dataRange = {this.linerchartDateRange}/>
                            </td>
                            <td width="50%">
                                <DateTimePanel label={this.props.dateTime} isTimeRequired={true} time={this.props.averageTime}/>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    <BuildSettingPanel inputRef={ref => (this.buildSetting = ref)} submitform = {this.saveForm}/> 
                    <NotificationC inputRef={ref => (this.notification = ref)} show={this.props.notify}/>                
                </Panel.Body>
            </Panel>
            );
        }
    }
 
}
/*function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(fetchDropDownData, dispatch) }
  }*/
function createNavDropDownData(obj){
    let arr = []
    if(!isNull(obj)){              
        for(let t=0; t<obj.length ;t++){
            let finalObj = {};
            finalObj.label = obj[t].name
            arr.push(finalObj);          
        }
    }
    return arr
}

function createGridDetailData(obj){
    let finalArray  = [];
    let arr = [];
    let errorMsg;
    let failuerCOunter = 0;
    let flag = false;
    if(!isNull(obj)){              
        for(let t=0; t<obj.length ;t++){
            let finalObj = {};
            if(obj[t].result === 'FAILURE'){
                failuerCOunter++;
                flag = true;
            }else{
                flag = false;
            }
            if(failuerCOunter > 1 && flag == true){
                errorMsg = "2 consecutive build failure Occured!!";
            }
            finalObj.status = obj[t].result
            finalObj.id = obj[t].number
            finalObj.age = getFormatedDateString(obj[t].timestamp,true)
            arr.push(finalObj);          
        }
    }
    finalArray[0] = arr;
    finalArray[1]  = errorMsg;
    return finalArray;
}
function createBarChartDetailData(obj){
    let arr = [];
    let fArr = [];
    let counter = 0;
    let successCount = 0;
    let failureCount = 0;
    let successArray = [];
    let failureArray = [];
            
    let successMap = new Map();
    let failureMap = new Map();

    let finalSuccessDate;
    let finalFailureDate;
    let dateCounter = 0;
    let startDate = new Date(2017,10,1);
    let endDate = new Date(2017,11,30);

        if(!isNull(obj)){              
            for(var t=0; t<obj.length ;t++){
            //if(dateCounter==8)break;
                let status = obj[t].result;
                let successDate;
                let failureDate;
                let tempDate = new Date(obj[t].timestamp);
                //console.log("tempDate:"+tempDate + ",status:"+status); 
                //console.log("startDate:"+startDate);
                //console.log("endDate:"+endDate);
                if(tempDate >= startDate && tempDate<= endDate){
                    //console.log("show data for "+tempDate);
                    if(status=='SUCCESS'){
                        successDate = getFormatedDateString(obj[t].timestamp,false);        
                        //console.log("successDate:"+successDate);       
                        if(successMap.has(successDate)){
                            let objTemp = successMap.get(successDate);
                            successMap.set(successDate,++objTemp);
                        }else{
                            successMap.set(successDate,1);
                            dateCounter++;
                        }
                    } 
                    if(status=='FAILURE'){               
                        failureDate = getFormatedDateString(obj[t].timestamp,false);
                    // console.log("failureDate:"+failureDate);      
                        if(failureMap.has(failureDate)){
                            let objTemp = failureMap.get(failureDate);
                            failureMap.set(failureDate,++objTemp);
                        }else{
                            failureMap.set(failureDate,1);
                            dateCounter++;
                        }
                        
                    }
                } 
               
            }
            successMap.forEach(function (item, key, mapObj) {
                if(!failureMap.has(key)){
                    let swapObj = {};
                    swapObj.x = key;
                    swapObj.y = 0;
                    failureMap.set(key,0);
                }  
            });
            failureMap.forEach(function (item, key, mapObj) { 
                if(!successMap.has(key)){
                    let swapObj = {};
                    swapObj.x = key;
                    swapObj.y = 0;
                    successMap.set(key,0);
                } 
            });
            successMap.forEach(function (item, key, mapObj) {  
                let finalObj = {};
                    finalObj.x = key;
                    finalObj.y = mapObj.get(key);
                    successArray.push(finalObj);  
            });
            failureMap.forEach(function (item, key, mapObj) { 
                let finalObj = {};
                    finalObj.x = key;
                    finalObj.y = mapObj.get(key);
                    failureArray.push(finalObj); 
            });
        let sob = {};
        let fob = {};
        sob.values = successArray;
        sob.label = 'success';
        fob.values = failureArray;
        fob.label = 'failure';
        
        fArr.push(sob);
        fArr.push(fob);
    }
    console.log(fArr);
    return fArr;
}
function createLinerChartDetailData(obj){
    let arr = []
    let fob = {};
    let count = 1;
    let map = new Map();
    let countMap = new Map();
    if(!isNull(obj)){              
        for(let t=0; t<obj.length ;t++){
            let key = getFormatedDateForKey(obj[t].timestamp);
            //console.log('key:'+key);
            let value = millisToMinutesAndSeconds(obj[t].duration)
            if(map.has(key)){
                let valueTemp = map.get(key);
                map.set(key,(valueTemp + value));
                let countValue = countMap.get(key);
                countMap.set(key,++countValue);
            }else{
                map.set(key,value);
                countMap.set(key,1);
            }
           
        }
        map.forEach(function (item, key, mapObj) {  
            let finalObj = {};
                finalObj.x = getDateFromString(key);
                finalObj.y = mapObj.get(key)/countMap.get(key);               
                arr.push(finalObj);            
        });
        fob.values = arr;
    }
    //console.log(map);
   // console.log(countMap);
    //console.log(fob);
    return fob
}
function createAverageTime(obj){
    let count = 0;
    let totalDuration = 0;
    if(!isNull(obj)){ 
        for(let t=0; t<obj.length ;t++){
            //let value = millisToMinutesAndSeconds(obj[t].duration);
            let value = obj[t].duration;
            totalDuration = totalDuration + value;
            count++;
        }
        let average = getTimeToDisplay(totalDuration/count);
        //console.log("average:"+average);
        return average
    }else{
        return "0"
    }
}
function createDateAndTime(obj){
    let fArr = [];
    let currentDateCount = 0;
    let sevenDaysBackCount= 0;
    let forteenDaysBackCount= 0;

    let sevendaysBack = new Date();
    sevendaysBack.setDate(sevendaysBack.getDate() - 7);
    
    let forteendaysBack = new Date();
    forteendaysBack.setDate(forteendaysBack.getDate() - 14);
    if(!isNull(obj)){ 
        for(let t=0; t<obj.length ;t++){
            let tempDate = getFormatedDate(obj[t].timestamp);
            //console.log("tempDate:"+getDayFromDate(tempDate)+",current date:"+getDayFromDate(new Date()));
            if(getDayFromDate(tempDate) == getDayFromDate(new Date())){
                currentDateCount++;
            }//console.log("tempDate:"+tempDate+",sevendaysBack:"+sevendaysBack);
            if(tempDate > sevendaysBack){
                sevenDaysBackCount++;
            }
            //console.log("tempDate:"+tempDate+",forteendaysBack:"+forteendaysBack);
            if(tempDate > forteendaysBack){
                forteenDaysBackCount++;
            }
        }
    }
    let todayObj = {};
    todayObj.label = "TODAY";
    todayObj.value = currentDateCount;               
    fArr.push(todayObj);
    let last7daysObj = {};
    last7daysObj.label = "LAST 7D";
    last7daysObj.value = sevenDaysBackCount;               
    fArr.push(last7daysObj); 
    let last14daysObj = {};
    last14daysObj.label = "LAST 14D";
    last14daysObj.value = forteenDaysBackCount;               
    fArr.push(last14daysObj); 

    return fArr;
}
function mapStateToProps(state){ 
    let arr = createGridDetailData(state.populateDetailData.data.builds);
    return {
        navDropDowndata:createNavDropDownData(state.fetchDropDownData.data.jobs),
        gridData:arr[0],
        notify:arr[1],
        barchartGroupData:createBarChartDetailData(state.populateDetailData.data.builds),
        linechartData:createLinerChartDetailData(state.populateDetailData.data.builds),
        dateTime:createDateAndTime(state.populateDetailData.data.builds),
        averageTime:createAverageTime(state.populateDetailData.data.builds)
    };
  }
export default connect(mapStateToProps)(BuildPanel);