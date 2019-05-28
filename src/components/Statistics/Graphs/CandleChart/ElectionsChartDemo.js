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
        this.compileData();
    }

    async compileData(){
      //  let params = {pollTag: 'PME',pubKey: Parse.User.current().get('pubKey')};
      //  let pollsData = await Parse.Cloud.run('getResults',params);


        //let totalVoters = 4340253;
       // let limitNum = (4340253 /100 ) * 3.25;

        let data = {'Likud': 1140370, 'Kahol-Lavan': 1125881, 'Shas': 258275, 'Yehadut-Ha-Tora': 249049, 'Hadash-Taal': 193442, 'Ha Avoda': 190870, 'Israel-Betenu': 173004, 'Ihud-Miflagot-Hayamin': 159468, 'Merez': 156473, 'Kulanu': 152756, 'Raam-Balad': 143666}


        let passedPartiesNum = 0;

        for (let name in data)
            passedPartiesNum+= data[name]

        let mandattWorth = passedPartiesNum/120;

        let fixedData = {Results:{'Likud': 1140370/mandattWorth, 'Kahol Lavan': 1125881/mandattWorth, 'Shas': 258275/mandattWorth, 'Yehadut Ha Tora': 249049/mandattWorth, 'Hadash-Taal': 193442/mandattWorth, 'Ha Avoda': 190870/mandattWorth, 'Israel Betenu': 173004/mandattWorth, 'Ihud Miflagot hayamin': 159468/mandattWorth, 'Merez': 156473/mandattWorth, 'Kulanu': 152756/mandattWorth, 'Raam-Balad': 143666/mandattWorth}}

        let totalMandatts = 0;

        for (let name in fixedData.Results){
            totalMandatts+= fixedData.Results[name];
        }

        console.log('total mandatts: ' + totalMandatts);


        let testData = {Results:{'Likud': 1140370/mandattWorth, 'Kahol Lavan': 1125881/mandattWorth, 'Shas': 258275/mandattWorth, 'Yehadut Ha Tora': 249049/mandattWorth, 'Hadash-Taal': 193442/mandattWorth, 'Ha Avoda': 190870/mandattWorth, 'Israel Betenu': 173004/mandattWorth, 'Ihud Miflagot hayamin': 159468/mandattWorth, 'Merez': 156473/mandattWorth, 'Kulanu': 152756/mandattWorth, 'Raam-Balad': 143666/mandattWorth}}

        // console.log(pollsData);
        // for (let res of pollsData.Results){
        //  console.log(res);
        // }
        let tmpPoints = []
        for (let key in testData.Results){   // TODO - testing here
            let tmp = {label: key, y: testData.Results[key], indexLabel: parseFloat(testData.Results[key]).toFixed(2)};    // Here too
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