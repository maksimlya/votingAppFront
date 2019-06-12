import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

import styles from "./ControlPanel.module.css";
import Parse from 'parse'


export default class ControlPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: "",
            hashedValue: "",
            pubKey: "",
            privKey: "",
        };
    }

    handleChange = event => {

        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleHash = async event => {


        await this.setState({
            [event.target.name]: event.target.value
        });

        let params = {target: this.state.hash};
        let hashed = await Parse.Cloud.run('hash',params);

        this.setState({hashed:hashed});

    };

    handleKey = async event => {
    console.log(this.state)
        let params = {target: this.state.hash};
        let hashed = await Parse.Cloud.run('genKeyPair',params);

        this.setState({pubKey:hashed.publicKey, privKey: hashed.privKey});


    };





    render() {
        return (
            <div className={styles.Panel}>
                <h2>ControlPanel</h2>
                <hr/>
                <h3>Hashing (SHA-256)</h3>
                <FormControl className={styles.Text} name='hash' type='text' value={this.state.hash} onChange={this.handleHash}/>
                <br/>
                <h6>{this.state.hashed}</h6>
                <hr/>
                <h3>Key Generation</h3>
                <FormControl className={styles.Text} name='key' type='text' value={this.state.hash} onChange={this.handleKey}/>
                <br/>
                <h6 className={styles.Container}>{this.state.pubKey}</h6>
                <br/>
                <h6 className={styles.Container}>{this.state.privKey}</h6>
                <hr/>
                Signing
                <hr/>
                Signature Validation
            </div>
        );
    }
}