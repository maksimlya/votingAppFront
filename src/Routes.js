import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './components/AppliedRoute/AppliedRoute';
import CreatePoll from './components/CreatePoll/CreatePoll';
import ViewPoll from './components/ViewPoll/ViewPoll';
import Statistics from './components/Statistics/Statistics';

export default ({ childProps }) =>
    <Switch>
        {/* <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} /> */}
        <AppliedRoute path="/statistics" exact component={Statistics} props={childProps} />
        <AppliedRoute path="/createPoll" exact component={CreatePoll} props={childProps} />
        {/* <AppliedRoute path="/castVote" exact component={CastVote} props={childProps} /> */}
        {/* <AppliedRoute path="/createGroup" exact component={CreateGroup} props={childProps} /> */}
        <AppliedRoute path="/viewPoll" exact component={ViewPoll} props={childProps} />
        { /* Finally, catch all unmatched routes */ }
        {/* <Route component={NotFound} /> */}
    </Switch>;