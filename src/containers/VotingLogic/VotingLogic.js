import React, { Component, Fragment } from 'react';
import CreatePoll from '../../components/CreatePoll/CreatePoll';
import ViewPoll from '../../components/ViewPoll/ViewPoll';
import Statistics from '../../components/Statistics/Statistics';
import Parse from 'parse';
import SignUp from '../../components/SignUp/Signup';
import Login from '../../components/Login/Login';
import { async } from 'q';

Parse.serverURL = 'http://milky.ddns.net:8000/parse';
Parse.initialize("POLLS", "BLOCKCHAIN");


class VotingLogic extends Component {
    state = {
        isAuthorized: false,
        user: undefined,
        poll: {
            pollName: "",
            pollTag: "",
            groups: "",
            pollDescription: "",
            pollOpt: [{
                optName: "",
                optDesc: "",
                optImg: null
            }]
        },
        numberOfOptions: 0,
        polls: []
    };

    componentDidUpdate() {
        console.log('[componentDidUpdate]');
    }

    async componentWillMount(){
        let usr = await Parse.User.logIn("Maks", "q1w2");
        console.log("stam");
        this.myPollsHandler();
    }

    componentDidMount() {
        (async () => {
            await Parse.User.logOut();
            let usr = await Parse.User.logIn("Maks3", "q1w2");
            this.setState({ isAuthorized: true, user: usr });
        })();
    }

    addOptionHandler = () => {
        let numOfOpt = this.state.numberOfOptions;
        numOfOpt = numOfOpt + 1;
        this.setState({ numberOfOptions: numOfOpt });
    }

    removeOptionHandler = () => {
        let numOfOpt = this.state.numberOfOptions;
        if (numOfOpt <= 0) {
            return;
        }
        numOfOpt = numOfOpt - 1;
        this.setState({ numberOfOptions: numOfOpt });
    }

    createPollHandler = async (event) => {
        event.preventDefault();
        const updatedPoll = {
            ...this.state.poll
        };
        updatedPoll['pollName'] = event.target.elements.pollName.value;
        updatedPoll['pollTag'] = event.target.elements.pollTag.value;
        updatedPoll['groups'] = this.state.groups;
        updatedPoll['pollDescription'] = event.target.elements.pollDescription.value;
        for (let i = 0; i < this.state.numberOfOptions; i++) {
            updatedPoll['pollOpt'].splice(i, this.state.numberOfOptions, { optName: event.target.elements["optName" + (i + 1)].value, optDesc: event.target.elements["optDesc" + (i + 1)].value, optImg: event.target.elements["optImg" + (i + 1)].files[0] });
        }
        this.setState({ poll: updatedPoll });

        let choices = [];
        for (let name of updatedPoll.pollOpt) {
            choices.push(name.optName);
        }
        let params = {
            name: updatedPoll.pollName,
            choices: choices,
            tag: updatedPoll.pollTag,
            desc: updatedPoll.pollDescription,
            group: updatedPoll.groups
        }
        console.log(params);
        console.log(this.state.user);
        alert(await Parse.Cloud.run('createPoll', params, this.state.user));
        // console.log('[VotingLogic] in createpollhandler');
    }

    setGroup = (group) => {
        this.setState({ groups: group });
    }

    myPollsHandler = async () => {
        const myPolls = await Parse.Cloud.run('getMyPolls', null, Parse.User.current());
        this.setState({polls: myPolls});
        console.log(this.state.polls);
        console.log(myPolls);
    }

    render() {
        return (
            <Fragment>
                <CreatePoll
                    numOfOpt={this.state.numberOfOptions}
                    addOption={this.addOptionHandler}
                    removeOption={this.removeOptionHandler}
                    submitted={this.createPollHandler}
                    selectGroups={this.setGroup} />
                <ViewPoll poll={this.state.polls} />
                <Statistics />
                <SignUp />
                <Login />
            </Fragment>
        );
    }
};

export default VotingLogic;