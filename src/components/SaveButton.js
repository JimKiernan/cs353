import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../firebase.js';
import Toast from './Toast';

 class SaveButton extends Component {
	constructor(props) {
    super(props);
     this.state = {
     	country: this.props.country,
     	city:this.props.city,
     	club:this.props.club,
     	name:this.props.name,
     	open:false,
     	

    };
     this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
  	 if (firebase.auth().currentUser !== null){
        this.setState({
             loggedin:true     
        }); 
      }else{
            this.setState({
              loggedin:false
        });
      }  
 }

  handleClick(e) {
  	e.preventDefault();
  	 this.setState({ open: true }); //for toast alert
  	 console.log(this.state.open);

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
			<div> 
			{
				(this.state.open===true && this.state.loggedin===true ) && (<div><Toast open={this.state.open} message="You have joined this club" /></div>)
			}
			
				 <Button color="primary" variant = "outlined" onClick={this.handleClick}>{this.props.buttonText}</Button>
				
			</div>
		);
	}

 }
 export default SaveButton;