import React, { Component } from 'react';
import styles from './Poll.module.css'
import { Form } from 'react-bootstrap';
import PollCard from './PollCard/PollCard';

class Poll extends Component {
    render() {
        console.log('[in poll.js]' + this.props.pollData.pollName);
        return (
            <div className={styles.Poll}>
                <Form onSubmit={e => this.props.submitted(e)}>
                    <Form.Group controlId="formPollName">
                        <Form.Label><strong>Poll Name</strong></Form.Label>
                        <Form.Label className={styles.PropsLabel}><strong>{this.props.pollData.pollName}</strong></Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formPollTag">
                        <Form.Label><strong>Poll Tag</strong></Form.Label>
                        <Form.Label className={styles.PropsLabel}><strong>{this.props.pollData.pollTag}</strong></Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formPollDesc">
                        <Form.Label><strong>Poll Description</strong></Form.Label>
                        <Form.Label className={styles.PropsLabel}><strong>{this.props.pollData.pollDescription}</strong></Form.Label>
                    </Form.Group>
                    <Form.Label style={{ fontSize: 'larger' }}><strong>Please choose one of the poll's options</strong></Form.Label>
                    <div className={styles.Cards}>
                        {this.props.pollData.pollOpt.map((el,i) => <PollCard data={el} key={el.optName + i} />)}
                    </div>
                </Form>
            </div>
        );
    }
};

export default Poll;