import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../LoaderButton/LoaderButton";
import styles from "./Signup.module.css";
import Parse from "parse";
import { colourStyles } from "../CreatePoll/Dropdown/constants";
import Select from "react-select";
import DatePicker from "../CreatePoll/DatePicker/DatePicker";
import MyDropdown from "../CreatePoll/Dropdown/Dropdown";
// Parse.serverURL = 'http://localhost:1337/parse';
//
// Parse.initialize("POLLS", "BLOCKCHAIN")

const religions = ['Jewish', "Christian", "Muslim", "Other"];
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
            birthDate: new Date(),
            gender: "",
            country: "",
            religion: "",
            secret: "",
            groups: [],
            newUser: null,
            selectedDay: undefined,
            selectedOption: null,

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

    componentDidMount() {
        this.fillOptions();

    }

    async fillOptions() {
        let options = [];
        let countryNames = [];
        let cityNames = [];
        let rels = [];
        let gens = [];
        let grps = await Parse.Cloud.run('getGroups');
        grps.map((val, idx) => {
            let option = { value: val, label: val, color: this.state.colors[Math.floor(Math.random() * 10)] }
            options.push(option);
            return options;
        });
        let countries = await Parse.Cloud.run('getCountries');
        countries.map((val, idx) => {
            let option = { value: val, label: val, color: this.state.colors[Math.floor(Math.random() * 10)] }
            countryNames.push(option);
            return countryNames;
        });
        // let cities = await Parse.Cloud.run('getCities');
        // cities.map((val, idx) => {
        //     let option = { value: val, label: val, color: this.state.colors[Math.floor(Math.random() * 10)] }
        //     cityNames.push(option);
        //     return cityNames;
        // });

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

        this.setState({ colourOptions: options, countries: countryNames, cities: cityNames, religions: rels, genders: gens })
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
        console.log(`Option selected:`, selectedOption);
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


        console.log(this.state);

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
            this.setState({isAuthenticated: true, user: Parse.User.current()});
            // this.props.userHasAuthenticated({ isAuthenticated: true, user: Parse.User.current() });
            // this.props.history.push("/");
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
        return (
            
            <form onSubmit={this.handleSubmit} className={styles.Signup}>
                <FormGroup controlId="username">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" >
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" >
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="gender" >
                    <FormLabel>Gender</FormLabel>
                    {/*<FormControl*/}
                    {/*    value={this.state.gender}*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    type="text"*/}
                    {/*/>*/}
                    <MyDropdown handleChange={this.handleGenderChange} items={this.state.genders} />
                </FormGroup>
                <FormGroup controlId="birthDate" >
                    <FormLabel>Birth Date</FormLabel>
                    <DatePicker selected={this.state.date} handleDayChange={this.handleDayChange} />
                </FormGroup>
                <FormGroup controlId="country" >
                    <FormLabel>Country</FormLabel>
                    <MyDropdown handleChange={this.handleCountryChange} items={this.state.countries} />
                </FormGroup>
                <FormGroup controlId="city" >
                    <FormLabel>City</FormLabel>
                    {/*<FormControl*/}
                    {/*    value={this.state.city}*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    type="text"*/}
                    {/*/>*/}
                    <MyDropdown handleChange={this.handleCityChange} items={this.state.cities} />
                </FormGroup>
                <FormGroup controlId="religion" >
                    <FormLabel>Religion</FormLabel>
                    {/*<FormControl*/}
                    {/*    value={this.state.religion}*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    type="text"*/}
                    {/*/>*/}
                    <MyDropdown handleChange={this.handleReligionChange} items={this.state.religions} />
                </FormGroup>
                <FormLabel>Groups</FormLabel>
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={this.handleGroupChange}
                    options={this.state.colourOptions}
                    styles={colourStyles} />
                <FormGroup controlId="secret" >
                    <FormLabel>Secret</FormLabel>
                    <FormControl
                        value={this.state.secret}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <LoaderButton
                    block

                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Signup"
                    loadingText="Signing up…"
                />
            </form>
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