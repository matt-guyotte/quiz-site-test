import React from 'react'; 
import TopNavbar from '../navbar';
import NewRole from '../Congrats Modal';
import './Quiz CSS/Quiz.css';
import {startLabels} from './javascript/javascript-quiz-4'; 
import {questions} from './javascript/javascript-quiz-4';
import {endLabels} from './javascript/javascript-quiz-4'; 
import {Container} from 'react-bootstrap'; 
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default class Quiz4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickBegin: false,
      scoredQuiz: false,
      currentQuestion: 0,
      score: [],
      mostFrequent: "",
      newNumber: 0,
      quizAccess: false
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

  componentDidMount() {
    fetch('/apiquiz4')
      .then(res => res.json())
      .then(res => this.setState({quizAccess: res}))
  }

  reset = () => {
    this.setState({
      clickBegin: false,
      scoredQuiz: false,
      currentQuestion: 0,
      score: [],
      mostFrequent: ''
    })
  }

  changeClicked = () => {
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

  scoreQuiz = () => {
    var introvert = 0;
    var ambivert = 0; 
    var extrovert = 0; 

    for(var i = 0; i < this.state.score.length; i++) {
      if (this.state.score[i] === "Ambivert") {
       ambivert++; 
      }
      if(this.state.score[i] === "Introvert") {
        introvert++;
      }
      if(this.state.score[i] === "Extrovert") {
        extrovert++;
      }
    }

    // If result is clear: 

    if (ambivert > introvert && ambivert > extrovert && this.state.mostFrequent === '') {
      this.setState ({
        scoredQuiz: true,
        mostFrequent: "Ambivert"
      })
    }
    if (introvert > ambivert && introvert > extrovert && this.state.mostFrequent === '') {
      this.setState ({
        scoredQuiz: true,
        mostFrequent: "Introvert"
      })
    }
    if (extrovert > ambivert && extrovert > introvert && this.state.mostFrequent === '') {
      this.setState ({
        scoredQuiz: true,
        mostFrequent: "Extrovert"
      })
    }

    // if result is tied between two: 

    if (ambivert === introvert && ambivert > extrovert && introvert > extrovert && this.state.mostFrequent === '') {
      var randomNum = Math.random();
      if(randomNum < 0.5 && this.state.mostFrequent === '') {
        this.setState ({
          scoredQuiz: true,
          mostFrequent: "Ambivert"
        })
      }
      if(randomNum >= 0.5 && this.state.mostFrequent === '') {
        this.setState ({
          scoredQuiz: true,
          mostFrequent: "Introvert"
        })
      }
    }

    if (ambivert === extrovert && ambivert > introvert && extrovert > introvert && this.state.mostFrequent === '') {
      var randomNum = Math.random();
      if(randomNum < 0.5 && this.state.mostFrequent === '') {
        this.setState ({
          scoredQuiz: true,
          mostFrequent: "Ambivert"
        })
      }
      if(randomNum >= 0.5 && this.state.mostFrequent === '') {
        this.setState ({
          scoredQuiz: true,
          mostFrequent: "Extrovert"
        })
      }
    }

    if (introvert === extrovert && introvert > ambivert && extrovert > ambivert && this.state.mostFrequent === '') {
      var randomNum = Math.random();
      if(randomNum < 0.5 && this.state.mostFrequent === '') {
        this.setState ({
          scoredQuiz: true,
          mostFrequent: "Extrovert"
        })
      }
      if(randomNum >= 0.5 && this.state.mostFrequent === '') {
        this.setState ({
          scoredQuiz: true,
          mostFrequent: "Introvert"
        })
      }
    }
    fetch('/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    fetch('/quizreturn')
    .then(res => res.json())
    .then(res => this.setState({newNumber: res.finishedQuizzes}));
  }

  functionA = () => {
    if(this.state.currentQuestion < 7) {
      this.setState ({ 
        currentQuestion: this.state.currentQuestion + 1,
        score: [...this.state.score, questions[this.state.currentQuestion].choiceA.type]
      })
      console.log(this.state.score); 
    }
    else if(this.state.currentQuestion >= 7) {
      this.scoreQuiz(); 
    }
  }

  functionB = () => {
    if(this.state.currentQuestion < 7) {
      this.setState ({ 
        currentQuestion: this.state.currentQuestion + 1,
        score: [...this.state.score, questions[this.state.currentQuestion].choiceB.type]
      })
      console.log(this.state.score); 
    }
    else if(this.state.currentQuestion >= 7) {
      this.scoreQuiz(); 
    }
  }

  functionC = () => {
    if(this.state.currentQuestion < 7) {
      this.setState ({ 
        currentQuestion: this.state.currentQuestion + 1,
        score: [...this.state.score, questions[this.state.currentQuestion].choiceC.type]
      })
      console.log(this.state.score); 
    }
    else if(this.state.currentQuestion >= 7) {
      this.scoreQuiz(); 
    }
  }

  functionD = () => {
    if(this.state.currentQuestion < 7) {
      this.setState ({ 
        currentQuestion: this.state.currentQuestion + 1,
        score: [...this.state.score, questions[this.state.currentQuestion].choiceD.type]
      })
      console.log(this.state.score); 
    }
    else if(this.state.currentQuestion >= 7) {
      this.scoreQuiz(); 
    }
  }

// Different pages rendered depending on state values

  render() {
    if(this.state.quizAccess != true) {
      return(
        <div>
          <TopNavbar />
          <h1> You do not have access to this quiz.</h1>
          <h3> If you have not created an account, please do so.</h3>
          <h3> Once you do, complete <strong> 2 </strong> quizzes! </h3>
        </div>
      )
    }
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
            answerFunctions = {this.answerFunctions}
            functionA = {this.functionA}
            functionB = {this.functionB}
            functionC = {this.functionC}
            functionD = {this.functionD}
            functionLast = {this.functionLast} />
        </div>
      )
    }

    if (this.state.clickBegin === true && this.state.scoredQuiz === true) {
      if(this.state.newNumber != 2 || this.state.newNumber != 4) {
        return (
          <div>
            <TopNavbar />
              <EndScreen 
                currentQuestion = {this.state.currentQuestion}
                score = {this.state.score}
                mostFrequent = {this.state.mostFrequent}
                scoreQuiz = {this.scoreQuiz} 
                reset = {this.reset}
              />
          </div>
        )
      }
      if(this.state.newNumber === 2 || this.state.newNumber === 4) {
        return (
          <div>
            <TopNavbar />
              <NewRole />
              <EndScreen 
                currentQuestion = {this.state.currentQuestion}
                score = {this.state.score}
                mostFrequent = {this.state.mostFrequent}
                scoreQuiz = {this.scoreQuiz} 
                reset = {this.reset}
              />
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
    if (this.props.mostFrequent === "Ambivert") {
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
    if (this.props.mostFrequent === "Introvert") {
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
    if (this.props.mostFrequent === "Extrovert") {
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
  }
}
