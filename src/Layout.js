import {Grid,Row,Col,Image} from 'react-bootstrap';
import React,{Component} from 'react';
import BuildPanel from './panels/BuildPanel';
import {Panel} from 'react-bootstrap';
import QualityPanel from './panels/QualityPanel';
import FeaturePanel from './panels/FeaturePanel';
import NavigationC from './components/NavigationC';
import add from './images/plus-math.png';
import RepositoryPanel from './panels/RepositoryPanel';
import DeployPanel from './panels/DeployPanel';
import ReleasePanel from './panels/ReleasePanel';
import {filterProjectData} from './actions/index';
import { connect } from 'react-redux';
import EnvironmentStatusCheckPanel from './panels/EnvironmentStatusCheckPanel';

var navTitle = null;

class Layout extends Component{
    navDropDowndata = [{label: 'ALM'},{label: 'Selenium'},{label: 'DashBoard#3'},{label: 'NoFilter'}] 
    constructor(){
        super();
        this.onSelectAlert = this.onSelectAlert.bind(this);
        this.state={navSubTitle:'Select Project'};
    }
    onSelectAlert(eventKey){
        this.setState({navSubTitle:eventKey});
        const { dispatch } = this.props;
        this.nav.callBackMethod(eventKey);
        this.buildNav.childCallbackMethod(eventKey);
        this.qualityNav.childCallbackMethod(eventKey);
        navTitle = eventKey;
        dispatch(filterProjectData(eventKey));
    }
    dynamicContent(){
        return(<table width="100%">
                <tbody>
                    <tr >
                        <td >
                            <Panel>
                                <Panel.Body>                                  
                                    <NavigationC title={"DASHBOARD"}  inputRef={ref => (this.nav = ref)} subtitle={this.state.navSubTitle} dropdowntitle={"PROJECT"} data = {this.navDropDowndata} onclick={this.onSelectAlert}/>
                                </Panel.Body>
                            </Panel>
                        </td>
                    </tr>
                    <tr >
                        <td>
                        <Panel>
                            <Panel.Body>
                                <Grid>
                                    <Row>
                                        <Col xs={0} md={4}>                           
                                            <FeaturePanel/>
                                        </Col> 
                                        <Col xs={0} md={5}>                           
                                            <BuildPanel inputRef={ref => (this.buildNav = ref)} filter = {this.props.filterData} navSubTitle = {navTitle== null ?'Select Job':navTitle}/>
                                        </Col> 
                                        <Col xs={0} md={3}>                           
                                            <QualityPanel  inputRef={ref => (this.qualityNav = ref)} filter = {this.props.filterData}/>
                                        </Col>                                                                                
                                    </Row>
                                    <Row>
                                        <Col xs={0} md={4}>                           
                                            <RepositoryPanel/>
                                        </Col> 
                                        <Col xs={0} md={5}>                           
                                            <DeployPanel/>
                                        </Col>
                                        <Col xs={0} md={3}>                           
                                        <EnvironmentStatusCheckPanel filter = {this.props.filterData} serverMap = {new Map()}/>
                                        <ReleasePanel/> 
                                        </Col>                                                                               
                                    </Row> 
                                </Grid>
                            </Panel.Body>
                        </Panel>
                        </td>
                    </tr>
                </tbody>
            </table>
                );
        
    }
    render(){
        return(this.dynamicContent());
    }
}
function mapStateToProps(state){   
    return {
        filterData:state.filterProjectData.data      
    };
  }
export default connect(mapStateToProps)(Layout);