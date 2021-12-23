
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { auth, signInWithEmailAndPassword } from '../../../firebaseConfig';
import { Button, Container, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errorMsg: '',
        loader: false
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    isFormValid = ({ email, password }) => {
        if (!email.length || !password.length) {
            this.setState({ errorMsg: "All Field Are Required" })
        } else if (this.state.password.length < 6) {
            this.setState({ errorMsg: 'Please Password must be at least 6 characters' })
        } else {
            return true
        }
    }

    handleLogin = (e) => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ loader: true })

            signInWithEmailAndPassword(auth, this.state.email, this.state.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.setState({ loader: false })
                    this.setState({ errorMsg: "" })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    this.setState({ errorMsg: error.message })

                    this.setState({ loader: false })
                    console.log(errorCode);

                    if(this.state.errorMsg.includes('not-found')){
                        this.setState({ errorMsg:"This User Email Not Yet Registered"})
                    }else if(error.code.includes('wrong-password')){
                        this.setState({ errorMsg:"Wrong Password!"})
                    }
                });
        }
    }




    render() {

        const { email, password, errorMsg, loader } = this.state;

        return (
            <>
                <Container >
                    <Grid columns={2} verticalAlign='center' style={{ marginTop: '100px' }}>
                        <Grid.Row>
                            <Grid.Column>

                                <Segment raised>

                                    <Header as='h2' icon textAlign='center'>
                                        <Icon name='sign in' circular />
                                        <Header.Content>User Login</Header.Content>
                                    </Header>
                                    <Form onSubmit={this.handleLogin}>
                                        {/* conditional error message display */}
                                        {errorMsg ? <Message negative>
                                            <Message.Header>{errorMsg}</Message.Header>
                                        </Message> : ''}




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



                                        <Form.Field>
                                            <Button className={loader ? 'loading primary disable' : ''} content='Primary' primary type='submit'  >Login</Button>
                                        </Form.Field>

                                    </Form>
                                </Segment>
                                <Message attached='bottom'>
                                    <h5>
                                        Don't have an account ?&nbsp;<Link to='/register'>Register </Link>
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











// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { Button, Checkbox, Container, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'

// export default class Register extends Component {
//     state = {
//         userName: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     }
//     handleChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }

//     handleLogin = () => {
//     }

//     render() {
//         return (
//             <>
//                 <Container >
//                     <Grid columns={2} verticalAlign='center' style={{ marginTop: '100px' }}>
//                         <Grid.Row>
//                             <Grid.Column>
//                                 <Segment raised>

//                                     <Header as='h2' icon textAlign='center'>
//                                         <Icon name='user plus' circular />
//                                         <Header.Content>User Registration</Header.Content>
//                                     </Header>
//                                     <Form >

//                                         <Form.Field>
//                                             <label style={{ textAlign: 'left' }}><Icon name='mail' />
//                                                 E-mail</label>
//                                             <input placeholder='E-mail' onChange={this.handleChange} name="email" />
//                                         </Form.Field>

//                                         <Form.Field>
//                                             <label style={{ textAlign: 'left' }}><Icon name='lock' />
//                                                 Password</label>
//                                             <input type="password" placeholder='Password' onChange={this.handleChange} />
//                                         </Form.Field>

//                                         <Form.Field>
//                                             <Button onClick={this.handleLogin} content='Primary' primary type='submit'>Login</Button>
//                                         </Form.Field>
//                                     </Form>
//                                 </Segment>
//                                 <Message attached='bottom'>
//                                     <h5>
//                                         Don't have an account ?&nbsp;<Link to='/register'>Register</Link>
//                                     </h5>
//                                 </Message>
//                             </Grid.Column>
//                         </Grid.Row>
//                     </Grid>
//                 </Container>
//             </>
//         )
//     }
// }


