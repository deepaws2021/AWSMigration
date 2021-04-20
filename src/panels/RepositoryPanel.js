import React,{Component} from 'react';
import {Panel} from 'react-bootstrap';
import GridC from '../components/GridC';
import {Grid,Row,Col} from 'react-bootstrap';
import BarchartC from '../components/BarchartC';
import DateTimePanel from './DateTimePanel';
import NavigationC from '../components/NavigationC';
import BarchartGroupC from '../components/BarchartGroupC';
import LinechartC from '../components/LinechartC';
import AreachartC from '../components/AreachartC';
import PiechartC from '../components/PiechartC';

class RepositoryPanel extends Component{
    
    constructor(){
        super();
    }
   linechartData= {label: '', values: [
        {x: new Date(2017, 2, 5), y: 2},
        {x: new Date(2017, 2, 6), y: 2},
        {x: new Date(2017, 2, 7), y: 1},
        {x: new Date(2017, 2, 8), y: 0},
        {x: new Date(2017, 2, 9), y: 0},
        {x: new Date(2017, 2, 10), y: 3},
        {x: new Date(2017, 2, 11), y: 1},
        {x: new Date(2017, 2, 12), y: 1},
        {x: new Date(2017, 2, 13), y: 1}
    ]}
    linerchartDateRange = [new Date(2017, 2, 5), new Date(2017, 2, 13)]
    navDropDowndata = [{label: 'job#1'},{label: 'job#2'},{label: 'job#3'}] 
    commitData = {
        label: 'somethingA',
        values: [{x: 'TODAY', y: 10}, {x: 'LAST 7D', y: 4}, {x: 'LAST 14D', y: 3}]
    }
    contributorData = {
        label: 'somethingA',
        values: [{x: 'TODAY', y: 3}, {x: 'LAST 7D', y: 6}, {x: 'LAST 14D', y: 12}]
    }
    scale = ['blue','pink','purple']
    render(){
        return (
            <Panel>               
                <NavigationC title={"REPOSITORY"} inputRef={ref => (this.child = ref)} subtitle={"Select repo"} data = {this.navDropDowndata}/>
                <Panel.Body> 
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td width="100%">
                                <u><b><p align="left">COMMITS PER DAY</p></b></u>
                            </td>
                           
                        </tr>
                        <tr>
                            <td width="100%">
                                <AreachartC data = {this.linechartData} dataRange = {this.linerchartDateRange} width={300}/>
                            </td>
                           
                        </tr>
                        <tr>
                            <td width="100%">
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td width="50%">                                           
                                                <u><b><p align="left">TOTAL COMMITS</p></b></u>
                                            </td>
                                            <td width="50%">
                                                <u><b><p align="left">CONTRIBUTORS</p></b></u>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td width="50%" align="center">
                                                <PiechartC data = {this.commitData} width={250} height={200} scale={this.scale}/>
                                            </td>
                                            <td width="50%" align="right">
                                                <PiechartC data = {this.contributorData} width={250} height={200} scale={this.scale}/>
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
export default RepositoryPanel;