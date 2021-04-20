import React, {Component} from 'react';

class NotificationC extends Component{
     
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.inputRef(this);
        //setTimeout(function () {
        //    document.getElementById('div1').style.display='none';
        //}, 10000);
    }
   componentDidUpdate() {
       
    }
    
    dynamicContent(){
        console.log('this.props.notify:'+this.props.show);
        
        if(this.props.show != '' && this.props.show != undefined && this.props.show != null){
         return (
            <div id = {"div1"} style={{position:'fixed',top:'1em',right:'1em',display:'block',backgroundColor:'orange',height:'50px',width:'200px', opacity: '0.6',borderRadius:'15px'}}>  
                <table>
                    <tbody>
                        <tr>                   
                            <td width='35%'>
                                    <b><font size={2} color={'black'}>{this.props.show}</font></b>
                            </td>
                        </tr>
                    </tbody>            
                </table>
            </div>
            );
        }else{
            return <div></div>
        }
                        
        }
    render() {
        return (this.dynamicContent());
     }
}
export default NotificationC