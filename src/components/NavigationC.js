import React, {Component} from 'react';
import {Panel,Glyphicon,DropdownButton,MenuItem, Image} from 'react-bootstrap';
import {Grid,Row,Col} from 'react-bootstrap';
import email from '../images/email-16.png';
import refresh from '../images/refresh-16.png';
import setting from '../images/setting-16.png';
import projectmapping from '../../../ProjectMapping.json';

//function onSelectAlert(job) {
  //  alert(`Alert from menu item.\neventKey: ${job}`);
 // }
//function settingClick() {
  //  alert(`Alert from setting:`);
 // }
  function emailClick() {
    alert(`Alert from email:`);
  }
  //function refreshClick() {
 //   alert(`Alert from refresh:`);
 // }

class NavigationC extends Component{
    
    constructor(props){
        super(props);
        this.state={navSubTitle:this.props.subtitle};
    }
    componentDidMount() {
        this.props.inputRef(this)
     }
    componentDidUpdate() {
        
     }
    
     selectToolMappingData(){
         switch(this.props.type){
            case "jenkins":
                return projectmapping.jenkins.projectmapping
                break;
            case "sonar":
                return projectmapping.sonar.projectmapping
                break;
            default:
            break;
         }
     }

     populateDropDownWithMapping(items){
        let data = this.props.data;
        let filter = this.props.filter;
        if(filter == "" || filter == undefined || filter === "NoFilter"){
            for (let i = 0; i <= data.length - 1; i++) {    
                items.push(<MenuItem eventKey={data[i].label} onSelect={this.props.onclick} id={i} key={i}>{data[i].label}</MenuItem>);                                         
            }
        }
        if(filter != "" && filter != undefined){
            let array = this.selectToolMappingData();console.log(array);
            for(let y=0;y<= array.length - 1 ; y++){
                let projectName = array[y].project;
                    if( filter === projectName){                    
                        for(let r = 0;r<=array[y].projectdetail.length -1;r++){
                            for (let i = 0; i <= data.length - 1; i++) {                                       
                            
                                    if(array[y].projectdetail[r].projectname === data[i].label){
                                        items.push(<MenuItem eventKey={data[i].label} onSelect={this.props.onclick} id={i} key={i}>{data[i].label}</MenuItem>); 
                                    }
                                }                                   
                            }
                        }
                    }
                }
        return items;
     }

     populateDropDownWithoutMapping(items){
        let data = this.props.data;
        let filter = this.props.filter;
        for (let i = 0; i <= data.length - 1; i++) {    
            let name = data[i].label.substring(0,3) ;
            //console.log("name:"+name);

            if(filter == "" || filter == undefined || filter === "NoFilter"){
                items.push(<MenuItem eventKey={data[i].label} onSelect={this.props.onclick} id={i} key={i}>{data[i].label}</MenuItem>);   
            }
            if(filter != "" && filter != undefined){
                let filterTemp = filter.substring(0,3);
                if( name === filterTemp){
                    items.push(<MenuItem eventKey={data[i].label} onSelect={this.props.onclick} id={i} key={i}>{data[i].label}</MenuItem>);   
                }        
            }
            
        }
        return items;
     }

     populateDropDown() {
        let items = [];   
        let data = this.props.data;
        let filter = this.props.filter;
        //console.log("Filter:"+filter);
        //console.log("projectmapping:"+JSON.stringify(projectmapping));
        //console.log("this.props.mappingEnable:"+this.props.mappingEnable);
        if(data != undefined){
            if(this.props.mappingEnable){
                    this.populateDropDownWithMapping(items);                
                }
                else{
                    this.populateDropDownWithoutMapping(items);    
                }
        }
        return items;
    }
   callBackMethod(title){
       this.setState({navSubTitle:title});
   }
   checkForDropDown(dropDownNotRequired){
    if(dropDownNotRequired){
        return (<td width = "25%">&nbsp;</td>); 
     }
    else{
        return ( <td width = "25%"><b>{this.props.dropdowntitle}</b>&nbsp;
                    <DropdownButton                             
                        title={this.state.navSubTitle}
                        id="1" align="right">
                    {this.populateDropDown()}
                    </DropdownButton>
                </td>);           
        }
    
   }
    dynamicContent(){
        return <div> 
                <Panel>   
                    <Panel.Body>       
                        <table width = "100%">
                                <tbody>
                                    <tr width = "100%">
                                        <td width = "15%" valign="bottom"><b><font size='4'>{this.props.title}</font></b></td>
                                        {this.checkForDropDown(this.props.dropDownNotRequired)}
                                        <td width = "25%"/>
                                        <td width = "5%"> <Image src={email}  onClick={emailClick} align = "right" title="Send Email"/>  </td>
                                        <td width = "5%"> <Image src={refresh} rounded onClick={this.props.onRefresh} align = "center" title="Refresh data"/></td>
                                        <td width = "5%"> <Image src={setting} rounded onClick={this.props.onSetting} align = "left" title="Dashboard setting"/></td>
                                    </tr>
                                </tbody>
                            </table>
                       </Panel.Body>
                    </Panel>             
                 </div>
     }
     render() {
        return (this.dynamicContent());
     }
}
export default NavigationC