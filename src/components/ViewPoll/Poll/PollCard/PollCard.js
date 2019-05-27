import React from 'react';
import {Card, Button} from 'react-bootstrap';
import g from '../../../../assets/Images/g.png'

const pollCard = (props) => (
    <Card style={{ width: '18rem' , margin:'5px'}}>
        <Card.Img variant="top" src={g} />
        <Card.Body>
            <Card.Title>{props.data.optName}</Card.Title>
            <Card.Text>{props.data.optDesc}</Card.Text>
            <Button variant="primary">Vote for me!</Button>
        </Card.Body>
    </Card>
);

export default pollCard;