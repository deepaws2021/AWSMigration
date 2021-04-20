import React, {Component} from 'react';

class TableC extends Component{
     
    constructor(props){
        super(props)
    }
    componentDidMount() {
        
    }
   componentDidUpdate() {
       
    }

    dynamicContent(){
       
         return (
            <tr>
                
                <td width='35%'>
                        {this.props.servername}
                </td>
                <td width='35%'>
                        {this.props.serverurl}
                </td>
                <td width='35%'>
                        {this.props.status}
                </td>
            </tr>);
                        
        }
    render() {
        return (this.dynamicContent());
     }
}
export default TableC