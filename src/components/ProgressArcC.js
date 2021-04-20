import React, { Component } from 'react';
import * as d3 from "d3";
class ProgressArc extends Component {

constructor(props){
    super(props)
}

componentDidMount() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
      }
setContext() {
        return d3.select(this.refs.arc).append('svg')
          .attr('height', '150px')
          .attr('width', '150px')
          .attr('id', 'd3-arc')
          .append('g')
          .attr('transform', `translate(80, 80)`);
      }
setBackground(context) {
return context.append('path')
    .datum({ endAngle: this.tau })
    .style('fill', '#e6e6e6')
    .attr('d', this.arc());
}
setForeground(context) {
    return context.append('path')
      .datum({ endAngle: this.tau * this.props.completePercentage/100 })
      .style('fill', '#00ff00')
      .attr('d', this.arc());
  }
tau = Math.PI * 2;
arc() {
return d3.svg.arc()
    .innerRadius(50)
    .outerRadius(60)
    .startAngle(0)
}
render() {
    return (
        <table width="100%">
            <tbody>
                <tr>
                    <td width="30%" align="right">
                        <b><font size="15">{this.props.completePercentage}</font>%</b>
                    </td>
                    <td width="70%" align="left">
                        <div ref="arc"></div>
                    </td>
                </tr>
                <tr>
                    <td width="1%">                      
                    </td>
                    <td width="99%" align="left">
                      <b> {this.props.loc} lines of code</b>
                    </td>
                </tr>
            </tbody>
        </table>
    )
  }
}
export default ProgressArc;