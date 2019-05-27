import React, { Component, Fragment } from 'react';
import PollList from './PollsList/PollsList';
import Parse from "parse";



class viewPoll extends Component {
  constructor(props){
    super(props)
    this.state = {
      polls: []
    }
  }

  componentWillMount(){
    this.myPollsHandler();
  }


  myPollsHandler = async () => {
    let myPolls =[]

    if(Parse.User.current())
    myPolls = await Parse.Cloud.run('getMyPolls', null, Parse.User.current());
    this.setState({polls: myPolls});

  }

  render() {
    return (
    <Fragment>
      <PollList data={this.state.polls}/>
    </Fragment>
    );
  };

}

export default viewPoll;