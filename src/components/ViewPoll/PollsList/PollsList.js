import React from 'react';
import styles from './PollsList.module.css';
import { Table, Button } from 'react-bootstrap'


const pollsList = (props) => {
    function Tablefunc({ data, balance }) {

        console.log(data)
        return (
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Poll name</th>
                        <th>Poll Tag</th>
                        <th>View Poll</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => <Row style="vertical-align:middle" data={row} key={i} num={i} />)}
                </tbody>
            </Table>
        );
    }



    function Row({ data, num }) {
        let button = null;
        if (data.results.VoteBalance > 0) {
            button = <Button as="input" type="button" value="Vote!" onClick={() => props.pollDetails(data.tag)} />
        } else {
            button = <div>You voted for: {data.choices[data.results.VoteTarget]} <img width= "56px" src={data.choiceDetails[data.results.VoteTarget].img.url()}/></div>
        }
        return (
            <tr>
                <Cell data={num + 1} />
                <Cell data={data.name} />
                <Cell data={data.tag} />
                <Cell data={button} />
            </tr>

        );
    }

    function Cell({ data }) {
        const rowAlign = {
            verticalAlign: 'middle',
        };
        return (
            <td style={rowAlign}>{data}</td>
        );
    }
    return (
        <div className={styles.PollList}>
            <Tablefunc data={props.data} />
        </div>
    );
};

export default pollsList;