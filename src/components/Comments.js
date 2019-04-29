import React, { Component } from 'react';
import firebase from '../firebase.js';
import { Card, Icon, Image, Container, Comment, Segment } from 'semantic-ui-react'


class Comments extends Component {
	constructor(props) {
	    super(props);
		this.state = {
			userCountry: this.props.userCountry,
			userCity: this.props.userCity,
			userActivity:this.props.userActivity,
			name: this.props.name,
			uid: '',
			id:'',
		    username: '',
		    commentText: '',      
		    postTime: '',
		    result: []
	    }
	 }
	 componentDidMount() {
	  	//set up firebase
	    const db = firebase.database();
	    const rootRef = db.ref();
	    var newState = [];
	    //get reference to keys
	    const countryRef = rootRef.child('Country').child(this.props.userCountry);
	    const cityRef = countryRef.child(this.props.userCity);
	    const activityRef = cityRef.child(this.props.userActivity);
	    const clubRef = activityRef.child(this.state.name); 
	    const commentsRef = clubRef.child("Comments");
	    //Query database, obtain results
	    commentsRef.on('value', (snapshot) => {
	      //var newState = [];
	      let results = snapshot.val(); 
	      console.log(results);
	      
	      	if(this.state.result.length===0){ //load all comments
	      		for(let item in results){
			      	 console.log("item is " + item);
			      	 var comment = snapshot.child(item).child("text").val();
			      	 var uid = snapshot.child(item).child("uid").val();
			      	var author = snapshot.child(item).child("author").val();
			      	var time = snapshot.child(item).child("time").val();
		      		 newState.push({
				      	 	username: author,
				        	id: item,
				        	uid: uid,
				        	commentText: comment,
				       		postTime: time
				      	 	
				      	 });
				      	  this.setState({
				       		 commentText: comment,
				       		 result: newState
		       			});
			  }
			} else{ //load newest comment

				var length = Object.keys(results).length;
				console.log(length-1);
				var resultArray = Object.entries(results);
				var item = resultArray[length-1][0];
				console.log(item);
		      	 var comment = snapshot.child(item).child("text").val();
		      	 var uid = snapshot.child(item).child("uid").val();
		      	var author = snapshot.child(item).child("author").val();
		      	
		      	var time = snapshot.child(item).child("time").val();
		      	 newState.push({
			      	 	username: author,
			      	 	
			        	id: item,
			        	uid: uid,
			        	commentText: comment,
			       		postTime: time
			      	 	
			      	 });
			      	  this.setState({
			       		 commentText: comment,
			       		 result: newState
	       			});
		     }	      	
	 	            
	 });

	}

	render(){
		let { result } = this.state; //es6 syntax; destructuring assignment

	    return (

	    <div className="comments">
	     <h3> Comments </h3>
	     {
	         result.length===0 && <div>No comments yet</div>
	     }
	     {   

	      result.length > 0 && (
      		<Container>       
         
            {this.state.result.map((item, index) => {
              return( 
              	<Segment key={index}>
					<Comment>
						<Comment.Avatar></Comment.Avatar>
						<Comment.Content>
							<Comment.Author>{item.username}</Comment.Author>
							<Comment.Text>{item.commentText}</Comment.Text>
							<Comment.Metadata>{item.postTime}</Comment.Metadata>
						</Comment.Content>
					</Comment>
				</Segment>	)
				    })}       
      </Container>)
    	}
        </div>
      );
    }
 }
			     
export default Comments;