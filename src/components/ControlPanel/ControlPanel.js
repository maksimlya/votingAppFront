import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel, Row, Col } from "react-bootstrap";

import styles from "./ControlPanel.module.css";
import Parse from 'parse'
import Button from "react-bootstrap/Button";


export default class ControlPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: "",
            signHash: "",
            signKey: "",
            hashedValue: "",
            pubKey: "",
            privKey: "",
            signature: "",
            valSig: "",
            valKey: "",
            returnedHash: "",
        };
    }


    handleChange = event => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleHash = async event => {


        await this.setState({
            [event.target.name]: event.target.value
        });

        let params = {target: this.state.hash};
        let hashed = await Parse.Cloud.run('hash',params);

        this.setState({hashed:hashed});

    };

    handleKey = async event => {
        let params = {target: this.state.hash};
        let hashed = await Parse.Cloud.run('genKeyPair',params);

        this.setState({pubKey:hashed.publicKey, privKey: hashed.privKey});


    };

    handleSign = async () => {
        if(this.state.signHash !== "" && this.state.signKey !== "") {
            let params = {hash: this.state.signHash, privKey: this.state.signKey};
            let hashed = await Parse.Cloud.run('sign', params);
            this.setState({signature: hashed});
        }
    };
    handleValidate = async () => {
        if(this.state.valSig !== "" && this.state.valKey !== "") {
            let params = {signature: this.state.valSig, pubKey: this.state.valKey};
            let hashed = await Parse.Cloud.run('verify', params);
            this.setState({returnedHash: hashed})
        }
    };



    render() {
        return (
            <div className={styles.Panel}>
                <h2>ControlPanel</h2>
                <hr/>
                <h3>Hashing (SHA-256)</h3>
                <FormControl className={styles.Text} name='hash' type='text' value={this.state.hash} onChange={this.handleHash}/>
                <br/>
                <h6 className={styles.Code}>{this.state.hashed}</h6>
                <hr/>
                <h3>Key Generation</h3>
                <FormControl className={styles.Text} name='key' type='text' value={this.state.hash}/><Button onClick={this.handleKey}>GenerateKey</Button>
                <br/>
                <Row>
                    <Col>
                <h6>Public Key</h6> <h6 className={styles.Container}>{this.state.pubKey}</h6>
                <br/>
                    </Col>
                    <Col>
                <h6>Private Key</h6> <h6 className={styles.Container}>{this.state.privKey}</h6>
                    </Col>
                </Row>
                <hr/>
                <h3>Signing</h3>
                <FormControl className={styles.Text} placeholder='Hash here' name='signHash' type='text' onChange={this.handleChange}/>
                <FormControl className={styles.Text} placeholder='Private Key here' name='signKey' type='text' onChange={this.handleChange}/>
                <Button onClick={this.handleSign}>Sign</Button>
                <br/>
                <br/>
                <h6>Signature</h6> <h6 className={styles.Container}>{this.state.signature}</h6>
                <hr/>
                <h3>Signature Validation</h3>
                <FormControl className={styles.Text} placeholder='Signature here' name='valSig' type='text' onChange={this.handleChange}/>
                <FormControl className={styles.Text} placeholder='Public Key here' name='valKey' type='text' onChange={this.handleChange}/>
                <Button onClick={this.handleValidate}>Validate</Button>
                <br/>
                <br/>
                <h6>Returned Hash</h6> <h6 className={styles.Container}>{this.state.returnedHash}</h6>
            </div>
        );
    }
}