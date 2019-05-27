import React from 'react';
import {colourStyles} from './constants';
import Select from "react-select";


export default class MyDropdown extends React.Component {


    render() {
        return (
            <Select
                closeMenuOnSelect={true}
                onChange={this.props.handleChange}
                options={this.props.items}
                styles = {colourStyles}
                />

        );
    }
}