import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'

export default class ColorPlate extends Component {
    render() {
        return (
            <Grid style={{ marginTop: '25px' }}>
                <Icon  size='huge' name='circle add' />
            </Grid>
        )
    }
}
