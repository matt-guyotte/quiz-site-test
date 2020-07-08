import React from 'react'; 
import TopNavbar from '../navbar';
import NewRole from '../Congrats Modal'; 
import "./Quiz CSS/Quiz.css"
import {startLabels} from './javascript/javascript-quiz-2'; 
import {questions} from './javascript/javascript-quiz-2';
import {endLabels} from './javascript/javascript-quiz-2'; 
import {Container} from 'react-bootstrap'; 
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

export default class Quiz2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickBegin: false,
      scoredQuiz: false, 
      currentQuestion: 0,
      score: 0,
      newNumber: 0
    }
    this.reset = this.reset.bind(this); 
    this.changeClicked = this.changeClicked.bind(this); 
    this.scoreQuiz = this.scoreQuiz.bind(this); 
    this.functionA = this.functionA.bind(this);
    this.functionB = this.functionB.bind(this);
    this.functionC = this.functionC.bind(this);
    this.functionD = this.functionD.bind(this); 
  }

  // State Functions

  reset() {
    this.setState({
      clickBegin: false,
      scoredQuiz: false,
      currentQuestion: 0,
      score: 0,
    })
  }

  changeClicked() {
    if (this.state.clickBegin === false) {
      this.setState({
        clickBegin: true
      })
    }
    else {
      this.setState({
        clickBegin: false
      })
    console.log(this.state.clickBegin)
    }
  }

  scoreQuiz() {
    if(this.state.currentQuestion === 7) {
      if(this.state.scoredQuiz === false) {
        this.setState({
          scoredQuiz: true
        })
      }
    }
    else {
      this.setState({
        scoredQuiz: false
      })
    }
    fetch('/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    fetch('/quizreturn')
    .then(res => res.json())
    .then(res => this.setState({newNumber: res.finishedQuizzes}));
  }

  functionA () {
    if(this.state.currentQuestion < 7) {
      this.setState ({
        score: this.state.score + questions[this.state.currentQuestion].choiceA.plus,
        currentQuestion: this.state.currentQuestion + 1
      })
    }
    else if(this.state.currentQuestion >= 7) {
      this.scoreQuiz(); 
    }
    return;
  }

  functionB () {
    if(this.state.currentQuestion < 7) {
      this.setState ({
        score: this.state.score + questions[this.state.currentQuestion].choiceB.plus,
        currentQuestion: this.state.currentQuestion + 1
      })
    }
    else if(this.state.currentQuestion >= 7) {
      this.scoreQuiz();
    }
    return;
  }

  functionC () {
    if(this.state.currentQuestion < 7) {
      this.setState ({
        score: this.state.score + questions[this.state.currentQuestion].choiceC.plus,
        currentQuestion: this.state.currentQuestion + 1
      })
    }
    else if(this.state.currentQuestion >= 7) {
      this.scoreQuiz();
    }
    return;
  }

  functionD () {
    if(this.state.currentQuestion < 7) {
      this.setState ({
        score: this.state.score + questions[this.state.currentQuestion].choiceD.plus,
        currentQuestion: this.state.currentQuestion + 1
      })
    }
    else if(this.state.currentQuestion >= 7) {
      this.scoreQuiz();
    }
    return;
  }

// Different pages rendered depending on state values

  render() {
    if (this.state.clickBegin === false && this.state.scoredQuiz === false) {
      return (
        <div>
          <TopNavbar />
          <div id = "main">
            <StartScreen 
            clickBegin = {this.state.clickBegin}
            scoredQuiz = {this.state.scoredQuiz}
            currentQuestion = {this.state.currentQuestion}
            score = {this.state.score}
            changeClicked = {this.changeClicked} />
          </div>
        </div>
      )
    }
    if (this.state.clickBegin === true && this.state.scoredQuiz === false) {
      return (
        <div id = "main">
          <TopNavbar />
          <QuestionsScreen 
            clickBegin = {this.state.clickBegin}
            scoredQuiz = {this.state.scoredQuiz}
            currentQuestion = {this.state.currentQuestion} 
            score = {this.state.score}
            functionA = {this.functionA}
            functionB = {this.functionB}
            functionC = {this.functionC}
            functionD = {this.functionD} 
            functionLast = {this.functionLast}
          />
        </div>
      )
    }

    if (this.state.clickBegin === true && this.state.scoredQuiz === true) {
      if(this.state.newNumber != 2 || this.state.newNumber != 4) {
        return (
          <div>
            <TopNavbar />
            <div id = "main">
              <EndScreen 
                currentQuestion = {this.state.currentQuestion}
                score = {this.state.score}
                scoreQuiz = {this.scoreQuiz} 
                reset = {this.reset}
              />
            </div>
          </div>
        )
      }
      if(this.state.newNumber === 2 || this.state.newNumber === 4) {
        return (
          <div>
            <TopNavbar />
            <div id = "main">
              <NewRole />
              <EndScreen 
                currentQuestion = {this.state.currentQuestion}
                score = {this.state.score}
                scoreQuiz = {this.scoreQuiz} 
                reset = {this.reset}
              />
            </div>
          </div>
        )
      }
    }
    else {
      return null;
    }
  }
}

class StartScreen extends React.Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this);
  }
  click() {
    this.props.changeClicked();
  }
  render() {
    return (
      <div className = "body">
      <Container fluid>
        <Row className = "m-auto default-row"> 
          <Col className = "m-auto text-center"> 
          <h1> {startLabels[0].title} </h1>
          </Col> 
        </Row>
        <Row className = "m-auto picture-row"> 
          <img className = "quizImage" src = {startLabels[0].imgSrc} fluid /> 
        </Row>
        <Row className = "m-auto default-row"> 
          <Col className = "m-auto text-center"> 
          <p> {startLabels[0].descrip} </p>
          </Col> 
        </Row>
        <Row className = "m-auto default-row" onClick = {this.click}> 
          <Col className = "m-auto text-center"> 
            <Button variant="primary">{startLabels[0].startQuiz}</Button>  
          </Col>
        </Row> 
      </Container>
      </div>
    )
  }
}

class QuestionsScreen extends React.Component {
  render() {
    return (
      <Container fluid> 
        <Row className = "m-auto default-row"> 
          <Col className = "m-auto text-center"> 
            <h2> <em> {questions[this.props.currentQuestion].question} </em> </h2> 
          </Col>
        </Row>
        <Row className = "m-auto default-row"> 
          <Col className = "answer-col m-auto text-center p-2" onClick = {this.props.functionA}> <Button className = "m-auto text-center button"> {questions[this.props.currentQuestion].choiceA.choice} </Button> </Col>
          <Col className = "answer-col m-auto text-center p-2" onClick = {this.props.functionB}> <Button className = "m-auto text-center button"> {questions[this.props.currentQuestion].choiceB.choice} </Button> </Col>
        </Row>
        <Row className = "m-auto default-row">
          <Col className = "answer-col m-auto text-center p-2" onClick = {this.props.functionC}> <Button className = "button"> {questions[this.props.currentQuestion].choiceC.choice} </Button> </Col>
          <Col className = "answer-col m-auto text-center p-2" onClick = {this.props.functionD}> <Button className = "button"> {questions[this.props.currentQuestion].choiceD.choice} </Button> </Col>
        </Row>
      </Container>
    )
  }
}

class EndScreen extends React.Component {
  render() {
    if (this.props.currentQuestion === 7 && this.props.score >= 8 && this.props.score <= 12) {
      return (
        <Container fluid> 
          <Row className = "m-auto default-row"> 
            <Col className = "m-auto text-center"> 
              <h1> {endLabels[0].result} </h1> 
            </Col>
          </Row>
          <Row className = "m-auto picture-row"> 
              <img className = "quizImage" src = {endLabels[0].imgSrc} fluid /> 
          </Row>
          <Row className = "m-auto default-row"> 
            <Col className = "m-auto text-center"> 
              <p> {endLabels[0].descrip} </p> 
            </Col>
          </Row>
          <Row className = "m-auto default-row" onClick = {this.props.reset}> 
            <Col className = "m-auto text-center"> 
              <Button variant="primary"> {endLabels[0].takeAgain} </Button> 
            </Col>
          </Row>
        </Container>
      )
    }
    if (this.props.currentQuestion === 7 && this.props.score >= 13 && this.props.score <= 22) {
      return (
        <Container fluid> 
          <Row className = "m-auto default-row"> 
            <Col className = "m-auto text-center"> 
              <h1> {endLabels[1].result} </h1> 
            </Col>
          </Row>
          <Row className = "m-auto picture-row"> 
              <img className = "quizImage" src = {endLabels[1].imgSrc} fluid /> 
          </Row>
          <Row className = "m-auto default-row"> 
            <Col className = "m-auto text-center"> 
              <p> {endLabels[1].descrip} </p> 
            </Col>
          </Row>
          <Row className = "m-auto default-row" onClick = {this.props.reset}> 
            <Col className = "m-auto text-center"> 
              <Button variant="primary"> {endLabels[1].takeAgain} </Button> 
            </Col>
          </Row>
        </Container>
      )
    }
    if (this.props.currentQuestion === 7 && this.props.score >= 23 && this.props.score <= 33) {
      return (
        <Container fluid> 
          <Row className = "m-auto default-row"> 
            <Col className = "m-auto text-center"> 
              <h1> {endLabels[2].result} </h1> 
            </Col>
          </Row>
          <Row className = "m-auto picture-row"> 
            <img className = "quizImage" src = {endLabels[2].imgSrc} fluid /> 
          </Row>
          <Row className = "m-auto default-row"> 
            <Col className = "m-auto text-center"> 
              <p> {endLabels[2].descrip} </p> 
            </Col>
          </Row>
          <Row className = "m-auto default-row" onClick = {this.props.reset}> 
            <Col className = "m-auto text-center"> 
              <Button variant="primary"> {endLabels[2].takeAgain} </Button> 
            </Col>
          </Row>
        </Container>
      )
    }
    if (this.props.currentQuestion === 7 && this.props.score >= 34 && this.props.score <= 38) {
      return (
        <Container fluid> 
          <Row className = "m-auto default-row"> 
            <Col className = "m-auto text-center"> 
              <h1> {endLabels[3].result} </h1> 
            </Col>
          </Row>
          <Row className = "m-auto picture-row"> 
            <img className = "quizImage" src = {endLabels[3].imgSrc} fluid /> 
          </Row>
          <Row className = "m-auto default-row"> 
            <Col className = "m-auto text-center"> 
              <p> {endLabels[3].descrip} </p> 
            </Col>
          </Row>
          <Row className = "m-auto default-row" onClick = {this.props.reset}> 
            <Col className = "m-auto text-center"> 
              <Button variant="primary"> {endLabels[3].takeAgain} </Button> 
            </Col>
          </Row>
        </Container>
      )
    }
  }
}
