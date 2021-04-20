import React, {Component} from 'react';
import {LineChart} from 'react-d3-components';
import d3 from 'd3';

const scale = d3.scale.ordinal().range(['red','green']);
var tooltipLine = function(label, data) {//alert('golasso:'+label+":"+data.y);
    return (" x: " + data.x + " y: " + data.y);
    }
class LinechartC extends Component{
    
    xScale= d3.time.scale().domain(this.props.dataRange).range([0, 400 - 70])
    constructor(props){
        super(props)
    }
    componentDidMount() {
        
     }
    componentDidUpdate() {
        
     }

    dynamicContent(){
        //console.log('length:'+JSON.stringify(this.props.data))
        if(this.props.data != null && this.props.data != undefined && this.props.data.values != undefined){
        return <div>           
            <LineChart               
                data={this.props.data}                              
                width={300}
                height={200}
                margin={{top: 10, bottom: 20, left: 28, right: 20}}
                xScale={this.xScale}
                xAxis={{tickValues: this.xScale.ticks(d3.time.day, 2), tickFormat: d3.time.format("%m/%d")}}
                tooltipHtml={tooltipLine}
                />                
        </div>
        }else{
            return <div>No data found</div>
        }
     }
     render() {
        return (this.dynamicContent());
     }
}
export default LinechartC