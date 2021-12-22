import { signOut, auth } from '../../../firebaseConfig';
import React, { Component } from 'react'
import { Header} from 'semantic-ui-react';

export default class LogOut extends Component {
    handleLogOut = () => {
        signOut(auth).then(() => {
            console.log('Sign-out successful.');
        }).catch((error) => {
            // An error happened.
        });
    };

    render() {
        return (
            <Header as='h3' style={{color:'red'}}>
                <p onClick={this.handleLogOut}>LogOut</p>
            </Header>
        )
    }
}
