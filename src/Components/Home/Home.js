import React, { Component } from 'react'
import { onAuthStateChanged, auth } from '../../firebaseConfig';
import { connect } from 'react-redux';
import { setUser, clearUser } from '../../Action/IndexAction'
import { Dimmer, Grid, Loader, Segment, Message } from 'semantic-ui-react';
import SideBar from './../SideBar/SideBar';
import ColorPlate from './../ColorPlate/ColorPlate';
import MetaPanel from './../MetaPanel/MetaPanel';
import Messages from './../Messages/Messages';


class Home extends Component {
    componentDidMount() {
        onAuthStateChanged(auth, (user) => {

            if (user) {
                this.props.setUser(user)
            } else {
                this.props.clearUser()
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
            (<Grid columns={4} style={{ height: '100vh' }} divided>

                <Grid.Column width={1} style={{ backgroundColor: '#6276B5' }}>
                    <ColorPlate />
                </Grid.Column>

                <Grid.Column width={2} style={{ backgroundColor: '#64A5D3' }}>
                    <SideBar user={this.props.userName} />
                </Grid.Column>

                <Grid.Column width={9} style={{ backgroundColor: '#D9EDF9' }}>
                    <Messages />
                </Grid.Column>

                <Grid.Column width={4} style={{ backgroundColor: '#B3F5FF' }}>
                    <MetaPanel />
                </Grid.Column>

            </Grid>)
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.user.isLoading,
    userName: state.user.currentUser
})
//React & redux connect with this line, And set User, clear user operation work for Home component//
export default connect(mapStateToProps, { setUser, clearUser })(Home)
