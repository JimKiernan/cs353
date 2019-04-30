import React, {Component} from 'react';
import firebase from '../firebase.js';
import ReactDOM from 'react-dom';
import {  TextArea, Container, Form } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';


export default class CommentBox extends Component{

	constructor(props){
		super(props);
		this.state = {
		  uid: '',
	      username: '',
	      useremail: '',
	      commentText: '',      
	      postTime: '',
	      name: this.props.name,
	      loggedin: this.props.loggedin
	    }
	    this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);

	}
	componentWillMount(){
		const db = firebase.database();
	    const rootRef = db.ref();
	    if (firebase.auth().currentUser){
	    	console.log(firebase.auth().currentUser);
	   		this.setState({
	   			loggedin:true
	   		});
	   		console.log("loggedin:" + this.state.loggedin);
	   }	
	   

	}
	componentDidMount() {
		 //set up firebase
	    const db = firebase.database();
	    const rootRef = db.ref();
	    
	    //get reference to keys
	    const countryRef = rootRef.child('Country').child(this.props.userCountry);
	    const cityRef = countryRef.child(this.props.userCity);
	    const activityRef = cityRef.child(this.props.userActivity);
	   //const commentRef = cityRef.child('Comments');

	   

	} 
	 handleChange=function(e,{value}){
     this.setState({commentText:value});
     console.log("state is: "+ this.state.commentText);
   }
   
	handleSubmit(e){
		e.preventDefault();
		 //set up firebase
	    const db = firebase.database();
	    const rootRef = db.ref();
	    
	    //get reference to keys
	    const countryRef = rootRef.child('Country').child(this.props.userCountry);
	    const cityRef = countryRef.child(this.props.userCity);
	    const activityRef = cityRef.child(this.props.userActivity);
	    const clubRef = activityRef.child(this.state.name); 
	   const commentsRef = clubRef.child("Comments");

	   	// set the state variables
	   	// first set the userID variable
	   	if (firebase.auth().currentUser !== null){
	   		var userID = firebase.auth().currentUser.uid; //gets the user id property from the current user
	   		this.setState({
	      		uid: userID
	    	});

	    	//create a new comment for the club, and obtain its key	    	
		   	var commentsKey = commentsRef.push().key;

	    	//set the username variable
	    	var name;
	    	var email;
	    	var user = firebase.auth().currentUser;
	    	if (user != null) {
 			 // name = user.displayName;
 			 // email = user.email;
 			 this.setState({
	  			username:"",
	  			
		    	}); 
 			}
 			console.log("name is "+ name);
	    	
  			//set the time comment was posted
		   	var date = new Date();
		   	var y = date.getFullYear();
		   	var m = date.getMonth() + 1;
		   	var d = date.getDate();
		   	var mins = date.getMinutes();
		   	var hour = date.getHours();
		   	var time = d + "/" + m + "/" + y +"/" + " " + hour + ":"+ mins;
	 		this.setState({
	  			postTime:time
		    }); 			
  			console.log(time);

		   //put the comment in the comments section of the club in Firebase
		   var comment = {
		   		author: this.state.username,
		   		
		   		uid: userID,
		   		text: this.state.commentText,
		   		time: time
		   };
		   //var updates['/Comments/' + newCommentKey] = comment;
		   commentsRef.child(commentsKey).update(comment);	   
		}
	}    



	render(){

		return(
			<div className="input">
			{
             this.state.loggedin===false && <div></div>
         	}
         	{ this.state.loggedin===true &&(
         	<div>
				<Container>
		            <Form >                 
		                <Form.Field>
		 				<TextArea disabled={false} name="comment" placeholder='Leave a comment' value={this.state.commentText} onChange={this.handleChange}  />	
		 				 <Button color="primary" size="large" variant = "outlined" onClick={this.handleSubmit} >Comment</Button>
		 				</Form.Field>
		 			</Form>
		 		</Container>
		 		</div>
		 	
		 	)		 	
		 }
		 </div>
	 	);
 	}

}
