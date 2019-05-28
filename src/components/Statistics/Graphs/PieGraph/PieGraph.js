import React, { Component } from 'react';
import { PieChart, Pie, Cell, Tooltip} from 'recharts';
import {Col} from 'react-bootstrap'

var data = [
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index, cityName
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


export default class PieGraph extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            isLoaded: false
        }
    }


    async componentDidMount() {
        await this.loadData()

    }

    async loadData(){
        let tmp = new Map();


        for(let dat of this.props.data){
            if(!tmp.get(dat)) {
                await tmp.set(dat, 1);
            }
            else{
                let d = tmp.get(dat);

                await tmp.set(dat,d+1)
            }

        }

        if(this.props.data.length < 1)
            tmp.set('None', 1)



        await this.setState({data:tmp});


        let temp = []
        for(let i of tmp.keys()){
            temp.push({name: i,value: tmp.get(i)})
        }

        data = temp;

        this.setState({isLoaded: true})
       // console.log(this.props.data)
    }
    render() {
        return (

            <PieChart width={300} height={300}>
                {this.state.isLoaded &&
                <Pie
                    data={data}
                    cx={150}
                    cy={150}

                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>

                }
                <Tooltip />
            </PieChart>
        );
    }
}
