import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import firebase from '../firebase.js';

 class SaveButton extends Component {
	constructor(props) {
    super(props);
     this.state = {
     	country: this.props.country,
     	city:this.props.city,
     	club:this.props.club,
     	name:this.props.name

    };
     this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
  	console.log("In savebutton: " + this.props.country);
  }

  handleClick(e) {
  	e.preventDefault();

  	//set up firebase
	const db = firebase.database();
	const rootRef = db.ref();
	    
	//get reference to userList
	const userListRef = rootRef.child('UserList');	   
	//var test = userRef.child("user1").push("hello");
		
	//get id for current user if there is one
	if (firebase.auth().currentUser !== null){
	   var userID = firebase.auth().currentUser.uid;
	   console.log(userID);
	   var userRef = userListRef.child(userID);
	   var userRefKey = userListRef.child(userID).key;
	   console.log(userRefKey);

	   //create a saved section for user and get the key for this secion
	   // Create a new saved item for user and get a key for it
		var userCommentKey = userListRef.child(userID).key;		

		//Add the specific club/event to this new item		
		userRef.push({
			"country": this.props.country,
			"city": this.props.city,
			"activity": this.props.activity,
			"name":this.props.name, 
			"image": this.props.image,
			"website": this.props.website,
			"location":this.props.location,
			"email": this.props.email		
		});
	}
	
	
  }

	render(){

		return(
			<Button onClick={this.handleClick}>{this.props.buttonText}</Button>
		);
	}

 }
 export default SaveButton;