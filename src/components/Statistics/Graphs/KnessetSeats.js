import Parse from "parse";
import React, {Component} from "react";
import './CandleChart/AllPolls.css'
import CandleChart from "./CandleChart/CandleChart";



export default class KnessetSeats extends Component {
    constructor(props){
        super(props);

        this.state = {
            dataLoaded: false,
            pollsData: null
        }


    }

    componentDidMount() {

        (async () => {
            let data = await this.dataLoaded();
            this.setState({dataLoaded: true, pollsData: data})
        })();


    }

    async dataLoaded(){
        let pollsData = await Parse.Cloud.run('getAllResults');

        return pollsData;

    }



    render() {
        return (
            <div className="bodyapp">
                <CandleChart/>

            </div>
        );
    }
}