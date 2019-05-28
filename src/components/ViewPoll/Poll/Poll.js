import React, { Component } from 'react';
import styles from './Poll.module.css'
import { Form } from 'react-bootstrap';
import PollCard from './PollCard/PollCard';

class Poll extends Component {
    state = {
        isAuth: false
    };

    render() {
        console.log('[in poll.js]' + this.props.pollData.name);
        return (
            <div className={styles.Poll}>
                <Form>
                    <Form.Group controlId="formPollName">
                        <Form.Label><strong>Poll Name</strong></Form.Label>
                        <Form.Label className={styles.PropsLabel}><strong>{this.props.pollData.name}</strong></Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formPollTag">
                        <Form.Label><strong>Poll Tag</strong></Form.Label>
                        <Form.Label className={styles.PropsLabel}><strong>{this.props.pollData.tag}</strong></Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formPollDesc">
                        <Form.Label><strong>Poll Description</strong></Form.Label>
                        <Form.Label className={styles.PropsLabel}><strong>{this.props.pollData.description}</strong></Form.Label>
                    </Form.Group>
                    <Form.Label style={{ fontSize: 'larger' }}><strong>Please choose one of the poll's options</strong></Form.Label>
                    <div className={styles.Cards}>
                        {this.props.pollData.choices.map((el, i) => <PollCard data={el} key={i} choice={this.voted} voted={this.props.submitted}/>)}
                    </div>
                </Form>
            </div>
        );
    }
};

export default Poll;