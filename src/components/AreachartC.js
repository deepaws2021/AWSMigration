import React, {Component} from 'react';
import {LineChart, AreaChart} from 'react-d3-components';
import d3 from 'd3';

const scale = d3.scale.ordinal().range(['orange']);

class AreachartC extends Component{
    
    xScale= d3.time.scale().domain(this.props.dataRange).range([0, 400 - 70])
    constructor(props){
        super(props)
    }
    componentDidMount() {
        
     }
    componentDidUpdate() {
        
     }

    dynamicContent(){
        return <div>           
            <AreaChart               
                data={this.props.data}                              
                width={this.props.width}
                height={200}
                margin={{top: 10, bottom: 20, left: 28, right: 20}}
                xScale={this.xScale}
                xAxis={{tickValues: this.xScale.ticks(d3.time.day, 2), tickFormat: d3.time.format("%m/%d")}} 
                colorScale={scale}               
                />                
        </div>
       
     }
     render() {
        return (this.dynamicContent());
     }
}
export default AreachartC