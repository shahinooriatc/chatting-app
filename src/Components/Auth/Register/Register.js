
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { auth, createUserWithEmailAndPassword, updateProfile, db, ref, set } from '../../../firebaseConfig';
import { Button, Container, Form, Grid, Header, Icon, Message, Segment} from 'semantic-ui-react'

export default class Register extends Component {
    state = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMsg: '',
        successMsg: '',
        loader: false
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    isFormValid = ({ userName, email, password, confirmPassword }) => {
        if (!userName.length || !email.length || !password.length || !confirmPassword.length) {
            this.setState({ errorMsg: "All Field Are Required" })
            this.setState({ successMsg: '' })
        } else if (this.state.password.length < 6 || this.state.confirmPassword.length < 6) {
            this.setState({ errorMsg: 'Please Password must be at least 6 characters' })
            this.setState({ successMsg: '' })
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMsg: 'Please make sure your Password match' })
            this.setState({ successMsg: '' })

        } else {
            return true
        }
    }

    handleRegister = (e) => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ loader: true })
            createUserWithEmailAndPassword(auth, this.state.email, this.state.password, this.state.userName)
                //firebase auth enter with the email and password   
                .then(loggedUser => {
                    //firebase auth include user name 
                    updateProfile(auth.currentUser, {
                        displayName: this.state.userName

                        //Real time database Connect to Firebase
                        //writeUserData function call for set realtime data to firebase
                    }).then(() => {
                        this.writeUserData(loggedUser)
                    }).then(() => {
                        //Reset all state input after signIn
                        this.setState({ userName: '' })
                        this.setState({ email: '' })
                        this.setState({ password: '' })
                        this.setState({ confirmPassword: '' })
                        this.setState({ errorMsg: '' })
                        this.setState({ successMsg: 'Account Created Successfully' })
                        this.setState({ loader: false });
                    }).catch((error) => {
                        console.log(error);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.setState({ errorMsg: errorMessage })
                    this.setState({ successMsg: '' })
                    this.setState({ loader: false })
                    if (errorCode.includes("email")) {
                        this.setState({ errorMsg: "This Email Account Already Used!" })
                    }

                });
        }
    }


    // Write date to realtime Database after line 
    writeUserData = (user) => {
        set(ref(db, 'users/' + user.user.uid), {
            username: this.state.userName,
            email: this.state.email
        });
    }



    render() {

        const { userName, email, password, confirmPassword, errorMsg, successMsg, loader } = this.state;

        return (
            <>
                <Container >
                    <Grid columns={2} verticalAlign='center' style={{ marginTop: '100px' }}>
                        <Grid.Row>
                            <Grid.Column>

                                <Segment raised>

                                    <Header as='h2' icon textAlign='center'>
                                        <Icon name='user plus' circular />
                                        <Header.Content>User Registration</Header.Content>
                                    </Header>
                                    <Form onSubmit={this.handleRegister}>

                                        {errorMsg ? <Message negative>
                                            <Message.Header>
                                                {errorMsg}

                                            </Message.Header>
                                        </Message> : ''}

                                        {successMsg ? <Message positive>
                                            <Message.Header>
                                                {successMsg}

                                            </Message.Header>
                                        </Message> : ''}

                                        <Form.Field>
                                            <label style={{ textAlign: 'left' }} > <Icon name='user' />
                                                User Name</label>
                                            <input type="text" onChange={this.handleChange} name="userName" value={userName} placeholder='User Name' />
                                        </Form.Field>

                                        <Form.Field className={errorMsg.includes("Email") ? 'error' : ''}>
                                            <label style={{ textAlign: 'left' }}><Icon name='mail' />
                                                E-mail</label>
                                            <input type="email" onChange={this.handleChange} name="email" value={email} placeholder='E-mail' />
                                        </Form.Field>

                                        <Form.Field className={errorMsg.includes('Password') ? 'error' : ''}>
                                            <label style={{ textAlign: 'left' }}><Icon name='lock' />
                                                Password</label>
                                            <input type="password" onChange={this.handleChange} name="password" value={password} placeholder='Password' />
                                        </Form.Field>

                                        <Form.Field className={errorMsg.includes('Password') ? 'error' : ''}>
                                            <label style={{ textAlign: 'left' }}><Icon name='repeat' />
                                                Confirm Password</label>
                                            <input type="password" onChange={this.handleChange} name="confirmPassword" value={confirmPassword} placeholder='Confirm Password' />
                                        </Form.Field>

                                        <Form.Field>
                                            <Button className={loader ? 'loading primary disable' : ''} content='Primary' primary type='submit'  >Register</Button>
                                        </Form.Field>

                                    </Form>
                                </Segment>
                                <Message attached='bottom'>
                                    <h5>
                                        Already have an account ?&nbsp;<Link to='/login'>LogIn </Link>
                                    </h5>
                                </Message>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </>
        )
    }
}
