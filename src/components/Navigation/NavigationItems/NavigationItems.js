import React, { Component } from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import Routes from '../../../Routes'

class NavigationItems extends Component {
    render() {
        return (
            <ul className={styles.NavigationItems}>
                <NavigationItem link="/createPoll">Create Poll</NavigationItem>
                <NavigationItem link="/viewPoll">View Poll</NavigationItem>
                <NavigationItem link="/statistics">Statistics</NavigationItem>
            </ul>
        );
    }

};

export default NavigationItems;