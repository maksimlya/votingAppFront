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
                        <th>View Poll</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => <Row data={row} key={i} num={i}/>)}
                </tbody>
            </Table>
        );
    }

    function Row({ data, num }) {
        console.log(num);
        return (
            <tr>
                <Cell data={num+1} />
                <Cell data={data.name} />
                <Cell data={data.tag} />
                <Cell data={<Button as="input" type="button" value="View" onClick={this.props.pollDetailsHandler} / >}/>
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