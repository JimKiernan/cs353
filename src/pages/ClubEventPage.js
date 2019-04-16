import React, { Component } from 'react';
import Comments from '../components/Comments';
import {Image, Segment} from 'semantic-ui-react';
import CommentBox from '../components/CommentBox';
import firebase from '../firebase.js';

class ClubEventPage extends Component {  

		constructor(props){
			super(props);
			this.state = {
				userCountry: this.props.userCountry,
				userCity: this.props.userCity,
				userActivity: this.props.userActivity,
				name: this.props.location.state.name,
				loggedin:false
			}
		}

		componentDidMount(){
			if (firebase.auth().currentUser !== null){
				this.setState({
					loggedin:true
				});
			}
		}
		render() {
 
		    return (
		    	<div>
				    <div className="name">
				     	<Segment><h1> {this.state.name} </h1></Segment>
				    </div>
				     <div className="image" className="centre">
			        	<Image alt = {this.state.name} src={this.props.location.state.image} /> 
			        </div>
			        <div className="info">
			        	<Segment>{this.props.details}</Segment>
			        </div>
			       
			        <div className="commentInput">
						<CommentBox userCountry = {this.state.userCountry} userCity={this.state.userCity} userActivity={this.state.userActivity} loggedin={this.state.loggedin} />
			        </div>
			        {/* <div className="comments">
			        	<Segment><Comments userCountry = {this.state.userCountry} userCity={this.state.userCity} userActivity={this.state.userActivity} /></Segment>
			        </div> */}
			    </div>
	        );
		}
}

export default ClubEventPage;