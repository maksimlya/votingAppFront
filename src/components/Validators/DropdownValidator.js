import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import { Form } from "react-bootstrap";
import Dropdown from '../CreatePoll/Dropdown/Dropdown';

class DropdownValidator extends ValidatorComponent {

    render() {
        const { errorMessages, validators, requiredError, validatorListener, multi, ...rest } = this.props;

        return (
            <div>
                <Dropdown
                    multi={this.props.multi}
                    {...rest}
                    ref={(r) => { this.input = r; }}
                />
                {this.errorText()}
            </div>
        );
    }

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div style={{ color: 'red' }}>
                {this.getErrorMessage()}
            </div>
        );
    }
}

export default DropdownValidator;