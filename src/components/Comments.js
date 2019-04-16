import React, { Component } from 'react';
import firebase from '../firebase.js';
import { Card, Icon, Image, Container, Comment } from 'semantic-ui-react'


class Comments extends Component {
	constructor(props) {
	    super(props);
		this.state = {
		  uid: '',
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

	    //get reference to keys
	    const countryRef = rootRef.child('Country').child(userCountry);
	    const cityRef = countryRef.child(userCity);
	    const activityRef = cityRef.child(userActivity);
	    const commentsRef = activityRef.child('Comments'); 

	    //Query database, obtain results
	    commentsRef.on('value', (snapshot) => {
	      let results = snapshot.val();
	      console.log("results are " + snapshot.key);
	      
	          let newState = [];

	          for (let item in results) {
	            console.log("item is " + item);
	            newState.push({
	                username: results[item].author,
	                uid: item,
	                commentText: results[item].text,
	                postTime: results[item].time

	            });
	          }
	          this.setState({
	            result: newState
	          });	       
	   	 });
	}

	render(){
		let { result } = this.state;

		return (

		    <div className="results">
		    <h2> Comments </h2>
			{
				result.length===0 && <div><Segment>No comments yet</Segment></div>
		     }
		     { 
		        result.length > 0 && (
		         {result.map((item) => {
		         
		          return (

			         <Segment>
						<Comment>
							<Comment.Avatar></Comment.Avatar>
							<Comment.Content>
								<Comment.Author>{item.username}</Comment.Author>
								<Comment.Text>{item.commentText}</Comment.Text>
								<Comment.Metadata>{item.postTime}</Comment.Metadata>
							</Comment.Content>
						</Comment>
					</Segment>	
					)
				})}	
		        )
			}
			</div>
		);
	}
}
export default Comments;