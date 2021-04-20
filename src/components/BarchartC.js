import React, {Component} from 'react';
import {BarChart} from 'react-d3-components';
import d3 from 'd3';

const scale = d3.scale.ordinal().range(['green','red']);
var tooltip = function(x, y0, y, total) {
    return y.toString();
    };
class BarchartC extends Component{
     data = [{
        label: '',
        values: [{x: 'Released', y: 8}, {x: 'Staged', y: 4}]
    }]
    constructor(props){
        super(props)
    }
    componentDidMount() {
        
     }
    componentDidUpdate() {
        
     }

    dynamicContent(){
        return <div>           
            <BarChart               
                data={this.data}
                colorByLabel={false}  
                colorScale={scale}              
                width={300}
                height={100}
                margin={{top: 10, bottom: 20, left: 16, right: 10}}
                tooltipHtml={tooltip}/>                
        </div>
     }
     render() {
        return (this.dynamicContent());
     }
}
export default BarchartC