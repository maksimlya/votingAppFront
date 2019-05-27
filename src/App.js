import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import VotingLogic from './containers/VotingLogic/VotingLogic';
import { withRouter } from "react-router-dom";

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            prop: null
        }
    }


  render() {
    return (
      <div>
        <Layout props={this.props}>
          <VotingLogic props={this.props} />
        </Layout>
      </div >
    );
  }
}

export default withRouter(App);
