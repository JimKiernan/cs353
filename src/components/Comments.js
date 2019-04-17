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
	    const countryRef = rootRef.child('Country').child(this.props.userCountry);
	    const cityRef = countryRef.child(this.props.userCity);
	    const activityRef = cityRef.child(this.props.userActivity);
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
         
            {this.state.result.map((item) => {
              return( 
              	<Segment>
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