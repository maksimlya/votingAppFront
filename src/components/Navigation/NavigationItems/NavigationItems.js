import React, { Component } from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import { Button} from "react-bootstrap";
import Routes from '../../../Routes'
import Parse from 'parse'

class NavigationItems extends Component {

    componentDidMount() {
        console.log(this.props.props)
    }

    handleLogout = async event => {
        await Parse.User.logOut();
        this.props.props.history.push("/login");

    };

    render() {
        return (

            <ul className={styles.NavigationItems}>
                <NavigationItem props={this.props.props} link="/createPoll">Create Poll</NavigationItem>
                <NavigationItem props={this.props.props} link="/viewPoll">View Poll</NavigationItem>
                <NavigationItem props={this.props.props} link="/statistics">Statistics</NavigationItem>
                <NavigationItem props={this.props.props} link="/signup">Signup</NavigationItem>
                <NavigationItem props={this.props.props} link="/login">Login</NavigationItem>
                <Button onClick={this.handleLogout} variant="outline-info">Logout</Button>
            </ul>

        );
    }

};

export default NavigationItems;