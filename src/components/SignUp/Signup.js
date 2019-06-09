import React, { Component } from "react";
import { Form, FormLabel } from "react-bootstrap";
import LoaderButton from "../LoaderButton/LoaderButton";
import styles from "./Signup.module.css";
import Parse from "parse";
import DatePicker from "../CreatePoll/DatePicker/DatePicker";
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../Validators/TextValidator'
import DropdownValidator from '../Validators/DropdownValidator'
import { statement } from "@babel/template";


const religions = ['Jewish', "Christian", "Muslim", "Other"];
const countries = ['Israel', "Russia", "USA", "Ukraine"];
const cities = ['Haifa', "Tel Aviv", "Netanya", "Hadera"];
const groups = ['citizen', "afeka", "nokia", "microsoft"];
const genders = ['Male', 'Female'];

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            isLoading: false,
            username: "",
            password: "",
            confirmPassword: "",
            city: "",
            birthDate: new Date().toLocaleDateString('en-GB'),
            gender: "",
            country: "",
            religion: "",
            secret: "",
            groups: [],
            newUser: null,
            selectedDay: undefined,
            selectedOption: [],

            date: new Date(),
            genders: [],
            religions: [],
            colourOptions: [],
            countries: [],
            cities: [],
            colors: [
                '#00B8D9', '#0052CC', '#5243AA', '#FF5630', '#FF8B00', '#FFC400', '#36B37E', '#00875A', '#253858', '#666666'
            ]
        };
    }

    componentWillMount(){

    }
    componentDidMount() {
        this.fillOptions();

    }

    async fillOptions() {
        let options = [];
        let countryNames = [];
        let cityNames = [];
        let rels = [];
        let gens = [];
        let cunt = [];

        // let grps = await Parse.Cloud.run('getGroups');
        groups.map((val, idx) => {
            let option = { value: val, label: val, color: this.state.colors[Math.floor(Math.random() * 10)] }
            options.push(option);
            return options;
        });
        //let countries = await Parse.Cloud.run('getCountries');
        /*countries.map((val, idx) => {
            let option = { value: val, label: val, color: this.state.colors[Math.floor(Math.random() * 10)] }
            countryNames.push(option);
            return countryNames;
        });*/

        fetch('https://restcountries.eu/rest/v2/all').then(response => response.json()).then((jsonData) => {
            jsonData.map( el => {
                cunt.push(el.name);
            })
        });
        console.log(cunt);

        //let cities = await Parse.Cloud.run('getCities');
        cities.map((val, idx) => {
            let option = { value: val, label: val, color: this.state.colors[Math.floor(Math.random() * 10)] }
            cityNames.push(option);
            return cityNames;
        });

        religions.map((val, idx) => {
            let option = { value: val, label: val, color: this.state.colors[Math.floor(Math.random() * 10)] }
            rels.push(option);
            return rels;
        });
        genders.map((val, idx) => {
            let option = { value: val, label: val, color: this.state.colors[Math.floor(Math.random() * 10)] }
            gens.push(option);
            return gens;
        });
        this.setState({ colourOptions: options, countries: cunt, cities: cityNames, religions: rels, genders: gens })
    }

    validateForm() {
        return (
            this.state.username.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword &&
            this.state.city.length > 0 &&
            this.state.secret.length > 0
        );
    }



    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleGroupChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    handleDayChange(day) {
        this.setState({ date: day, birthDate: day.toLocaleDateString('en-GB') });
    }

    // handleSubmit = async event => {
    //     event.preventDefault();
    //
    //     this.setState({ isLoading: true });
    //
    //     this.setState({ newUser: "test" });
    //
    //     this.setState({ isLoading: false });
    // }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        let groups = [];
        for (let i of this.state.selectedOption) {
            groups.push(i.value);
        }
        try {
            const params = {
                username: this.state.username,
                password: this.state.password,
                country: this.state.country,
                city: this.state.city,
                birthDate: this.state.birthDate,
                gender: this.state.gender,
                religion: this.state.religion,
                groups: groups,
                secret: this.state.secret
            };
            let newUser = await Parse.Cloud.run('createUser', params);
            this.setState({
                newUser
            });
        } catch (e) {
            alert(e.message);
        }
        try {
            await Parse.User.logIn(this.state.username, this.state.password);
            this.props.userHasAuthenticated({ isAuthenticated: true, user: Parse.User.current() });
            this.props.history.push("/mandats");
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
    }

    handleCountryChange = (selectedOption) => {
        this.setState({ country: selectedOption.value });
    }

    handleCityChange = (selectedOption) => {
        this.setState({ city: selectedOption.value });

    };
    handleReligionChange = (selectedOption) => {
        this.setState({ religion: selectedOption.value });

    }
    handleGenderChange = (selectedOption) => {
        this.setState({ gender: selectedOption.value });

    }

    renderForm() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isGroupsEmpty', () => {
            if (this.state.selectedOption.length < 1) {
                return false;
            }
            return true;
        });
        return (

            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                className={styles.Signup}
            >
                <Form.Group controlId="username">
                    <FormLabel>Username</FormLabel>
                    <TextValidator
                        autoFocus
                        onChange={this.handleChange}
                        name="username"
                        type="username"
                        placeholder="Enter User Name"
                        value={this.state.username}
                        validators={['required', 'minStringLength:4']}
                        errorMessages={['This field is required', 'User Name Must Be Longer']}
                    />

                </Form.Group>
                <Form.Group controlId="password" >
                    <FormLabel>Password</FormLabel>
                    <TextValidator
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        validators={['required', 'minStringLength:4']}
                        errorMessages={['This field is required', 'Password Must Be Longer']}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword" >
                    <FormLabel>Confirm Password</FormLabel>
                    <TextValidator
                        onChange={this.handleChange}
                        name="confimPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword}
                        validators={['required', 'minStringLength:4', 'isPasswordMatch:' + this.state.confirmPassword]}
                        errorMessages={['This field is required', 'Password Must Be Longer', 'Password Confirmation Must Match!']}
                    />
                </Form.Group>
                <Form.Group controlId="gender" >
                    <FormLabel>Gender</FormLabel>
                    <DropdownValidator
                        name="gender"
                        value={this.state.gender}
                        validators={['required']}
                        errorMessages={['Please Choose the Gender!']}
                        items={this.state.genders}
                        handleChange={this.handleGenderChange}
                    />
                </Form.Group>
                <Form.Group controlId="birthDate" >
                    <FormLabel>Birth Date</FormLabel>
                    <DatePicker selected={this.state.date} handleDayChange={this.handleDayChange} />
                </Form.Group>
                <Form.Group controlId="country" >
                    <FormLabel>Country</FormLabel>
                    <DropdownValidator
                        name="country"
                        value={this.state.country}
                        validators={['required']}
                        errorMessages={['Please Choose the Country!']}
                        items={this.state.countries}
                        handleChange={this.handleCountryChange}
                    />
                </Form.Group>
                <Form.Group controlId="city" >
                    <FormLabel>City</FormLabel>
                    <DropdownValidator
                        name="city"
                        value={this.state.city}
                        validators={['required']}
                        errorMessages={['Please Choose the City!']}
                        items={this.state.cities}
                        handleChange={this.handleCityChange}
                    />
                </Form.Group>
                <Form.Group controlId="religion" >
                    <FormLabel>Religion</FormLabel>
                    <DropdownValidator
                        name="religion"
                        value={this.state.religion}
                        validators={['required']}
                        errorMessages={['Please Choose the Religion!']}
                        items={this.state.religions}
                        handleChange={this.handleReligionChange}
                    />
                </Form.Group>
                <FormLabel>Groups</FormLabel>
                <DropdownValidator
                    multi={true}
                    name="religion"
                    value={this.state.selectedOption}
                    validators={['isGroupsEmpty']}
                    errorMessages={['Please Choose At Least One Group!']}
                    items={this.state.colourOptions}
                    handleChange={this.handleGroupChange}
                />
                <Form.Group controlId="secret" >
                    <FormLabel>Secret</FormLabel>
                    <TextValidator
                        onChange={this.handleChange}
                        name="secret"
                        type="password"
                        placeholder="Enter Secret Value"
                        value={this.state.secret}
                        validators={['required', 'minStringLength:4']}
                        errorMessages={['This field is required', 'Secret Value Must Be Longer']}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Signup"
                    loadingText="Signing up…"
                />
            </ValidatorForm>
        );
    }

    render() {
        return (
            <div className="Signup">
                {
                    this.renderForm()
                }
            </div>
        );
    }
}