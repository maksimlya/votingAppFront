import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../LoaderButton/LoaderButton";
import style from "../Login/Login.module.css";
import Parse from 'parse'


export default class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            groupName: ''
        };
    }

    validateForm() {
        if (this.state.groupName.length < 3)
            return false;
        return true;
    }


    handleSubmit = async event => {
        event.preventDefault();

        let groups = Parse.Object.extend('Groups');
        let query = new Parse.Query(groups);
        query.equalTo('name',this.state.groupName)
        let res  = await query.find();
        if (res.length > 0)
            alert('Group already exists!')
        else {
            let group = new groups();
            group.set('name',this.state.groupName);
            group.save();
            alert('Group Created Successfully.');
        }


    };
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {
        return (
            <div className={style.Login}>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="groupName" >
                        <FormLabel>Group Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.groupName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <LoaderButton
                        block

                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create Group"
                        loadingText="Creating Group.…"
                    />
                </form>
            </div>
        );
    }
}