import React from 'react';
import { Nav } from 'react-bootstrap';

class Test extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            testText: '',
            testPostText: ''
        }
        this.postFunction = this.postFunction.bind(this); 
        this.postPostFunction = this.postPostFunction.bind(this);

    }
    componentDidMount() {
        fetch('/test')
        .then(res => res.json())
        .then(res => this.setState({testText: res[0].finishedQuizzes}))
    }

    postFunction() {
        fetch('/test2', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'r@r', quizValue: 3 })
    })
}

    postPostFunction() {
        fetch('/test')
        .then (res => res.json())
        .then(res => this.setState({testPostText: res[0].finishedQuizzes}))
    }

    render() {
        return(
            <div>
                <h1> {this.state.testText} </h1>
                <button type = 'submit' onClick = {this.postFunction}> press me111111</button>
                <p> {this.state.testPostText} </p>
            </div>
        )
    }
}

export default Test;