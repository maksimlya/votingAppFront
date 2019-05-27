import React from 'react';
import styles from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <nav className={styles.DesktopOnly}>
            <NavigationItems props={props.props} />
        </nav>
    </header>
);

export default toolbar;