import React, { Component } from 'react'
import { Dropdown, Grid, Header } from 'semantic-ui-react'
import LogOut from '../Auth/LogOut/LogOut'

export default class UserPanel extends Component {
    Dropdown = () => [
        { text: <span >{this.props.user.email}</span>, disabled: true },
        { text: <span>Profile Setting</span> },
        { text: <span><LogOut /></span> } //import logout component for dropdown menu logout
    ]

    render() {
        const {displayName,email} =this.props.user;
       
        return (
            <Grid>
                <Grid.Column>
                    <Grid.Row>
                        <Header as='h1' icon textAlign='center' style={{ marginTop: '10px', fontSize: '30px', color: '#fff' }}>
                            CHATTING APP
                        </Header>
                    </Grid.Row>
                    <Header as='h2' icon textAlign='center'>
                        <Dropdown trigger={<span style={{ backgroundColor: '#ddd5d5', borderRadius: '25px', padding: '20px' }}
                        >{displayName}</span>} options={this.Dropdown()} />
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}
