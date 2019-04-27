import React, { Component } from 'react';
import {BrowserRouter,Route, Link, Redirect} from 'react-router-dom';
import './App.css';
import './pages/Profile.css';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Container, Segment } from 'semantic-ui-react'
import AccordionDisplay from './components/Accordion';
import TopMenu from './components/TopMenu';
import FrontPage from './pages/FrontPage';
import ResultPage from './pages/ResultPage';
import ClubEventPage from './pages/ClubEventPage';
import Authen from './components/Authen';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import MyEvents from './pages/MyEvents';
import AllEvents from './pages/AllEvents';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import MenuBar from './components/MenuBar';


class App extends Component {  

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          
         {/*   <TopMenu />*/}
         <MenuBar />
             <Route path="/" exact component={FrontPage} />
             <Route path="/dashboard" exact component={Dashboard} />
             <Route path="/results" exact component={ResultPage} />
             <Route path="/clubs/:name" exact component={ClubEventPage} />
             <Route path="/login" exact component={Login} />
             <Route path="/signup" exact component={Signup} />
             <Route exact path="/create" component={CreateEvent} />
            <Route exact path="/myevents" component={MyEvents} />
            <Route exact path="/allevents" component={AllEvents} />
            <Route exact path="/profile" component={Profile} />


           
          </BrowserRouter>

      </div>
    );
  }
 
}

export default App;
