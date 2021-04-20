import React, {Component} from 'react';
import {Grid,Row,Col, Panel} from 'react-bootstrap';

class LegendC extends Component{
    constructor(props){
        super(props)
        
    }
    componentDidMount() {
        
    }
   componentDidUpdate() {
       
    }

   dynamicContent(){
       if(this.props.isBuild){
        return <div>
                    <table width ="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <b><font color='red' size='1'>FAILURE</font></b>   <b><font color='green' size='1'>SUCCESS</font></b>
                                </td>
                            </tr>
                        </tbody>
                    </table>           
                </div>
       }else if(this.props.isFeature){
        return <div>
                    <table width ="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <b><font color='red' size='1'>INCOMPLETE</font></b>   <b><font color='green' size='1'>COMPLETE</font></b>
                                </td>
                            </tr>
                        </tbody>
                    </table>           
                </div>
       }else{
        return <div>
                    <table width ="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <b><font color='red' size='1'></font></b>   <b><font color='green' size='1'></font></b>
                                </td>
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
export default LegendC