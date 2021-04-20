import React,{Component} from 'react';
import { Modal, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import projectmapping from '../../../ProjectMapping.json';

class BuildSettingPanel extends Component{
    constructor(props){
        super(props);
        this.state={show:false,
                    url:projectmapping.jenkins.serverURL};
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveClose = this.handleSaveClose.bind(this);       
    }
    componentDidMount(){
        this.props.inputRef(this);
    }
    handleShow(){
        this.setState({show:true});
    }
    handleClose(){
        this.setState({show:false});
    }
    handleSaveClose(){
       projectmapping.serverURL = this.state.url;
       this.setState({show:false});
    }
    getValidationState() {
        const length = this.state.url.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
      }
      handleChange(e) {
        this.setState({ url: e.target.value });
      }
    render(){
        return(
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Configure Build Widget</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form>
                        <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                        >
                        <ControlLabel>Build Server URL</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.url}
                            placeholder="Enter URL"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on URL restriction.</HelpBlock>
                        </FormGroup>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.submitform}>Save & Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default BuildSettingPanel;