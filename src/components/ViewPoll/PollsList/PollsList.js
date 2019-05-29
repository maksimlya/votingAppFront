import React from 'react';
import styles from './PollsList.module.css';
import { Table, Button } from 'react-bootstrap'


const pollsList = (props) => {
    function Tablefunc({ data, balance }) {
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
                    {data.map((row, i) => <Row data={row} key={i} num={i} />)}
                </tbody>
            </Table>
        );
    }

    function Row({ data, num }) {
        let button = null;
        if (data.results.VoteBalance > 0) {
            button = <Button as="input" type="button" value="Vote!" onClick={() => props.pollDetails(data.tag)} />
        } else {
            button = <Button as="input" title="You already voted for this poll, check results on statistics tab" type="button" value="Vote!" disabled onClick={() => props.pollDetails(data.tag)} />
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
        return (
            <td>{data}</td>
        );
    }
    return (
        <div className={styles.PollList}>
            <Tablefunc data={props.data} balance={props.balance} />
        </div>
    );
};

export default pollsList;