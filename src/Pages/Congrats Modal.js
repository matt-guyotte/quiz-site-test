import React from 'react'; 

import {Button} from 'react-bootstrap'; 
import {Modal} from 'react-bootstrap'; 


class NewRole extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            completedQuizzes: ''
        }
    }

    componentDidMount() {
        fetch('/api')
        .then(res => res.text())
        .then(res => this.setState({ completedQuizzes: res.finishedQuizzes }))
    }

    render() { 
        if (this.state.completedQuizzes === 2) {
            return (
                <div>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Congrats!</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Unlocked <strong> intermediate </strong> quizzes!.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            )
        }
        if (this.state.completedQuizzes === 4) {
            return (
                <div>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Congrats!</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Unlocked <strong> Advanced </strong> quizzes!.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            )
        }
        else {
            return null
        }
    }
}

export default NewRole; 