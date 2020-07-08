import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import FrontPage from './Pages/FrontPage'; 
import login from './Pages/login';
import logout from './Pages/logout';
import register from './Pages/register';
import subscribe from './Pages/subscribe';
import profile from './Pages/profile';
import Test from './Pages/test'; 

import quiz1 from './Pages/quizzes/quiz1';
import quiz2 from './Pages/quizzes/quiz2';
import quiz3 from './Pages/quizzes/quiz3';
import quiz4 from './Pages/quizzes/quiz4';
import quiz5 from './Pages/quizzes/quiz5';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
      <Route exact path = "/" component = {FrontPage}/>
      <Route path = "/login" component = {login}/>
      <Route path = "/logout" component = {logout}/>
      <Route path = "/register" component = {register}/>
      <Route path = "/subscribe" component = {subscribe}/>
      <Route path = "/profile" component = {profile}/>
      <Route path = "/test" component = {Test}/>
      <Route path = "/quiz1" component = {quiz1}/>
      <Route path = "/quiz2" component = {quiz2}/>
      <Route path = "/quiz3" component = {quiz3}/>
      <Route path = "/quiz4" component = {quiz4}/>
      <Route path = "/quiz5" component = {quiz5}/>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
