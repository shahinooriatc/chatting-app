import React, { Component } from 'react'
import { Grid} from 'semantic-ui-react'
import UserPanel from './UserPanel';
import Group from './Group/Group.js';

export default class SideBar extends Component {

    render() {
        // console.log(this.props.user);
        return (
            <Grid>
                <UserPanel  user={this.props.user}/>
                <Group/>
            </Grid>
        )
    }
}
