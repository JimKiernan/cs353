import {BrowserRouter,Route, Link,Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const PrivateRoute = ({component: Component, loggedIn}) =>{
	return (
    <Route
     
      render={(props) => loggedIn === true
        ? <Component  />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
export default PrivateRoute