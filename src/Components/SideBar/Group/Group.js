import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Message, Menu } from 'semantic-ui-react'
import { getDatabase, set, ref, push, onValue } from '../../../firebaseConfig';
import { connect } from 'react-redux';
import { setCurrentGroup } from '../../../Action/IndexAction';


class Group extends Component {
    //initial State for modal...
    state = {
        group: [],
        modal: false,
        groupName: '',
        groupType: '',
        loader: false,
        errorMsg: '',
        successMsg: '',
        firstLoad: true,
        menuActive: ''
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
            const groupListRef = ref(db, 'groups');
            const newGroupRef = push(groupListRef);

            set(newGroupRef, {

                groupName: this.state.groupName,
                groupType: this.state.groupType,
                createdBy: this.props.user.displayName,

            }).then(() => {
                this.setState({ groupName: '' })
                this.setState({ groupType: '' })
                this.setState({ errorMsg: '' })
                this.setState({ modal: false })
            })

        } else {
            this.setState({ errorMsg: 'Please fill all fields ' })
        }
    }
    // Load Group Data from RealTime Databse
    componentDidMount() {

        const db = getDatabase();
        const starCountRef = ref(db, 'groups/');
        onValue(starCountRef, (snapshot) => {
            let groupsAfterLoad = []
            snapshot.forEach((item) => {
                let groupData = {
                    id: item.key,
                    groupName: item.val().groupName,
                    groupType: item.val().groupType,
                    createdBy: item.val().createdBy
                }
                groupsAfterLoad.push(groupData)
            })
            this.setState({ group: groupsAfterLoad }, this.defaultGroupDisplay)
        });
    }

    // Default group on First load................................
    defaultGroupDisplay = () => {
        let firstGroup = this.state.group[0];
        if (this.state.firstLoad && this.state.group.length > 0) {
            this.props.setCurrentGroup(firstGroup)
            this.setState({ menuActive: firstGroup.id })
        }
        this.setState({ firstLoad: false })
    }

    handleGroup = (group) => {
        this.setState({menuActive:group.id})
        this.props.setCurrentGroup(group)
        

    }


    render() {

        return (
            <>
                <Header>
                    <span style={{ marginLeft: '20px', display: 'inline-block' }}>
                        Group({this.state.group.length})</span>
                    <Icon onClick={this.modalOpen} style={{ display: 'inline-block', marginLeft: '60px', cursor: 'pointer' }} name='add circle'></Icon>

                    <Menu vertical style={{ marginLeft: '3px' }}>
                        {this.state.group.map((item) => (
                            <Menu.Item onClick={() => this.handleGroup(item)} style={ item.id === this.state.menuActive ? menuLIstActive : menuList }>
                                {item.groupName}
                            </Menu.Item>
                        ))}

                    </Menu>
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
                                <input onChange={this.handleChange} className={this.state.errorMsg.includes("Field") ? 'error' : ''} name="groupName" placeholder='Group Name' value={this.state.groupName} />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: '#fff' }}>Group Type</label>
                                <input onChange={this.handleChange} className={this.state.errorMsg.includes("Field") ? 'error' : ''} name="groupType" placeholder='Group Type' value={this.state.groupType} />
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


let menuList = {
    color: "#3d4d5d",
    backgroundColor: '#FFFFFF',
}
let menuLIstActive = {
    fontWeight:600,
    color: '#FFF',
    backgroundColor: '#3d4d5d'
}
export default connect(null, { setCurrentGroup })(Group);