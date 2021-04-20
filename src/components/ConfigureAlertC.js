import React, {Component} from 'react';
import configure from '../images/configure.png';
import {Image, Panel} from 'react-bootstrap';
import NavigationC from './NavigationC';

class ConfigureAlertC extends Component{
     
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.inputRef(this);
    }
   componentDidUpdate() {
       
    }

    dynamicContent(){
       
         return (
            
                 <table>
                     <tbody>
                        <tr>
                                
                                <td width='35%'>
                                <Image src={configure}  align = "center" title="Configure"/> 
                                </td>
                                
                            </tr>
                            <tr>
                                
                                <td width='35%'>
                               <font size="15" color = "orange">Configure Widget </font>
                                </td>
                                
                            </tr>
                    </tbody>
                </table>
               
            );
                        
        }
    render() {
        return (this.dynamicContent());
     }
}
export default ConfigureAlertC