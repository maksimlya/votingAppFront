import React from 'react';
import {colourStyles} from './constants';
import Select from "react-select";


export default class MyDropdown extends React.Component {


    render() {
                if(this.props.multi)
        return (
            <Select
                isMulti
                closeMenuOnSelect={false}
                onChange={this.props.handleChange}
                options={this.props.items}
                styles = {colourStyles}
                />

        );
                else return (
                    <Select
                        onChange={this.props.handleChange}
                        options={this.props.items}
                        styles = {colourStyles}
                    />
                )
    }
}