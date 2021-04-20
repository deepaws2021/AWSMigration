import React,{Component} from 'react';
import {Panel, Table} from 'react-bootstrap';
import {Grid,Row,Col} from 'react-bootstrap';
import NavigationC from '../components/NavigationC';
import ProgressArcC from '../components/ProgressArcC';
import  index from '../css/index.css';
import { connect } from 'react-redux';
import {fetchQualityDropDownData} from '../actions/index';
import {isNull}  from '../utils/utility'

function clickValue(event) {
    alert("Cell clicked:");
  }
var map = null;

class QualityPanel extends Component{
    data = {staticAnalysis: {blocker:'1',major:'2',critical:'0',issues:'3'},
            securityAnalysis: {blocker:'0',major:'0',critical:'0',issues:'3'},
            codeCoverage:{completePercentage:'40',loc:'12321'},
            unitTest:{success:'0',failure:'',error:'',test:'133'}}
    navDropDowndata = [{label: 'application#1'},{label: 'application#2'},{label: 'application#3'}]  
    onSelectAlert(eventKey){
        this.setState({navSubTitle:eventKey});
        this.child.callBackMethod(eventKey);
        //const { dispatch } = this.props;
        //dispatch(populateDetailData(eventKey));
    }      
    constructor(props){
        super(props);
        this.onSelectAlert = this.onSelectAlert.bind(this);
        this.state={navSubTitle:'Select Project'};
    }
    componentDidMount() {
        this.props.inputRef(this);
        const { dispatch } = this.props
        dispatch(fetchQualityDropDownData());
    }
    dynamicCellColor(value){
        if(value > 0)
        return <font size="3" color="red"><b>{value}</b></font>
        else
        return <font size="2" ><b>{value}</b></font>
    }
    dynamicOddTr(label,value){
        return <tr>
                    <td bgcolor="#ffcc66" align="left" width="50%">
                    <font size="2"><b>{label}</b></font>
                    </td>
                    <td bgcolor="#ffcc66" align="left" width="50%"  onClick={clickValue}>
                    {this.dynamicCellColor(value)}
                    </td>
                </tr>
    }
    dynamicEvenTr(label,value){
        return <tr>
                    <td bgcolor="#e6ffcc" align="left" width="50%">
                    <font size="2"><b>{label}</b></font>
                    </td>
                    <td bgcolor="#e6ffcc" align="left" width="50%" onClick={clickValue}> 
                    {this.dynamicCellColor(value)}
                    </td>
                </tr>
    }
    childCallbackMethod(){
        this.child.callBackMethod('Select Project');
    }
    render(){
        return (
            <Panel>               
                <NavigationC title={"QUALITY"} inputRef={ref => (this.child = ref)} subtitle={this.state.navSubTitle} type = {"sonar"} data={this.props.navDropDowndata} onclick={this.onSelectAlert} filter = {this.props.filter} mappingEnable = {true}/>                
                <Panel.Body> 
                    <table width="100%" className={index.padding}>
                        <tbody>
                            <tr>
                                <td align="left">
                                <u><b>STATIC ANALYSIS</b></u>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table  width="100%"  border="1">
                                    <tbody>
                                        {this.dynamicOddTr("Blocker",this.data.staticAnalysis.blocker)}
                                        {this.dynamicEvenTr("Critical",this.data.staticAnalysis.critical)}  
                                        {this.dynamicOddTr("Major",this.data.staticAnalysis.major)}
                                        {this.dynamicEvenTr("Issues",this.data.staticAnalysis.issues)}
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="left">
                                <u><b>SECURITY ANALYSIS</b></u>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table  width="100%"  border="1">
                                    <tbody>
                                        {this.dynamicOddTr("Blocker",this.data.securityAnalysis.blocker)}
                                        {this.dynamicEvenTr("Critical",this.data.securityAnalysis.critical)}  
                                        {this.dynamicOddTr("Major",this.data.securityAnalysis.major)}
                                        {this.dynamicEvenTr("Issues",this.data.securityAnalysis.issues)}
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="left">
                                <u><b>CODE COVERAGE</b></u>
                                </td>
                            </tr>
                            <tr>
                                <td>    
                                    <ProgressArcC completePercentage={this.data.codeCoverage.completePercentage} loc={this.data.codeCoverage.loc}/>
                                </td>
                            </tr>
                            <tr>
                                <td align="left">
                                <u><b>UNIT TESTS</b></u>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table  width="100%"  border="1">
                                    <tbody>
                                        {this.dynamicOddTr("Success",this.data.unitTest.success)}
                                        {this.dynamicEvenTr("Failure",this.data.unitTest.failure)}  
                                        {this.dynamicOddTr("Errors",this.data.unitTest.error)}
                                        {this.dynamicEvenTr("Tests",this.data.unitTest.test)}
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
function createNavDropDownData(obj){
    let arr = []
    if(!isNull(obj)){  
        map = new Map();            
        for(let t=0; t<obj.length ;t++){
            let finalObj = {};
            finalObj.label = obj[t].name
            arr.push(finalObj); 
            map.set(obj[t].name,obj[t].key);         
        }
    }
    return arr
}
function mapStateToProps(state){   
    return {
        navDropDowndata:createNavDropDownData(state.fetchQualityDropDownData.data.components)
    };
  }
export default connect(mapStateToProps)(QualityPanel);