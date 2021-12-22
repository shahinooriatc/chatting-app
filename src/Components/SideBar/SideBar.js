import React, { Component } from 'react'
import { Grid} from 'semantic-ui-react'
import UserPanel from './UserPanel';

export default class SideBar extends Component {

    render() {
        return (
            <Grid>
                <UserPanel />
            </Grid>
        )
    }
}
