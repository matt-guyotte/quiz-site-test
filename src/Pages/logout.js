import React from "react";
import { Redirect } from 'react-router-dom';
import topNavbar from './navbar'; 

class logout extends React.Component {
    render() {
    return (<div> <topNavbar /> <Redirect to = "login" /> </div>)
    }
}

export default logout; 