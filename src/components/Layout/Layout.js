import React, { Component, Fragment } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    render() {
        console.log(this.props)
        return (
            <Fragment>
                <Toolbar props={this.props.props} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    props={this.props.props}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

export default Layout;