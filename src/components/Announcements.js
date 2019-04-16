import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import firebase from '../firebase.js';

 class Announcements extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	current:'None yet for this group'
    }
    
  }

  render(){
  	return(
  		   <Message floating color='black'
  		   		header="Announcements"
  		   		content={this.state.current}

  		    />
  	);
  }
}
export default Announcements;