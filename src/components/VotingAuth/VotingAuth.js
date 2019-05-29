import React, { Component } from "react";
import Parse from "parse";
import { Button, Modal, Form, Col, FormControl, InputGroup } from "react-bootstrap";
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../Validators/TextValidator';

class VotingAuth extends Component {
    constructor(props) {
        super(props)
        this.handleChangeFormValueUsername = this.handleChangeFormValueUsername.bind(this);
        this.handleChangeFormValuePassword = this.handleChangeFormValuePassword.bind(this);
        this.handleChangeFormValueSecret = this.handleChangeFormValueSecret.bind(this);

        this.state = {
            username: '',
            userNameValid: false,
            password: '',
            country: '',
            city: '',
            secret: '',
            voteIndex: 0,
            userVoted: false,
            show: false,
            showFillForm: false,
            voted: false,
            error: {
                username: 'Enter Username.', password: 'Enter Password.', country: 'Enter Country', secret: 'Enter Secret Phase',
                city: 'Enter City'
            },
            windowSize: window.innerWidth,
            modalContents: []
        };
    }
    handleChangeFormValueUsername(event){
        this.setState({username: event.target.value });
    }

    handleChangeFormValueSecret(event) {
        this.setState({ secret: event.target.value });
    }

    handleChangeFormValuePassword(event) {
        this.setState({ password: event.target.value });
    }


    componentDidMount() {
        console.log(this.state)
    }

    validcondition() {
        if (this.state.username !== Parse.User.current().get('username'))
            return false;
        if (this.state.password.length < 1)
            return false;
        if (this.state.secret.length < 1)
            return false;
        return true;
    }


    handleSubmit = async (event) => {
        let params = {
            tag: this.props.elementtag,
            voteTarget: this.props.elementoptions.name,
            username: this.state.username,
            password: this.state.password,
            country: Parse.User.current().get('country'),
            city: Parse.User.current().get('city'),
            birthDate: Parse.User.current().get('birthDate'),
            gender: Parse.User.current().get('gender'),
            religion: Parse.User.current().get('religion'),
            secret: this.state.secret,
            pubKey: Parse.User.current().get('pubKey')
        };
<<<<<<< HEAD
        console.log(params);
        let res = Parse.Cloud.run('sendVote', params, Parse.User.current()).then(func => {
            console.log(func)
        });
        //todo history
=======


        console.log(params)
        let res = await Parse.Cloud.run('sendVote', params, Parse.User.current());
        alert(res);
>>>>>>> d88ce3af2c1f75f841ce06df6e7fbc427cad8b6b
        event.preventDefault();
        event.stopPropagation();
        this.setState({ validated: true });

        this.props.props.history.push('/statistics');
    }
    render() {
        ValidatorForm.addValidationRule('isUsernameMatch', (value) => {
            if (value !== Parse.User.current().get('username')) {
                return false;
            }
            return true;
        });
        return (
            <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                <Col sm={6}>
                    <TextValidator
                        onChange={this.handleChangeFormValueUsername}
                        name="username"
                        autoComplete="off"
                        placeholder={this.validcondition('username') ? ' ' : this.state.error.username}
                        value={this.state.username}
                        validators={['required', 'minStringLength:4', 'isUsernameMatch:' + this.state.username]}
                        errorMessages={['this field is required', 'Username Must be longer!', 'Username Does not match to current user!!']}
                    />
                </Col>
                <Col sm={6}>
                    <TextValidator
                        onChange={this.handleChangeFormValuePassword}
                        name="password"
                        type="password"
                        autoComplete="off"
                        placeholder={this.validcondition('password') ? ' ' : this.state.error.password}
                        value={this.state.password}
                        validators={['required', 'minStringLength:4']}
                        errorMessages={['this field is required', 'Password Must be longer!']}
                    />
                </Col>
                <Form.Group controlId="validateFormPassword">
                    <Col sm={6}>
                        <TextValidator
                            onChange={this.handleChangeFormValueSecret}
                            name="secret"
                            autoComplete="off"
                            placeholder={this.validcondition('secret') ? ' ' : this.state.error.secret}
                            value={this.state.secret}
                            validators={['required', 'minStringLength:4']}
                            errorMessages={['this field is required', 'Password Must be longer!']}
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="validateFormSecret">
                    <Col sm={12}>
                        <Button variant='success' type='submit'>Submit</Button>
                    </Col>
                </Form.Group>
            </ValidatorForm>
        );
    }
}

export default VotingAuth;

