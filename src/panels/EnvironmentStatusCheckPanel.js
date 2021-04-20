import React,{Component} from 'react';
import {pingURLForStatus, ERROR_URLSTATUS} from '../actions/index';
import { connect } from 'react-redux';
import serverconfiguration from '../../../ServerConfiguration.json';
import TableC from '../components/TableC';
import {Panel} from 'react-bootstrap';
import NavigationC from '../components/NavigationC';
import GridC from '../components/GridC';
var map =  new Map();
class EnvironmentStatusCheckPanel extends Component{
    navDropDowndata = [{label: 'sprint#1'},{label: 'sprint#2'},{label: 'sprint#3'}] 
    constructor(p){
        super();
        this.setTimer = this.setTimer.bind(this);
        this.state={status:null}
        this.pingURL = this.pingURL.bind(this);
        this.nameFormatter = this.nameFormatter.bind(this);
    }
    nameFormatter(cell) {        
        if(cell == 'UP'){            
           return '<p><font color=\'green\'>UP</p>';
        }
        if(cell == 'DOWN'){            
            return '<p><font color=\'red\'>DOWN</p>';
        }
    }
    componentDidMount(){
        setInterval(this.setTimer,10000);
    }
    setTimer(){
        console.log("PING URL.......");
        map = this.props.serverMap;
        for(let i = 0;i<serverconfiguration.server.length ; i++){
            console.log('URL to invoke:'+serverconfiguration.server[i].serverurl);
            if(this.props.filter != null && this.props.filter === serverconfiguration.server[i].projectname){
                this.pingURL(serverconfiguration.server[i].serverurl,serverconfiguration.server[i].credentials,serverconfiguration.server[i].headerRequired,serverconfiguration.server[i].servername,map);
            }
        }
        
        console.log(map);
        this.setState({status:map});
       
    }
    pingURL(URL,credentials,headerRequired,servername,map){
        console.log('URL:'+URL);
        let temp ={};
        if(headerRequired){
            temp = {'Authorization': 'Basic ' + btoa(credentials),           
            'Access-Control-Allow-Origin':'*'}
        }
        fetch(URL,{
        withCredentials: true,
        credentials: 'include',
        headers:temp
        })
            .then(response => {
                if (response.ok) {console.log('success');
                    let obj = {};
                    obj.servername = servername;
                    obj.status = 'UP';
                    map.set(URL,obj);
                  
                } else {console.log('error');
                    let obj = {};
                    obj.servername = servername;
                    obj.status = 'DOWN';
                    map.set(URL,obj);
                  
                }
              })
              .catch((status, err) => {
                console.log('err');
                let obj = {};
                obj.servername = servername;
                obj.status = 'DOWN';
                map.set(URL,obj);
              });;
        
    }

    render(){
        let rows = [];
        if(this.state.status != null){
            this.state.status.forEach(function(item, key, mapObj) {
                let obj = mapObj.get(key);
                //rows.push(<TableC serverurl={key} status={obj.status} servername={obj.servername} />);
                let finalObj = {};
                finalObj.status = obj.status
                finalObj.serverurl = key
                finalObj.servername = obj.servername
                rows.push(finalObj);
            }.bind(this)); 
        }
        console.log("length:"+rows.length);
        if(rows.length !=0)     {
            return (
                <Panel>               
                <NavigationC title={"MONITOR"} inputRef={ref => (this.child = ref)} subtitle={"Select Application"} data = {this.navDropDowndata} dropDownNotRequired={true}/>
                <Panel.Body>                
                    <div><GridC data={rows} nameFormatter={this.nameFormatter}  isStatus = {true}/></div>
                </Panel.Body>
                </Panel>
            );
        }else{
            return (
                <Panel>               
                <NavigationC title={"MONITOR"} inputRef={ref => (this.child = ref)} subtitle={"Select Application"} data = {this.navDropDowndata} dropDownNotRequired={true}/>
                <Panel.Body>
                    <div>No data found</div> 
                </Panel.Body>
                </Panel>
             );
        }
    }
}

export default  EnvironmentStatusCheckPanel;