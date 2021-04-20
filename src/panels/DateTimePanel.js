import React, {Component} from 'react';
import {Grid,Row,Col} from 'react-bootstrap';

class DateTimePanel extends Component{
    
    constructor(props){
        super(props)
    }
    componentDidMount() {
        
     }
    componentDidUpdate() {
        
     }
    
    populateTableLabel(){
        let items = [];   
        let data = this.props.label
        for (let i = 0; i <= data.length - 1; i++) {           
            items.push( <td key={i}><u><b><p><font size='2' width="30%">{data[i].label}</font></p></b></u></td>) ;          
         }
        return items;
        
    }
    populateTableValue(){
        let items = [];   
        let data = this.props.label
        for (let i = 0; i <= data.length - 1; i++) {
            if(data[i].label == 'WIP'){
                items.push( <td key={i}><p><font size='6' color='orange' width="30%">{data[i].value}</font></p></td>) ;   
            }else if(data[i].label == 'DONE'){
                items.push( <td key={i}><p><font size='6' color='green' width="30%">{data[i].value}</font></p></td>) ;   
            }
            else{
                items.push( <td key={i}><p><font size='6' color='blue' width="30%">{data[i].value}</font></p></td>) ;  
            } 
         }
        return items;
        
    }

    dynamicContent(){
        if(this.props.isTimeRequired){
        return <div>  
            <table width ="100%">
                <tbody>
                    <tr>
                        {this.populateTableLabel()}
                    </tr>
                    <tr>
                        {this.populateTableValue()}
                    </tr>    
                </tbody>
            </table>  
            <table width="100%">
                <tbody>
                        <tr>
                            <td width="100%">
                            <u><b><p><font size='2' color='green'>AVERAGE BUILD TIME</font></p></b></u>
                            </td>
                        </tr>
                        <tr>
                            <td width="100%">
                            <p><font size='6' >{this.props.time}</font></p>
                            </td>
                        </tr>
                        <tr>
                            <td width="100%">
                            <b><p><font size='1' >hh:mm:ss</font></p></b>
                            </td>
                        </tr>
                </tbody>
            </table>                          
        </div>
        }else if(this.props.isOnlyTimeRequired){
            return <div>
                  <table width="100%">
                    <tbody>
                            <tr>
                                <td width="100%">
                                <u><b><p><font size='2' color='green'>{this.props.tileLabel}</font></p></b></u>
                                </td>
                            </tr>
                            <tr>
                                <td width="100%">
                                <p><font size='6' >00:04:30</font></p>
                                </td>
                            </tr>
                            <tr>
                                <td width="100%">
                                <b><p><font size='1' >hh:mm:ss</font></p></b>
                                </td>
                            </tr>
                    </tbody>
                </table>   
            </div>
        }
        else{
         return   <div>  
            <table width ="100%">
                <tbody>
                    <tr>
                        {this.populateTableLabel()}
                    </tr>
                    <tr>
                        {this.populateTableValue()}
                    </tr>    
                </tbody>
            </table>
            </div>
        }
     }
     render() {
        return (this.dynamicContent());
     }
}
export default DateTimePanel