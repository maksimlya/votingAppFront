import React, { Component, Fragment } from 'react';
import CreatePoll from '../../components/CreatePoll/CreatePoll';
import ViewPoll from '../../components/ViewPoll/ViewPoll';
import Statistics from '../../components/Statistics/Statistics';
import Parse from 'parse';
import { Link, withRouter } from "react-router-dom";
import SignUp from '../../components/SignUp/Signup';
import Login from '../../components/Login/Login';
import Routes from '../../Routes'
import { async } from 'q';

Parse.serverURL = 'http://milky.ddns.net:8000/parse';
Parse.initialize("POLLS", "BLOCKCHAIN");


class VotingLogic extends Component {
    state = {
        isAuthorized: false,
        isAuthenticated: false,
        isAuthenticating: true,
        user: null,
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
        this.myPollsHandler();
    }

    async componentDidMount() {
        try {
            await Parse.Session.current();
            this.userHasAuthenticated({isAuthenticated: true, user: Parse.User.current()});

        }
        catch(e) {
            if (e !== 'No current user') {
                console.log(e);
            }
        }

        this.setState({ isAuthenticating: false });


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
        let myPolls =[]
        console.log(Parse.User.current().get('username'))

        myPolls = await Parse.Cloud.run('getMyPolls', null, Parse.User.current());
        this.setState({polls: myPolls});
        console.log(this.state.polls);
        console.log(myPolls);
    }

    userHasAuthenticated = params => {
        this.setState({ isAuthenticated: params.isAuthenticated,
            user: params.user
        });
    };

    handleLogout = async event => {
        await Parse.User.logOut();
        this.userHasAuthenticated({isAuthenticated: false, user: null});
        this.props.history.push("/login");

    };


    render() {
        const childProps = {
            parse: Parse,
            isAuthenticated: this.state.isAuthenticated,
            user: this.state.user,
            userHasAuthenticated: this.userHasAuthenticated,
            numOfOpt: this.state.numberOfOptions,
            addOption: this.addOptionHandler,
            removeOption: this.removeOptionHandler,
            submitted: this.createPollHandler,
            selectGroups: this.setGroup,
            poll: this.state.polls,
            getProps: this.props.getProps

        };

        return (
            <Fragment>
                <Routes childProps={childProps} />
            </Fragment>
        );
    }
};

export default withRouter(VotingLogic);