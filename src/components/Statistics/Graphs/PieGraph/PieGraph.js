import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import {Col} from 'react-bootstrap'

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
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
            data: []
        }
    }


    async componentDidMount() {
        await this.loadData()

    }

    loadData(){
        let tmp = new Map();

        console.log(this.props.data)

        for(let dat of this.props.data){
            if(!tmp.get(dat))
                tmp.set(dat,1);
            else
                tmp.set(dat,tmp.get(dat)+1)
        }

        if(this.props.data.length < 1)
            tmp.set('None', 1)

        // for(let i of choices){
        //     if(!tmp.get(i))
        //         tmp.set(i,0)
        // }

        this.setState({data:tmp});

       // console.log(this.props.data)
    }
    render() {
        return (
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx={150}
                    cy={150}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        );
    }
}
