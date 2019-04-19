import React, { Component } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom';
import './App.css';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Container, Segment } from 'semantic-ui-react'
import AccordionDisplay from './components/Accordion';
import TopMenu from './components/TopMenu';
import FrontPage from './pages/FrontPage';
import ResultPage from './pages/ResultPage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import ClubEventPage from './pages/ClubEventPage';
import Authen from './components/Authen';

class App extends Component {  

  render() {
    return (
      <div className="App">
        <BrowserRouter>
           <div>
            <TopMenu />
             <Route path="/" exact component={FrontPage} />
             <Route path="/dashboard" exact component={DashboardPage} />
             <Route path="/events" exact component={EventsPage} />
             <Route path="/results" exact component={ResultPage} />
             <Route path="/clubs/:name" exact component={ClubEventPage} />
              <Route path="/login" exact component={Authen} />
            </div>
          </BrowserRouter>
         {/* <Authen />*/}

      </div>
    );
  }
 
}

export default App;
