import React from 'react'; 
import TopNavbar from './navbar'; 
import {Container} from 'react-bootstrap'; 
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap'; 
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap'; 
import { Redirect } from "react-router-dom";



class register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          redirect: '',
          name: '',
          email: '',
          password: '',
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.submitFunction2 = this.submitFunction2.bind(this);
        this.navbarConnect = this.navbarConnect.bind(this); 
    }

    handleChangeName(event) {
      this.setState({
        name: event.target.value
      })
    }

    handleChangeEmail(event1) {
      this.setState({
        email: event1.target.value
      })
    }

    handleChangePassword(event2) {
      this.setState({
        password: event2.target.value
      })
    }

    submitFunction(event) {
      event.preventDefault();
      fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      }) 
      this.submitFunction2();
    }

    submitFunction2() {
      fetch('/register')
        .then(res => res.text())
        .then(res => this.setState({redirect: res}))
      this.setState({
        loginResult: 'Email or Password not found.'
      })
    }


    navbarConnect() {
      fetch('/navbarcall')
            .then(res => res.json())
            .then(res => this.setState({loggedIn: res}))
    }

    render() {
      if(this.state.redirect) {
        return (
          <div>
            <Redirect to = "/profile"/>
          </div>
        )
      }
      else {
        return (
            <div>
                <TopNavbar login = {this.navbarConnect}/>
                <Container fluid>
                    <Row className = "justify-content-center auto top-pad"> 
                        <Form onSubmit = {this.submitFunction}>
                        <Form.Group>
                          <Form.Label>Username</Form.Label>
                          <Form.Control input = "true" name = "name" placeholder="Enter name" value= {this.state.name || ''} onChange = {this.handleChangeName} required />
                          </Form.Group>
                          <Form.Group>
                          <Form.Label>Email address</Form.Label>
                          <Form.Control input = "true" name = "email" value= {this.state.email || ''} placeholder="Enter email" onChange = {this.handleChangeEmail} required />
                          <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text>
                          </Form.Group>
                          <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control input = "true" type="password" name = "password" value = {this.state.password || ''} onChange = {this.handleChangePassword} id = "password" placeholder= "Password" required />
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                          <p> {this.state.loginResult} </p>
                          <p> {this.state.test} </p>
                        </Form>
                    </Row>
                </Container>
            </div>
        )
      }
    }
} 

export default register; 