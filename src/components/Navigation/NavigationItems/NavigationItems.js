import React, { Component } from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import { Button, Form,Col,Row } from "react-bootstrap";
import Parse from 'parse'
import Container from "react-bootstrap/es/Container";

class NavigationItems extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.active = this.props.props.history.location.pathname
    }

    componentDidUpdate() {
        this.active = this.props.props.history.location.pathname

    }

    handleLogout = async event => {
        await Parse.User.logOut();
        this.props.props.history.push("/login");

    };

    render() {
        return (
            Parse.User.current() ?
                Parse.User.current().get('admin') ?
                    <Container>
                    <ul className={styles.NavigationItems}>
                        <NavigationItem active={this.active} props={this.props.props} link="/createPoll">Create Poll</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/viewPoll">View Poll</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/statistics">Statistics</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/mandats">Knesset Seats</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/control">Control Panel</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/createGroup">Create Group</NavigationItem>
                       <Form.Label name="label"><strong>Welcome {Parse.User.current().get('username')}</strong></Form.Label>
                        <Button onClick={this.handleLogout} variant="outline-info">Logout</Button>
                    </ul>
                    </Container>
                    :
                    <ul className={styles.NavigationItems}>
                        <NavigationItem active={this.active} props={this.props.props} link="/createPoll">Create Poll</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/viewPoll">View Poll</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/statistics">Statistics</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/mandats">Knesset Seats</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/control">Control Panel</NavigationItem>
                        <li><Form.Label name="label"><strong>Welcome {Parse.User.current().get('username')}</strong></Form.Label></li>


                        <Button onClick={this.handleLogout} variant="outline-info">Logout</Button>
                    </ul>
                :
                <ul className={styles.NavigationItems}>
                    {/* <NavigationItem active={this.active} props={this.props.props} link="/statistics">Statistics</NavigationItem>
                    <NavigationItem active={this.active} props={this.props.props} link="/mandats">Knesset Seats</NavigationItem> */}
                    <NavigationItem active={this.active} props={this.props.props} link="/login">Login</NavigationItem>
                    <NavigationItem active={this.active} props={this.props.props} link="/signup">Signup</NavigationItem>
                </ul>



        );
    }

};

export default NavigationItems;