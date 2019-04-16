import React from 'react';
import { Button } from 'semantic-ui-react';
import firebase from '../firebase.js';

 class SaveButton extends Component {
	constructor(props) {
    super(props);
    
  }

  handleClick(e) {
  	e.preventDefault();

  	//set up firebase
	const db = firebase.database();
	const rootRef = db.ref();
	    
	//get reference to userList
	const usersRef = rootRef.child('UserList');	   
  	
	//get id for current user if there is one
	if (firebase.auth().currentUser !== null){
	   var userID = firebase.auth().currentUser.uid;
	   var userRef = usersRef.child(userID);

	   // Create a new saved item for user and get a key for it
	 	var key = userRef.push().key;

		//Add the specific club/event to this new item
		var data =  {
			country: this.props.country,
			city: this.props.city,
			activity: this.props.activity,
			name:this.props.name, 
			date: this.props.date
		};
		userRef.child(key).update(data);
	}
  }

	render(){

		return(
			<Button onClick={this.handleClick}>{this.props.buttonText}</Button>
		);
	}

 }
 export default SaveButton;