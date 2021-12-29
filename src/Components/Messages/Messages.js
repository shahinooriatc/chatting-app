import React, { Component } from 'react'
import { Grid, Segment  } from 'semantic-ui-react'
import MessageForm from './MessageForm';
import MessageHeader from './MessageHeader';

export default class Messages extends Component {
    render() {
        return (
            <>
                <MessageHeader/>  
                <Segment style={{ height: "500px",overflowY: "scroll" }}>
                    
                </Segment>
                <MessageForm/> 
            </>
        )
    }
}
