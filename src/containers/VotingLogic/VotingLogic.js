import React, { Component, Fragment } from 'react';
import Parse from 'parse';
import { withRouter } from "react-router-dom";
import Routes from '../../Routes'

Parse.serverURL = 'http://milky.ddns.net:8000/parse';
Parse.initialize("POLLS", "BLOCKCHAIN");

class VotingLogic extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    }

    async componentDidMount() {
        try {
            await Parse.Session.current();
            this.userHasAuthenticated({ isAuthenticated: true, user: Parse.User.current() });

        }
        catch (e) {
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
        for (let opt of updatedPoll.pollOpt) {
            if (opt.optName.length > 0) {
                let parseFile = new Parse.File(opt.optName + '.jpg', opt.optImg);
                let f = await parseFile.save();
                let pollOpt = { name: opt.optName, description: opt.optDesc, img: f };
                choices.push(pollOpt);
            }
        }
        let params = {
            name: updatedPoll.pollName,
            choices: choices,
            tag: updatedPoll.pollTag,
            desc: updatedPoll.pollDescription,
            group: updatedPoll.groups
        }

        alert(await Parse.Cloud.run('createPoll', params, this.state.user));
        this.props.history.push('/viewPoll');
    }

    setGroup = (group) => {
        this.setState({ groups: group });
    }

    userHasAuthenticated = params => {
        this.setState({
            isAuthenticated: params.isAuthenticated,
            user: params.user
        });
    };

    handleLogout = async event => {
        await Parse.User.logOut();
        this.userHasAuthenticated({ isAuthenticated: false, user: null });
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