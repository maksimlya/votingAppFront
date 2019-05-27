import React, { Component } from 'react';
import styles from './CreatePoll.module.css';
import PollOptionControl from './PollOptionControl/PollOptionControl';
import { Form, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import Parse from 'parse';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../Validators/TextValidator'
import DropdownValidator from '../Validators/DropdownValidator'


class CreatePoll extends Component {
    state = {
        group: '',
        grps: [],
        colors: [
            '#00B8D9', '#0052CC', '#5243AA', '#FF5630', '#FF8B00', '#FFC400', '#36B37E', '#00875A', '#253858', '#666666'
        ],
        poll: {
            pollName: "",
            pollTag: "",
            groups: "",
            pollDescription: "",
            pollOpt: [{
                optName: "",
                optDesc: "",
                optImg: null
            }]
        },
        errors: {
            pollName: "",
            pollTag: "",
            groups: "",
            pollDescription: "",
            pollOpt: [{
                optName: "",
                optDesc: "",
                optImg: null
            }]
        },
        pollName: "",
        pollTag: "",
        groups: "",
        pollDescription: ""
    }

    async componentDidMount() {
        let groups = await Parse.Cloud.run('getGroups');
        let optionss = [];
        groups.map((val, idx) => {
            let option = { value: val, label: val, color: this.state.colors[Math.floor(Math.random() * 10)] }
            optionss.push(option);
            return optionss;
        });
        this.setState({ grps: optionss });


    }

    handleGroupChange = (selectedOption) => {
        this.props.selectGroups(selectedOption.value);
        this.setState({ group: selectedOption.value });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleFormValidation = (event) => {
        // const updatedPoll = {
        //     ...this.state.poll
        // };
        // const errors = this.state.errors;
        // if(event.target.name === pollName){}
        // if(event.target.name === pollTag){}
        // if(event.target.name === formPollDesc){}
        // console.log(event.target.value.length);
        // if (event.target.value.length > 5) {
        //     console.log(event.target.isInvalid);
        //     event.target.isInvalid = true;
        //     console.log(event.target.isInvalid);
        //     console.log("not good");
        //     this.setState({errors: {...errors, name: "Password must be at least 6 characters"} });
        // }
        // updatedPoll['pollName'] = event.target.elements.pollName.value;
        // updatedPoll['pollTag'] = event.target.elements.pollTag.value;
        // updatedPoll['groups'] = this.state.groups;
        // updatedPoll['pollDescription'] = event.target.elements.pollDescription.value;
        // for (let i = 0; i < this.state.numberOfOptions; i++) {
        //     updatedPoll['pollOpt'].splice(i, this.state.numberOfOptions, { optName: event.target.elements["optName" + (i + 1)].value, optDesc: event.target.elements["optDesc" + (i + 1)].value, optImg: event.target.elements["optImg" + (i + 1)].files[0] });
        // }
        // this.setState({ poll: updatedPoll });
    }

    render() {

        let options = [];
        for (let i = 0; i < this.props.numOfOpt; i++) {
            options.splice(i, this.props.numOfOpt, <PollOptionControl key={i} index={i + 1} />);
            //options.push(<PollOptionControl index={i+1}/>);
        }


        return (

            <div className={styles.CreatePoll}>
                <ValidatorForm
                    ref="form"
                    onSubmit={e => {this.props.submitted(e)}}
                >
                    <Form.Group controlId="formPollName">
                        <Form.Label><strong>Poll Name</strong></Form.Label>
                        <TextValidator
                            onChange={this.handleChange}
                            name="pollName"
                            placeholder="Enter poll name"
                            value={this.state.pollName}
                            validators={['required', 'minStringLength:4']}
                            errorMessages={['This field is required', 'Poll Name Must Be Longer']}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPollTag">
                        <Form.Label><strong>Poll Tag</strong></Form.Label>
                    <TextValidator
                        onChange={this.handleChange}
                        name="pollTag"
                        placeholder="Enter poll tag"
                        value={this.state.pollTag}
                        validators={['required', 'minStringLength:2']}
                        errorMessages={['This field is required', 'Poll Tag Must Be Longer']}
                    />
                    </Form.Group>
                        <Form.Group controlId="formGroups">
                            <Form.Label><strong>Group</strong></Form.Label>
                            <DropdownValidator
                                name="drop"
                                value={this.state.group}
                                validators={['required']}
                                errorMessages={['Please Choose the poll group']}
                                items={this.state.grps}
                                handleChange={this.handleGroupChange}
                            />
                        </Form.Group>
                    <Form.Group controlId="formPollDesc">
                        <Form.Label><strong>Poll Description</strong></Form.Label>
                        <TextValidator
                            onChange={this.handleChange}
                            name="pollDescription"
                            placeholder="Enter poll summary description"
                            as="textarea"
                            rows="3"
                            value={this.state.pollDescription}
                            validators={['required', 'minStringLength:10']}
                            errorMessages={['This field is required', 'Poll Description Must Be Longer']}
                        />
                    </Form.Group>
                    <label><strong>Please start adding options for the poll</strong></label>
                    <ButtonToolbar>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="success" onClick={this.props.addOption}>+</Button>
                            <Button variant="danger" onClick={this.props.removeOption}>-</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    {options}
                    <Button variant="primary" type="submit">Submit</Button>
                </ValidatorForm>
                        </div>
        );
    }
};

export default CreatePoll;