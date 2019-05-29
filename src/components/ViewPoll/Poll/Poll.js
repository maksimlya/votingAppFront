import React, { Component } from 'react';
import styles from './Poll.module.css'
import { Form } from 'react-bootstrap';
import PollCard from './PollCard/PollCard';

class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuth: false,
            pollData: [],
            dataLoaded: false
        };
    }

    render() {
        return (
            <div className={styles.Poll}>
                <Form>
                    <Form.Group controlId="formPollName">
                        <Form.Label><strong>Poll Name</strong></Form.Label>
                        <Form.Label
                            className={styles.PropsLabel}><strong>{this.props.pollData.poll.name}</strong></Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formPollTag">
                        <Form.Label><strong>Poll Tag</strong></Form.Label>
                        <Form.Label
                            className={styles.PropsLabel}><strong>{this.props.pollData.poll.tag}</strong></Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formPollDesc">
                        <Form.Label><strong>Poll Description</strong></Form.Label>
                        <Form.Label
                            className={styles.PropsLabel}><strong>{this.props.pollData.poll.description}</strong></Form.Label>
                    </Form.Group>
                    <Form.Label style={{ fontSize: 'larger' }}><strong>Please choose one of the poll's
                    options</strong></Form.Label>
                    <div className={styles.Cards}>
                        {
                            this.props.pollData.opts.map((el, i) => <PollCard data={el} key={i} voted={this.props.submitted} />)
                        }
                    </div>
                </Form>
            </div>
        );
    }
};

export default Poll;