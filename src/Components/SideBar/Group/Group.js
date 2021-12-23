import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Message } from 'semantic-ui-react'
import { getDatabase, set, ref, push } from '../../../firebaseConfig';


export default class Group extends Component {
    //initial State for modal...
    state = {
        group: [],
        modal: false,
        groupName: '',
        groupType: '',
        loader: false,
        errorMsg: '',
        successMsg: '',
    }
    //modal open & close functions
    modalOpen = () => {
        this.setState({ modal: true });
    }
    modalClose = () => {
        this.setState({ modal: false })
    }
    // set groupName & groupType from input box by function
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    isFormValid = ({ groupName, groupType }) => {
        if (!groupName.length || !groupType.length) {
            this.setState({ errorMsg: "All Field Are Required" })
            this.setState({ successMsg: '' })
        }
        else if (this.state.groupName === this.state.groupType) {
            this.setState({ errorMsg: 'Please Change Name of Group Type' })
            this.setState({ successMsg: '' })
        }
        else {
            return true
        }
    }


    handleAddGroup = (e) => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ loader: true })
            const db = getDatabase();
            const postListRef = ref(db, 'posts');
            const newPostRef = push(postListRef);
            set(newPostRef, {
                groupName: this.state.groupName,
                groupType: this.state.groupType
            });
            this.setState({ groupName: '' })
            this.setState({ groupType: '' })
            alert('Group Added to the server')
        } else {
            this.setState({ errorMsg: 'Please fill all fields ' })
        }
    }

    render() {

        return (
            <>
                <Header>
                    <span style={{ marginLeft: '20px', display: 'inline-block' }}>
                        Group({this.state.group.length})</span>
                    <Icon onClick={this.modalOpen} style={{ display: 'inline-block', marginLeft: '60px', cursor: 'pointer' }} name='add circle'></Icon>

                </Header>

                <Modal
                    basic
                    onClose={false}
                    onOpen={true}
                    open={this.state.modal}
                    size='small'
                >
                    <Header icon> <Icon name='group' /> Add New Group</Header>

                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label style={{ color: '#fff' }}>Group Name</label>
                                <input onChange={this.handleChange} className={this.state.errorMsg.includes("Field") ? 'error' : ''} name="groupName" placeholder='Group Name' />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: '#fff' }}>Group Type</label>
                                <input onChange={this.handleChange} className={this.state.errorMsg.includes("Field") ? 'error' : ''} name="groupType" placeholder='Group Type' />
                            </Form.Field>
                        </Form>

                        {this.state.errorMsg ? <Message negative >
                            <Message.Header>{this.state.errorMsg}</Message.Header>
                        </Message> : ''}

                    </Modal.Content>

                    <Modal.Actions>
                        <Button color='green' inverted onClick={this.handleAddGroup}>
                            <Icon name='checkmark' /> Add Group
                        </Button>
                        <Button name='cancel' basic color='red' inverted onClick={this.modalClose}>
                            <Icon name='remove' /> Cancel
                        </Button>
                    </Modal.Actions>

                </Modal>
            </>
        )
    }
}
