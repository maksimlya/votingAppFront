import React, {Component} from 'react';
import styles from './Graphs.module.css';
import PieGraph from './PieGraph/PieGraph';
import {Col, Row, Form} from 'react-bootstrap'
import TooltipGraph from './TooltipGraph/TooltipGraph';
import LineGraph from './LineGraph/LineGraph';
import CandleChart from './CandleChart/CandleChart'
import Dropdown from '../../CreatePoll/Dropdown/Dropdown'
import Parse from 'parse'

class Graphs extends Component {
    constructor(props){
        super(props)
        this.state = {
            options : [],
            polls: [],
            pollId: 0,
            cityData: new Map(),
            countryData: new Map(),
            isLoading: true,
            candleChartLoaded: false,
            colors: [
                '#00B8D9', '#0052CC', '#5243AA', '#FF5630', '#FF8B00', '#FFC400', '#36B37E', '#00875A', '#253858', '#666666'
            ]
        }
    }

    async componentDidMount() {
        let polls = await Parse.Cloud.run('getAllResults');
        console.log(polls)
        let optionss = [];
        polls.map((val, idx) => {
            let option = { id: idx, value: val.tag, label: val.name, color: this.state.colors[Math.floor(Math.random() * 10)] }
            optionss.push(option);
            return optionss;
        });

        await this.setState({ options: optionss, polls: polls});

        if(this.state.polls.length > 0) {
            await this.loadCitiesData();
            await this.loadCountriesData();
        }

        this.setState({candleChartLoaded:true})

    }

    handleChange = async e => {
        this.setState({candleChartLoaded:false})
        await this.setState({isLoading: true});
        await this.setState({pollId: e.id});
        await this.setState({candleChartLoaded: true});
        await this.loadCitiesData();
        await this.loadCountriesData();
        await this.setState({isLoading: false});



    };


    functionWithPromise = item => { //a function that returns a promise
        return Promise.resolve(item)
    }
    anAsyncFunction = async item => {
        return await this.functionWithPromise(item)
    }
    getData = async (list) => {
        return await Promise.all(list.map(item => this.anAsyncFunction(item)))
    }




     async loadCitiesData(){
        let cityData = new Map();
        let users = Parse.Object.extend('User');


            let choices =  this.state.polls[this.state.pollId].choices;
            for(let choice of choices){
                let cities = [];
                if(this.state.polls[this.state.pollId].results.Voters[choice])
                for(let pubKey of this.state.polls[this.state.pollId].results.Voters[choice]){
                    let query = new Parse.Query(users);
                    query.equalTo('pubKey', pubKey)
                    let usr = await query.find();

                    cities.push(usr[0].get('city'))
                }
                cityData.set(choice,cities);
            }

            await this.setState({cityData: cityData});
    }

    async loadCountriesData(){
        let countryData = new Map();
        let users = Parse.Object.extend('User');


        let choices =  this.state.polls[this.state.pollId].choices;
        for(let choice of choices){
            let countries = [];
            if(this.state.polls[this.state.pollId].results.Voters[choice])
                for(let pubKey of this.state.polls[this.state.pollId].results.Voters[choice]){
                    let query = new Parse.Query(users);
                    query.equalTo('pubKey', pubKey)
                    let usr = await query.find();

                    countries.push(usr[0].get('country'))
                }
            countryData.set(choice,countries);
        }

        await this.setState({countryData: countryData});
    }

    render() {
        let users = Parse.Object.extend('User');
        var cities = new Map();
        return (
        <div className={styles.Graphs}>
            <Dropdown items={this.state.options} handleChange={this.handleChange}/>

            {this.state.candleChartLoaded &&
            <CandleChart data={this.state.polls[this.state.pollId]}/>
            }
            {!this.state.isLoading &&
                <div>



            <Row>


                { this.state.polls[this.state.pollId].choices.map( (val,id) => {
                    return <Col key={id}><Form.Label>{val}</Form.Label><PieGraph data={this.state.cityData.get(val)}/></Col>
                })



                }



            </Row>
                    <Row>


                        { this.state.polls[this.state.pollId].choices.map( (val,id) => {
                            return <Col key={id}><Form.Label>{val}</Form.Label><PieGraph data={this.state.countryData.get(val)}/></Col>
                        })



                        }



                    </Row>
                </div>
            }



            <TooltipGraph/>
            <LineGraph/>
        </div>
        );

    }
}

export default Graphs;