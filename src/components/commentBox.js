import React, {Component} from 'react';
import firebase from '../firebase.js';
import ReactDOM from 'react-dom';
import { Button, TextArea, Container, Form } from 'semantic-ui-react'


export default class CommentBox extends Component{

	constructor(props){
		super(props);
		this.state = {
		  uid: '',
	      username: '',
	      commentText: '',      
	      postTime: ''
	    }

	}



	render(){

		return(
			<div className="results">
				<Container>
		            <Form onSubmit={this.handleSubmit}>                 
		                <Form.Field>
		 				<TextArea disabled= {!this.props.loggedin} name="comment" placeholder='Leave a comment' value={this.state.commentText} onChange={this.handleChange} />	
		 				<Button>Comment</Button>
		 				</Form.Field>
		 			</Form>
		 		</Container>
		 	</div>
	 	);
 	}

}
