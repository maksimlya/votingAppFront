import React, { Component, Fragment } from 'react';
import {Button} from 'react-bootstrap'
import PollList from './PollsList/PollsList';
import Poll from './Poll/Poll';
import Modal from '../Modal/Modal';
import VotingAuth from '../VotingAuth/VotingAuth';
import Parse from "parse";
import { async } from 'q';

class ViewPoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: [],
      pollData: [],
      selectedPoll: null,
      purchasing: false,
      isAuth: false,
      showAuth: false,
      dataLoaded: false,
      test: false
    }
  }

  componentWillMount() {
    this.myPollsHandler();
    console.log("in componentWillMount");
  }

  myPollsHandler = async () => {
    let myPolls = []
    if (Parse.User.current())
      myPolls = await Parse.Cloud.run('getMyPolls', null, Parse.User.current());
    console.log(myPolls);
    console.log("=======");
    this.setState({ polls: myPolls });
  }

  pollDetailsHandler = async (tag) => {
    let params = { pollTag: tag }
    let polls = await Parse.Cloud.run('getAllResults', null, Parse.User.current());
    console.log(polls);
    let singlepoll;
    for (let el of polls) {
      if (el.tag === tag) {
        singlepoll = el;
      }
    }
    console.log(singlepoll);
    console.log("=======");
    let desc = Parse.Object.extend('ChoiceDescriptions');
    let query = new Parse.Query(desc);
    let opts = []
    if(singlepoll)
    for (let choice of singlepoll.choices) {
      query.equalTo('choice', choice);
      let res = await query.find();

      let img = res[0].get('image');
      opts.push({name: choice, link: img.url(), description: res[0].get('description')});
    }

    let pollData = {poll: singlepoll, opts: opts}

    this.setState({ selectedPoll: pollData });
    this.purchaseHandler();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  showAuthHandler = () => {
    this.setState({ showAuth: true });
  }

  voteHandler = (vote) => {
    //this.purchaseCancelHandler();
    this.showAuthHandler();
    console.log(this.state);
    console.log(vote);
    console.log("========");
  }

  handleClick = () => {
    console.log(this.state.test)
    this.setState({test: true})
}



  render() {
    return (
      <Fragment>
        <PollList data={this.state.polls} pollDetails={this.pollDetailsHandler} />
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {this.state.showAuth ? <VotingAuth /> : this.state.selectedPoll && <Poll pollData={this.state.selectedPoll} submitted={this.voteHandler} />}
          </Modal>
      </Fragment>
    );
  };

}

export default ViewPoll;