import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';
import Parse from 'parse'
import g from '../../../../assets/Images/g.png'

class pollCard extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }




    render(){
            return (
                    <Card style={{width: '200px', margin: '5px'}}>
                        <Card.Img variant="top" src={this.props.data.link} />
                    <Card.Body>
                    <Card.Title>{this.props.data.name}</Card.Title>
                    <Card.Text>{this.props.data.description}</Card.Text>
                    <Button variant="primary" type="submit" onClick={() => this.props.voted(this.props.data)}>Vote for me!</Button>
                    </Card.Body>
                    </Card>
            );
    }
}

export default pollCard;