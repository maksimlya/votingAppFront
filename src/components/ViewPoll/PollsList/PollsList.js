import React from 'react';
import styles from './PollsList.module.css';
import { Table, Button } from 'react-bootstrap'

const pollsList = (props) => {
    function Tablefunc({ data }) {
        return (
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Poll name</th>
                        <th>Poll Tag</th>
                        <th>Poll Description</th>
                        <th>View Poll</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => <Row data={row} key={i}/>)}
                </tbody>
            </Table>
        );
    }

    function Row({ data }) {
        return (
            <tr>
                <Cell data={data.id} />
                <Cell data={data.city} />
                <Cell data={data.team1} />
                <Cell data={data.result} />
                <Button as="input" type="button" value="View" />
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
            <Tablefunc data={props.data} />
        </div>
    );
};

export default pollsList;