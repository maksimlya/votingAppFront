import React, {Component} from 'react';
import styles from './PollOptionControl.module.css';
import { Form } from 'react-bootstrap';
import TextValidator from '../../Validators/TextValidator'

class pollOptionControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }

    handleChange = (e) => {
        this.setState({value:e.target.value})
    }

    render() {
        return (
        <div className={styles.PollOptionControl}>
            <Form.Group controlId="formOptionName">
                {/* <Form.Label><strong>Option name</strong></Form.Label> */}
                <TextValidator
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.value}
                    name={"optName" + this.props.index}
                    placeholder="Enter option name"
                    validators={['required', 'minStringLength:4']}
                    errorMessages={['This field is required', 'Option Name Must Be Longer']}
                />
            </Form.Group>
            <Form.Group controlId="formOptionDesc">
                {/* <Form.Label><strong>Option Description</strong></Form.Label> */}
                <Form.Control as="textarea" name={"optDesc" + this.props.index} rows="2"
                              placeholder="Enter option description"/>
            </Form.Group>
            <div className="input-group">
                <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                    </span>
                </div>
                <div className="custom-file">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        accept="image/png, image/jpeg"
                        name={"optImg" + this.props.index}
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                        Upload image
                    </label>
                </div>
            </div>
        </div>
        );
    }
}

export default pollOptionControl;