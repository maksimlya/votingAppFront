import React, { Component } from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import Routes from '../../../Routes'

class NavigationItems extends Component {

    componentDidMount() {
        console.log(this.props.props)
    }


    render() {
        return (
            <ul className={styles.NavigationItems}>
                <NavigationItem props={this.props.props} link="/createPoll">Create Poll</NavigationItem>
                <NavigationItem props={this.props.props} link="/viewPoll">View Poll</NavigationItem>
                <NavigationItem props={this.props.props} link="/statistics">Statistics</NavigationItem>
                <NavigationItem props={this.props.props} link="/signup">Signup</NavigationItem>
                <NavigationItem props={this.props.props} link="/login">Login</NavigationItem>
            </ul>
        );
    }

};

export default NavigationItems;