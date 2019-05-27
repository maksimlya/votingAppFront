import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../LoaderButton/LoaderButton";
import styles from "./Login.module.css";
import Parse from 'parse'

// Parse.serverURL = 'http://localhost:1337/parse';
//
// Parse.initialize("POLLS", "BLOCKCHAIN")

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Parse.User.logIn(this.state.username, this.state.password);
            this.props.userHasAuthenticated({ isAuthenticated: true, user: Parse.User.current() }); // lets app know that the user has logged in
            this.props.history.push("/statistics");
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }



    render() {
        return (
            <div className={styles.Login}>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" >
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <LoaderButton
                        block

                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Login"
                        loadingText="Logging in…"
                    />
                </form>
            </div>
        );
    }
}