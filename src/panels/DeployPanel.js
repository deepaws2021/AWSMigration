import React,{Component} from 'react';
import {Panel} from 'react-bootstrap';
import GridC from '../components/GridC';
import {Grid,Row,Col} from 'react-bootstrap';
import BarchartC from '../components/BarchartC';
import DateTimePanel from './DateTimePanel';
import NavigationC from '../components/NavigationC';
import BarchartGroupC from '../components/BarchartGroupC';
import LinechartC from '../components/LinechartC';
import PiechartC from '../components/PiechartC';

class DeployPanel extends Component{
     options = {
        onRowClick: function(row) {
          alert(`You click build id: ${row.env}`);
        },
        onRowDoubleClick: function(row) {
          alert(`You double click build id: ${row.env}`);
        }
      };
    nameFormatter(cell) {        
        if(cell == 'success'){            
           return '<p><font color=\'green\'>'+cell+'</p>';
        }
        if(cell == 'failure'){            
            return '<p><font color=\'red\'>'+cell+'</p>';
        }
        if(cell == 'abort'){            
            return '<p><font color=\'orange\'>'+cell+'</p>';
        }
    }
    constructor(){
        super();
        this.nameFormatter = this.nameFormatter.bind(this);
    }
    navDropDowndata = [{label: 'job#1'},{label: 'job#2'},{label: 'job#3'}] 
    dateTime = [{label:'TODAY',value:'3'},{label:'LAST 7D',value:'13'},{label:'LAST 15D',value:'23'}]  
    gridData = [{last:'success', env: "UAT", age: "Dec 21",success:2,failure:0 },{last:'failure',env:"SIT",age: "Dec 22",success:3,failure:1 },{last:'success',env: "DEV",age: "Dec 22",success:1,failure:0 },{ last:'abort',env: "PER", age: "Dec 23",success:2,failure:0 }]
    barchartGroupData = [{ label: 'failure', values: [{x: 'Dec20', y: 0}, {x: 'Dec21', y: 4}, {x: 'Dec22', y: 3}] }, { label: 'success', values: [{x: 'Dec20', y: 6}, {x: 'Dec21', y: 8}, {x: 'Dec22', y: 5}] }]           
    linechartData= {label: '', values: [
        {x: new Date(2017, 2, 5), y: 4},
        {x: new Date(2017, 2, 6), y: 4},
        {x: new Date(2017, 2, 7), y: 6.5},
        {x: new Date(2017, 2, 8), y: 3},
        {x: new Date(2017, 2, 9), y: 3},
        {x: new Date(2017, 2, 10), y: 4},
        {x: new Date(2017, 2, 11), y: 4},
        {x: new Date(2017, 2, 12), y: 4.5},
        {x: new Date(2017, 2, 13), y: 4}
    ]}
    linerchartDateRange = [new Date(2017, 2, 5), new Date(2017, 2, 13)]
    deployData = {
        label: 'somethingA',
        values: [{x: 'Success', y: 10}, {x: 'Failure', y: 4}, {x: 'Abort', y: 3},{x: 'Rollback', y: 3}]
    }
    scale = ['green','red','grey','blue']
    render(){
        return (
            <Panel>               
                <NavigationC title={"DEPLOY"} inputRef={ref => (this.child = ref)} subtitle={"Select Application"} data = {this.navDropDowndata}/>
                <Panel.Body> 
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td>
                                <u><b><p align="left">TOTAL NUMBER OF DEPLOYMENTS</p></b></u>
                            </td>
                            <td>
                                <u><b><p align="left">DEPLOYMENT STATUS</p></b></u>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <table  width="100%">
                                        <tbody>
                                                <tr>
                                                        <td width="10%" align="right" valign="center">
                                                            <b><font size="10" color="purple">148</font></b>
                                                            </td>
                                                        <td  width="90%"><PiechartC data = {this.deployData} width={300} height={200} scale={this.scale}/>
                                                            </td>
                                                    </tr>
                                            </tbody>
                                    </table>
                                
                            </td>
                            <td width="50%">
                                <GridC data={this.gridData} nameFormatter={this.nameFormatter} options={this.options} isDeploy = {true}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <u><b><p align="left">DEPLOYMENT DURATION</p></b></u>
                            </td>
                            <td>
                                <u><b><p align="left">SUCCESSFUL DEPLOYMENTS</p></b></u>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <LinechartC data = {this.linechartData} dataRange = {this.linerchartDateRange}/>
                            </td>
                            <td width="50%">
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <font size="10" color="green">12</font>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <DateTimePanel label={this.dateTime} isOnlyTimeRequired={true} tileLabel={"AVERAGE DURATION OF SUCCESSFUL BUILD"}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                                       
                </Panel.Body>
            </Panel>
        );
    }
}
export default DeployPanel;