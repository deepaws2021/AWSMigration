import React,{Component} from 'react';
import {Panel} from 'react-bootstrap';
import GridC from '../components/GridC';
import {Grid,Row,Col} from 'react-bootstrap';
import BarchartC from '../components/BarchartC';
import DateTimePanel from './DateTimePanel';
import NavigationC from '../components/NavigationC';
import BarchartGroupC from '../components/BarchartGroupC';

class ReleasePanel extends Component{
    navDropDowndata = [{label: 'sprint#1'},{label: 'sprint#2'},{label: 'sprint#3'}]   
    dateTime = [{label:'TOTAL',value:'11'},{label:'WIP',value:'4'},{label:'DONE',value:'7'}]
    gridData = [{build:21, status: 'Released', releaseTime:'2017' },{build:23, status: 'Released', releaseTime:''},{build:24, status: 'Staged', releaseTime:''},{build:25, status: 'Released', releaseTime:'' }]  
    barchartGroupData = [{ label: 'incomplete', values: [{x: 'sprint#1', y: 2}, {x: 'sprint#2', y: 2}, {x: 'sprint#3', y: 1},{x: 'sprint#4', y: 0}] }, { label: 'complete', values: [{x: 'sprint#1', y: 3}, {x: 'sprint#2', y: 5}, {x: 'sprint#3', y: 1},{x: 'sprint#4', y: 2}] }]           

    constructor(){
        super();
        this.nameFormatter = this.nameFormatter.bind(this);
    }
    render(){
        return (
            <Panel>               
                <NavigationC title={"RELEASE"} inputRef={ref => (this.child = ref)} subtitle={"Select Application"} data = {this.navDropDowndata}/>
                <Panel.Body> 
                    <table width="100%">
                        <tbody>
                        <tr>                           
                            <td >
                                <u><b><p align="left">RELEASE STATUS</p></b></u>
                            </td>                         
                        </tr>
                        <tr>
                            <td  width="100%">                             
                                <BarchartC/>                           
                            </td>                          
                        </tr>
                        <tr>
                            <td>
                                <u><b><p align="left">RELEASE DETAIL</p></b></u>
                            </td> 
                        </tr>
                        <tr>
                            <td  width="100%">
                                <GridC data={this.gridData} nameFormatter={this.nameFormatter} options={this.options} isRelease = {true}/>
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
          alert(`You click build id: ${row.status}`);
        },
        onRowDoubleClick: function(row) {
          alert(`You double click build id: ${row.status}`);
        }
      };
    nameFormatter(cell) {                          
        if(cell == 'Released'){            
            return '<p><font color=\'green\'>'+cell+'</p>';
         }
         if(cell == 'Staged'){            
             return '<p><font color=\'red\'>'+cell+'</p>';
         }     
    }
}
export default ReleasePanel;