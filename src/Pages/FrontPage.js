import React from 'react'; 
import "../App.css"; 
import "./CSS/frontPage.css";
import {Container} from 'react-bootstrap'; 
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap'; 
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import TopNavbar from './navbar';

class FrontPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            finishedQuizzes: 0,
            test: ''
        })
    }

    componentDidMount() {
        fetch('/api')
        .then(res => res.json())
        .then(res => this.setState({finishedQuizzes: res.finishedQuizzes}))
    }



    render() {
        if(this.state.finishedQuizzes < 2) {
            return (
                <div>
                    <TopNavbar />
                    <Jumbotron fluid className = "jumboFront">
                        <Container>
                                <h1>Quizzes</h1>
                                <p>These quizzes know you better than you do!</p>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row className = "justify-content-center row-label">
                            <Col md = 'auto'>
                                <h3> <em> Novice </em> </h3>
                            </Col>
                        </Row>
                        <Row className="justify-content-center quiz-row m-auto">
                            <Col className = "novice-column quiz-1 m-2">
                            <Link to = "/quiz1"> <p> What Color Are You? </p> </Link>
                            </Col>
                            <Col className = "novice-column quiz-2 m-2">
                            <Link to = "/quiz2"> <p> Are You Actually a Cyborg? </p> </Link> 
                            </Col>
                            <Col className = "novice-column quiz-3 m-2">
                            <Link to = "/quiz3"> <p> Which RPG Class Are You? </p> </Link> 
                            </Col>
                        </Row>
                        <Row className = "justify-content-center row-label">
                            <Col md = "novice-column quiz-4 m-2 auto">
                                <h3> <em> Intermediate </em> </h3>
                            </Col>
                        </Row>
                        <Row className = "justify-content-center">
                            <Col md = "auto">
                                <p> Complete <strong> 2 </strong> quizzes to unlock this! </p>
                            </Col>
                        </Row>
                        <Row className="justify-content-center blind">
                            <Col className = "novice-column quiz-4" md = "auto">
                            <Link to = "/quiz1"> Can we guess if you're an introvert? </Link>
                            </Col>
                        </Row>
                        <Row className = "justify-content-center row-label">
                            <Col md = "auto">
                                <h3> Advanced </h3>
                            </Col>
                        </Row>
                        <Row className = "justify-content-center">
                            <Col md = "auto">
                                <p> Complete <strong> 4 </strong> quizzes to unlock this! </p>
                            </Col>
                        </Row>
                        <Row className="justify-content-center blind">
                            <Col className = "novice-column quiz-5" md = "auto">
                            <Link to = "/quiz1"> Can You Beat This Quiz? </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
        if(this.state.finishedQuizzes >= 2 && this.state.finishedQuizzes < 4) {
            return (
                <div>
                    <TopNavbar />
                    <Jumbotron fluid className = "jumboFront">
                        <Container>
                                <h1>Quizzes</h1>
                                <p>These quizzes know you better than you do!</p>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row className = "justify-content-center row-label">
                            <Col md = 'auto'>
                                <h3> <em> Novice </em> </h3>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col className = "novice-column quiz-1">
                            <Link to = "/quiz1"> What Color Are You? </Link>
                            </Col>
                            <Col className = "novice-column quiz-2">
                            <Link to = "/quiz2"> Are You Actually a Cyborg? </Link> 
                            </Col>
                            <Col className = "novice-column quiz-3">
                            <Link to = "/quiz3"> Which RPG Class Are You? </Link> 
                            </Col>
                        </Row>
                        <Row className = "justify-content-center row-label">
                            <Col md = "auto">
                                <h3> <em> Intermediate </em> </h3>
                            </Col>
                        </Row>
                        <Row className = "justify-content-center">
                            <Col md = "auto">
                                <p> Now Unlocked! </p>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col className = "novice-column quiz-4" md = "auto">
                            <Link to = "/quiz4"> Can we guess if you're an introvert? </Link>
                            </Col>
                        </Row>
                        <Row className = "justify-content-center row-label">
                            <Col md = "auto">
                                <h3> Advanced </h3>
                            </Col>
                        </Row>
                        <Row className = "justify-content-center">
                            <Col md = "auto">
                                <p> Complete <strong> 4 </strong> quizzes to unlock this! </p>
                            </Col>
                        </Row>
                        <Row className="justify-content-center blind">
                            <Col className = "novice-column quiz-5" md = "auto">
                            <Link to = "/quiz1"> Can You Beat This Quiz? </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
        if(this.state.finishedQuizzes >= 4) {
            return (
                <div>
                    <TopNavbar />
                    <Jumbotron fluid className = "jumboFront">
                        <Container>
                                <h1>Quizzes</h1>
                                <p>These quizzes know you better than you do!</p>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <Row className = "justify-content-center row-label">
                            <Col md = 'auto'>
                                <h3> <em> Novice </em> </h3>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col className = "novice-column quiz-1">
                            <Link to = "/quiz1"> What Color Are You? </Link>
                            </Col>
                            <Col className = "novice-column quiz-2">
                            <Link to = "/quiz2"> Are You Actually a Cyborg? </Link> 
                            </Col>
                            <Col className = "novice-column quiz-3">
                            <Link to = "/quiz3"> Which RPG Class Are You? </Link> 
                            </Col>
                        </Row>
                        <Row className = "justify-content-center row-label">
                            <Col md = "auto">
                                <h3> <em> Intermediate </em> </h3>
                            </Col>
                        </Row>
                        <Row className = "justify-content-center">
                            <Col md = "auto">
                                <p> Now Unlocked! </p>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col className = "novice-column quiz-4" md = "auto">
                            <Link to = "/quiz1"> Can we guess if you're an introvert? </Link>
                            </Col>
                        </Row>
                        <Row className = "justify-content-center row-label">
                            <Col md = "auto">
                                <h3> Advanced </h3>
                            </Col>
                        </Row>
                        <Row className = "justify-content-center">
                            <Col md = "auto">
                                <p> Now Unlocked! </p>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col className = "novice-column quiz-5" md = "auto">
                            <Link to = "/quiz1"> Can You Beat This Quiz? </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}

export default FrontPage; 