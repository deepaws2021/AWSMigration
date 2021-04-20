import React, {Component} from 'react';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';

class GridC extends Component{
     
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
                    <BootstrapTable data={ this.props.data } options={ this.props.options } width='100' height='255' bordered={false} striped hover condensed>
                        <TableHeaderColumn dataField='status' dataSort dataFormat={ this.props.nameFormatter }>Status</TableHeaderColumn>
                        <TableHeaderColumn dataField='id' isKey dataSort>Build#</TableHeaderColumn>
                        <TableHeaderColumn dataField='age' dataSort>Age</TableHeaderColumn>
                    </BootstrapTable>
                </div>
       }else if(this.props.isFeature){
        return <div>
                    <BootstrapTable data={ this.props.data } options={ this.props.options } width='5' height='185' bordered={false} striped hover condensed>
                        <TableHeaderColumn dataField='feature' dataFormat={ this.props.nameFormatter }>Feature in progress</TableHeaderColumn>
                        <TableHeaderColumn dataField='point' isKey dataSort>Point</TableHeaderColumn>
                    </BootstrapTable>
                </div>
       }else if(this.props.isDeploy){
        return <div>
                    <BootstrapTable data={ this.props.data } options={ this.props.options } width='5' height='185' bordered={false} striped hover condensed>
                        <TableHeaderColumn dataField='last' dataFormat={ this.props.nameFormatter }>Last</TableHeaderColumn>
                        <TableHeaderColumn dataField='env' isKey dataSort>Env</TableHeaderColumn>
                        <TableHeaderColumn dataField='age' dataSort>Age</TableHeaderColumn>
                        <TableHeaderColumn dataField='success'  >Success</TableHeaderColumn>
                        <TableHeaderColumn dataField='failure'  >Failure</TableHeaderColumn>
                    </BootstrapTable>
                </div>
       }else if(this.props.isRelease){
        return <div>
                    <BootstrapTable data={ this.props.data } options={ this.props.options } width='5' height='100' bordered={false} striped hover condensed>
                        <TableHeaderColumn dataField='build'  isKey>Build</TableHeaderColumn>
                        <TableHeaderColumn dataField='status' dataFormat={ this.props.nameFormatter } dataSort>Status</TableHeaderColumn>
                        <TableHeaderColumn dataField='releaseTime' dataSort>Release Time</TableHeaderColumn>
                    </BootstrapTable>
                </div>
       }else if(this.props.isStatus){
        return <div>
                    <BootstrapTable data={ this.props.data } width='5' height='85' bordered={false} striped hover condensed>
                        <TableHeaderColumn dataField='servername'  isKey>Server Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='serverurl' >Server URL</TableHeaderColumn>
                        <TableHeaderColumn dataField='status' dataFormat={ this.props.nameFormatter } dataSort>Status</TableHeaderColumn>
                    </BootstrapTable>
                </div>
       }
       
    }
     render() {
        return (this.dynamicContent());
     }
}
export default GridC