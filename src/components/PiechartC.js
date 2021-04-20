import React, {Component} from 'react';
import {PieChart} from 'react-d3-components';
import d3 from 'd3';

//const scale = d3.scale.ordinal().range(['blue','pink','purple']);
var tooltipPie = function(x, y) {
    return y.toString();
    };
class PiechartC extends Component{     
    scale = d3.scale.ordinal().range(this.props.scale);
    constructor(props){
        super(props)
    }
    componentDidMount() {
        
     }
    componentDidUpdate() {
        
     }

    dynamicContent(){
        return <div>           
            <PieChart               
                data={this.props.data}                              
                width={this.props.width}
                height={this.props.height}
                margin={{top: 10, bottom: 20, left: 50, right: 60}} 
                colorScale={this.scale}  
                tooltipHtml={tooltipPie}                          
                />                
        </div>
       
     }
     render() {
        return (this.dynamicContent());
     }
}
export default PiechartC