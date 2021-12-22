// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { Button, Container, Divider, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react'

// export default class SignUp extends Component {

//     render() {
//         return (
//             <>
//                 <Container>
//                     <Grid columns={1} verticalAlign='center' style={{ marginTop: '100px' }}>
//                         <Grid.Row>
//                             <Grid.Column>
//                                 <Segment placeholder>

//                                     <Grid columns={2} relaxed='very' stackable>
//                                         <Grid.Column>
//                                             <Header as='h2' icon textAlign='center'>
//                                                 <Icon name='user plus' circular />
//                                                 <Header.Content>User Sign Up</Header.Content>
//                                             </Header>
//                                             <Form style={{ textAlign: 'left' }}>
//                                                 <Form.Input
//                                                     icon='user'
//                                                     iconPosition='left'
//                                                     label=' UserName'
//                                                     placeholder='Username'
//                                                 />
//                                                 <Form.Input
//                                                     icon='user'
//                                                     iconPosition='left'
//                                                     label='Email'
//                                                     placeholder='Email'
//                                                 />
//                                                 <Form.Input
//                                                     icon='lock'
//                                                     iconPosition='left'
//                                                     label='Password'
//                                                     type='password'
//                                                     placeholder='******'
//                                                 />
//                                                 <Form.Input
//                                                     icon='repeat'
//                                                     iconPosition='left'
//                                                     label='Password'
//                                                     type='password'
//                                                     placeholder='******'
//                                                 />
//                                                 <Button content='SignUp' primary size='large' />
//                                             </Form>
//                                         </Grid.Column>

//                                         <Grid.Column verticalAlign='middle'>
//                                             <Link to='/login'>
//                                                 <Button content='Login' icon='sign-in' size='big' primary />
//                                             </Link>

//                                         </Grid.Column>
//                                     </Grid>

//                                     <Divider vertical>Or</Divider>
//                                 </Segment>
//                             </Grid.Column>
//                         </Grid.Row>
//                     </Grid>
//                 </Container>
//             </>
//         )
//     }
// }
