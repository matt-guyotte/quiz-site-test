import React from React;

export default class APICall extends React.Component {
    constructor(props) {
        super(props)
        this.state ({
            finishedQuizzes: 0,
        })
        this.callAPI = this.callAPI.bind(this); 
    }

    callAPI() {
        fetch("localhost:9000/apifinishedquizzes")
            .then(res => res.text())
            .then(res => this.setState({finishedQuizzes: res}))
            .catch(err => err)
    }

    ComponentDidMount() {
        this.callAPI(); 
    }
}