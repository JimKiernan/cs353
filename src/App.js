import React, { Component } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom';
import './App.css';
import ex1 from './img/ex1.jpg';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Container, Segment } from 'semantic-ui-react'
import AccordionDisplay from './Accordion';

import TopMenu from './TopMenu';
import FrontPage from './components/FrontPage';
import ResultPage from './components/ResultPage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';

class App extends Component {  

  render() {
    return (
      <div className="App">
        <BrowserRouter>
           <div>
            <TopMenu />
             <Route path="/" exact component ={FrontPage} />
             <Route path="/dashboard" exact component = {DashboardPage} />
             <Route path="/events" exact component={EventsPage} />
             <Route path="/results" exact component ={ResultPage} />

            </div>
          </BrowserRouter>
                 

      </div>
    );
  }
 
}

export default App;
