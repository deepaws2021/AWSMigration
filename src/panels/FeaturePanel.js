import React,{Component} from 'react';
import {Panel} from 'react-bootstrap';
import GridC from '../components/GridC';
import {Grid,Row,Col} from 'react-bootstrap';
import BarchartC from '../components/BarchartC';
import DateTimePanel from './DateTimePanel';
import NavigationC from '../components/NavigationC';
import BarchartGroupC from '../components/BarchartGroupC';

class FeaturePanel extends Component{
    navDropDowndata = [{label: 'sprint#1'},{label: 'sprint#2'},{label: 'sprint#3'}]   
    dateTime = [{label:'TOTAL',value:'11'},{label:'WIP',value:'4'},{label:'DONE',value:'7'}]
    gridData = [{feature:'AAA_feature', point: 3 },{feature:'BBB_feature', point: 4},{feature:'CCC_feature', point: 3},{feature:'DDD_feature', point: 4 },{feature:'EEE_feature', point: 2 }]  
    barchartGroupData = [{ label: 'incomplete', values: [{x: 'sprint#1', y: 2}, {x: 'sprint#2', y: 2}, {x: 'sprint#3', y: 1},{x: 'sprint#4', y: 0}] }, { label: 'complete', values: [{x: 'sprint#1', y: 3}, {x: 'sprint#2', y: 5}, {x: 'sprint#3', y: 1},{x: 'sprint#4', y: 2}] }]           

    constructor(){
        super();
        this.nameFormatter = this.nameFormatter.bind(this);
    }
    render(){
        return (
            <Panel>               
                <NavigationC title={"SPRINT"} inputRef={ref => (this.child = ref)} subtitle={"Select Sprint"} data = {this.navDropDowndata}/>
                <Panel.Body> 
                    <table width="100%">
                        <tbody>
                        <tr>                           
                            <td >
                                <DateTimePanel label={this.dateTime} isTimeRequired={false}/>
                            </td>                         
                        </tr>
                        <tr>
                            <td  width="50%">                             
                                <GridC data={this.gridData} nameFormatter={this.nameFormatter} options={this.options} isFeature = {true}/>                           
                            </td>                          
                        </tr>
                        <tr>
                            <td>
                                <u><b><p align="left">SPRINT STATUS</p></b></u>
                            </td> 
                        </tr>
                        <tr>
                            <td  width="50%">
                                <BarchartGroupC data={this.barchartGroupData} width={300} isFeature={true}/>
                            </td> 
                        </tr>
                    </tbody>
                    </table>
                                       
                </Panel.Body>               
            </Panel>
        );
    }
    options = {
        onRowClick: function(row) {
          alert(`You click build id: ${row.feature}`);
        },
        onRowDoubleClick: function(row) {
          alert(`You double click build id: ${row.feature}`);
        }
      };
    nameFormatter(cell) {                          
           return '<p><font color=\'blue\'>'+cell+'</p>';      
    }
}
export default FeaturePanel;