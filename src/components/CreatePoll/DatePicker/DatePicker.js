import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export default class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleDayChange = this.handleDayChange.bind(this);

    }

    handleDayChange(day) {

      // this.props.handleDayChange(day);
        this.props.handleDayChange(day.toLocaleDateString('en-GB'));
    }
    render() {
        return (
            <div>
               {/*<DayPicker onDayChange={this.handleDayChange} />*/}
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={this.props.selected}
                    onChange={this.props.handleDayChange}
                />
            </div>
        );
    }
}