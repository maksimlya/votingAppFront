import React, { Component, Fragment } from 'react';
import {Button} from 'react-bootstrap'
import PollList from './PollsList/PollsList';
import Poll from './Poll/Poll';
import Modal from '../Modal/Modal';
import VotingAuth from '../VotingAuth/VotingAuth';
import Parse from "parse";
import { async } from 'q';
import { parse } from 'url';

class ViewPoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: [],
      pollData: [],
      balance: [],
      selectedPoll: null,
      purchasing: false,
      isAuth: false,
      showAuth: false,
      dataLoaded: false,
      tag : null,
      name: null,
      test: false
    }
  }

  componentWillMount() {
    this.myPollsHandler();
    console.log("in componentWillMount");
  }

  myPollsHandler = async () => {
    let myPolls = [];
    let balance = [];
    if (Parse.User.current())
      myPolls = await Parse.Cloud.run('getMyPolls', null, Parse.User.current());
    for(let poll of myPolls){
      let params = { pollTag: poll.tag }
      console.log(params);
      balance.push(await Parse.Cloud.run('getBalance', params, Parse.User.current()));
    }
    console.log(balance);
    console.log(myPolls);
    console.log("=======");
    this.setState({ polls: myPolls , balance: balance});
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
    this.setState({ selectedPoll: pollData, dataLoaded: true, tag: tag});
    this.purchaseHandler();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  voteHandler = (vote) => {
    this.setState({ showAuth: true, name: vote});
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
        <PollList data={this.state.polls} balance={this.state.balance} pollDetails={this.pollDetailsHandler} />
        {this.state.dataLoaded ? 
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {this.state.showAuth ? <VotingAuth props={this.props} elementtag={this.state.tag} elementoptions={this.state.name}/> : this.state.selectedPoll && <Poll pollData={this.state.selectedPoll} submitted={this.voteHandler} />}
          </Modal>
        :null }
      </Fragment>
    );
  };
}

export default ViewPoll;