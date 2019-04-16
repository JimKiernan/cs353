import React, {Component} from 'react';
import firebase from '../firebase.js';
import ReactDOM from 'react-dom';
import { Button, TextArea } from 'semantic-ui-react'


export default class CommentBox extends Component{

	constructor(props){
		super(props);
		this.state = {
		  uid: '',
	      username: '',
	      commentText: '',      
	      postTime: ''
	    }

    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		 //set up firebase
	    const db = firebase.database();
	    const rootRef = db.ref();
	    
	    //get reference to keys
	    const countryRef = rootRef.child('Country').child(userCountry);
	    const cityRef = countryRef.child(userCity);
	    const activityRef = cityRef.child(userActivity);
	   //const commentRef = cityRef.child('Comments');

	}
	 handleChange=function(e,{value}){
     this.setState({commentText:value});
     console.log("state is: "+ this.state.commentText);
   }

	handleSubmit(e){
		 //set up firebase
	    const db = firebase.database();
	    const rootRef = db.ref();
	    
	    //get reference to keys
	    const countryRef = rootRef.child('Country').child(userCountry);
	    const cityRef = countryRef.child(userCity);
	    const activityRef = cityRef.child(userActivity);
	   //const commentRef = cityRef.child('Comments');

		 //create a new comment and obtain its key
	   	var newCommentKey = activityRef.child('Comments').push().key;

	   	// set the state variables
	   	// first set the userID variable
	   	if (firebase.auth().currentUser !== null){
	   		var userID = firebase.auth().currentUser.uid; //gets the user id property from the current user
	   		this.setState({
	      		uid: userID
	    	});
	    	//set the username variable
	    	rootRef.ref('/UserList/' + userId).once('value').then(function(snapshot) {
	  			var name = (snapshot.val() && snapshot.val().username) || 'Anonymous';
	  			this.setState({
	  				username:name
		    	});
  			}
	   	}
	   	//set the time comment was posted
	   	var date = new Date();
	   	var y = d.getFullYear();
	   	var m = d.getMonth() + 1;
	   	var d = d.getDate();
	   	var mins = d.getMinutes();
	   	var hour = d.getHours();
	   	var time = d + "/" + m + "/" + y +"/" + " " + hour + ":"+ mins;
 		this.setState({
  			postTime:time
	    });

	   //put the comment in the comments section of the club in Firebase
	   var comment = {
	   		author: this.state.username,
	   		uid: this.state.uid,
	   		text: this.state.commentText,
	   		time: this.state.postTime
	   };
	   var updates['/Comments/' + newCommentKey] = comment;
	   activityRef.update(updates);

	}


	render(){

		return(
			<div className="results">
				<Container>
		            <Form onSubmit={this.handleSubmit}>                 
		                <Form.Field>
		 				<TextArea name="comment" placeholder='Leave a comment' value={this.state.commentText} onChange={this.handleChange} />	
		 				<Button></Button>
		 				</Form.Field>
		 			</Form>
		 		</Container>
		 	</div>
	 	);
 	}

}
export default CommentBox;