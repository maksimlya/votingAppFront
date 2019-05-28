import React, { Component } from "react";
import CanvasJSReact from '../../../../canvasjs/canvasjs.react';
import "./AllPolls.css"
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



class ElectionsChartDemo extends Component {
    constructor(props){
        super(props);

        this.options = {}
    }

    componentDidMount() {
        console.log(this.props.data)
        this.compileData();
    }

    async compileData(){


        let data = this.props.data.results;

        let tmpPoints = []
        for (let key in data.Results){   // TODO - testing here
            let tmp = {label: key, y: data.Results[key]};    // Here too
            tmpPoints.push(tmp);
        }

        this.options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title: {
                text: "Knesset Seats Distribution"
            },
            data: [{
                type: "column",
                dataPoints: tmpPoints

            }]
        }
    }



    render() {




        return (
            <div className="CandleChart">
                <CanvasJSChart options = {this.options}
                />
            </div>





        );
    }
}

export default ElectionsChartDemo;