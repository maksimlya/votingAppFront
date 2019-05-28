import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';
import Parse from 'parse'
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

    async componentDidMount() {
        let desc = Parse.Object.extend('choiceDescriptions');
        let query = new Parse.Query(desc);
        for(let choice of this.props.extra.choiceDetails){
            if(choice.name === this.state.name){
                query.equalTo('choice', choice.name);
                let res = await query.find()
                //let img = res[0].get('image');
                //this.setState({link: img.url(), description: choice.description});
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