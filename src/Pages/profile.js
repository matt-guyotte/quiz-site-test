import React from 'react'; 
import TopNavbar from './navbar'; 
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';  
import '../App.css'
import "./CSS/profile.css"

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            completedQuizzes: 0,
            ranking: ''
        }
    }

    componentDidMount() {
        fetch('/profileapi')
        .then(res => res.json())
        .then(res => this.setState({name: res.name, completedQuizzes: res.finishedQuizzes, ranking: res.role}))
    }

    render() {
        return (
            <div>
                <TopNavbar />
                <Container fluid>
                    <Row className = "bigRow m-auto">
                    <Col className = "profileCol1 m-auto">
                        <Row className = "profileRow">
                            <img className = "profilePic" src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" rounded /> 
                        </Row>
                        <Row className = "m-auto text-center">
                            <Col> <h1> {this.state.name} </h1> </Col>
                        </Row>
                    </Col>
                    <Col className = "profileCol2">
                        <Row className = "mt-3"> <Col className = "p-3"> <h3> Rank: {this.state.ranking} </h3> </Col> </Row>
                        <Row className = "mt-3"> <Col className = "p-3"> <h3> finishedQuizzes: {this.state.completedQuizzes} </h3> </Col> </Row>
                    </Col>
                    </Row>
                </Container>
            </div>
        )
    }
} 

export default Profile; 