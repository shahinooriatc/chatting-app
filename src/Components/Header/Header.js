import React, { Component } from 'react'
import { auth, signOut } from "../../firebaseConfig";

export default class Header extends Component {

    handleLogOut = () => {

        
        signOut(auth).then(() => {
            console.log('Sign-out successful.');
        }).catch((error) => {
            // An error happened.
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.handleLogOut}>LogOut</button>
            </div>
        )
    }
}
