import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import { onAuthStateChanged, auth } from '../../firebaseConfig';
import { connect } from 'react-redux';
import { setUser } from '../../Action/IndexAction'
import { Dimmer, Loader, Segment } from 'semantic-ui-react';


class Home extends Component {

    componentDidMount() {
        console.log(this.props.isLoading);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.props.setUser(user)
            }
        });
    }
    render() {
        return (this.props.isLoading ?
            (<Segment style={{ height: '100vh' }}>
                <Dimmer active>
                    <Loader />
                </Dimmer>

            </Segment>)
            :
            (<div><Header />
                <h2> This is Home Component</h2>

                <Link to="/login">Login</Link> <br />
                <Link to="/register">register</Link>
                <hr />
            </div>)


        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.user.isLoading
})
export default connect(mapStateToProps, { setUser })(Home)
