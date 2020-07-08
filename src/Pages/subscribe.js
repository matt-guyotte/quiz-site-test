import React from 'react'; 
import TopNavbar from './navbar'; 
import {Container} from 'react-bootstrap'; 
import {Form} from 'react-bootstrap'; 
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap'; 

class Subscribe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonPress: false 
        }
    }
    render() {
        if (this.state.buttonPress === false)
        return (
            <div>
                <TopNavbar />
                <Container fluid>
                    <Row className = "justify-content-center auto top-pad"> 
                        <Form>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                            </Form.Text>
                          </Form.Group>
                          <Button name = 'submit' variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>
                    </Row>
                </Container>
            </div>
        )
        if (this.state.buttonPress === true) {
            return (
                <div>
                    <TopNavbar />
                    <Row>
                        <Col md = 'auto'>
                            <h1> Nice! </h1>
                        </Col>
                        <Col>
                            <h2> You will now be redirected! </h2>
                        </Col>
                    </Row>
                </div>
            )
    }
    }
} 

export default Subscribe; 