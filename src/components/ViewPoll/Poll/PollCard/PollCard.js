import React from 'react';
import {Card, Button} from 'react-bootstrap';
import g from '../../../../assets/Images/g.png'

const pollCard = (props) => (
    <Card style={{ width: '200px' , margin:'5px'}}>
        <Card.Img variant="top" src={g} />
        <Card.Body>
            <Card.Title>{props.data}</Card.Title>
            <Card.Text>{props.data.description}</Card.Text>
            <Button variant="primary" type="submit" onClick={() => props.voted(props.data)}>Vote for me!</Button>
        </Card.Body>
    </Card>
);

export default pollCard;