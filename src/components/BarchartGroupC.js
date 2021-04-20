import React, {Component} from 'react';
import {BarChart} from 'react-d3-components';
import d3 from 'd3';
import LegendC from './LegendC';

const scale = d3.scale.ordinal().range(['green','red']);
var tooltip = function(x, y0, y, total) {
    return y.toString();
    };
class BarchartGroupC extends Component{
     
    constructor(props){
        super(props)
    }
    componentDidMount() {
        
     }
    componentDidUpdate() {
        
     }

    dynamicContent(){
        
        if(this.props.data != null && this.props.data != undefined && this.props.data.length != 0){
        return <div>
            
            <BarChart
                groupedBars
                data={this.props.data}
                colorByLabel={false}
                colorScale={scale}
                width={this.props.width}
                height={200}
                margin={{top: 10, bottom: 20, left: 28, right: 10}}
                tooltipHtml={tooltip}
                />
                <LegendC isBuild = {this.props.isBuild} isFeature = {this.props.isFeature}/>
        </div>
        }else{
            return <div>No data found</div>
        }
     }
     render() {
        return (this.dynamicContent());
     }
}
export default BarchartGroupC