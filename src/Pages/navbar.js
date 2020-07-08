import React from 'react'; 
import {Redirect} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap'; 
import {Container} from 'react-bootstrap'; 
import {NavDropdown} from 'react-bootstrap'; 
import {Button} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 

class TopNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            redirect: false,
        }
        this.clickLogout = this.clickLogout.bind(this); 
        this.redirectFunction = this.redirectFunction.bind(this); 
    }

    componentDidMount() {
        fetch('/navbarcall')
            .then(res => res.json())
            .then(res => this.setState({loggedIn: res}))
    }

    clickLogout() {
        fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        });
        this.setState({
            loggedIn: false
        })
    }

    redirectFunction() {
        if(this.state.redirect) {
            return <Redirect to = '/quiz1' />
        }
    }

    render() {
        if(this.state.loggedIn === false) {
            return (
                <div>
                    {this.redirectFunction()}
                    <Navbar expand = 'lg' bg = 'light' variant = 'light' className = 'nav-bar'>
                    <Container fluid>
                        <Navbar.Brand><Link to = "/"> <img src = "https://i.ibb.co/PYx45Bq/Quiz-World-logo.png" className = 'navpic' /> </Link> </Navbar.Brand>
                        <Nav.Item className = "ml-auto"> <Nav.Link> <Link to = "/"> Quizzes  </Link> </Nav.Link> </Nav.Item> 
                        <Nav.Item className = "ml-auto"> <Nav.Link> <Link to = "/register"> Register </Link> </Nav.Link> </Nav.Item> 
                        <Nav.Item className = "ml-auto"> <Nav.Link> <Link to = "/subscribe"> Subscribe </Link> </Nav.Link> </Nav.Item>
                        <Link to = "/login"> <Button className = "login"> Login </Button></Link>
                    </Container>
                    </Navbar>
                </div>
            )
        }
        if(this.state.loggedIn === true) {
            return (
                <div>
                    {this.redirectFunction()}
                    <Navbar expand = 'lg' bg = 'light' variant = 'light' className = 'nav-bar'>
                    <Container fluid>
                        <Navbar.Brand><Link to = "/"> <img src = "https://i.ibb.co/PYx45Bq/Quiz-World-logo.png" className = 'navpic' /> </Link> </Navbar.Brand>
                        <Nav.Item className = "ml-auto"> <Nav.Link> <Link to = "/"> Quizzes  </Link> </Nav.Link> </Nav.Item> 
                        <Nav.Item className = "ml-auto"> <Nav.Link> <Link to = "/register"> Register </Link> </Nav.Link> </Nav.Item> 
                        <Nav.Item className = "ml-auto"> <Nav.Link> <Link to = "/subscribe"> Subscribe </Link> </Nav.Link> </Nav.Item>
                        <Link to = "/logout"> <Button onClick = {this.clickLogout}> Logout </Button></Link>
                    </Container>
                    </Navbar>
                </div>
            )
        }
    }
}   

export default TopNavbar; 