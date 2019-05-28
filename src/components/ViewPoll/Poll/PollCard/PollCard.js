import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';
import g from '../../../../assets/Images/g.png'

class pollCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.data,
            description: '',
            link: '',
        }
    }

    componentDidMount() {

        for(let choice of this.props.extra.choiceDetails){
            if(choice.name === this.state.name){
                this.setState({link: choice.img._url, description: choice.description});
            }
        }

    }

    render(){
            return (
                    <Card style={{width: '200px', margin: '5px'}}>
                        <Card.Img variant="top" src={this.state.link} />
                    <Card.Body>
                    <Card.Title>{this.props.data}</Card.Title>
                    <Card.Text>{this.state.description}</Card.Text>
                    <Button variant="primary" type="submit" onClick={() => this.props.voted(this.props.data)}>Vote for me!</Button>
                    </Card.Body>
                    </Card>
            );
    }
}

export default pollCard;