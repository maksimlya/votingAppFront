import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import VotingLogic from './containers/VotingLogic/VotingLogic';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <VotingLogic />
        </Layout>
      </div >
    );
  }
}

export default App;
