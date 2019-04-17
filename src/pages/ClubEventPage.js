import React, { Component } from 'react';
import Comments from '../components/Comments';
import {Image, Segment} from 'semantic-ui-react';
import CommentBox from '../components/CommentBox';
import firebase from '../firebase.js';
import Announcements from '../components/Announcements';

class ClubEventPage extends Component {  

		constructor(props){
			super(props);
			this.state = {
				userCountry: this.props.location.state.userCountry,
				userCity: this.props.location.state.userCity,
				userActivity: this.props.location.state.userActivity,
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
			console.log("Inside club event page: " +this.state.userCountry, this.state.userCity, this.state.userActivity)
		}
		render() {
 
		    return (
		    	<div>
				    <div className="name">
				     	<Segment><h1> {this.state.name} </h1></Segment>
				    </div>
				     <Segment.Group horizontal>
				     	<Segment>
			        		<Image alt = {this.state.name} src={process.env.PUBLIC_URL + '/img/' + this.props.location.state.image} /> 
			        	</Segment>
			        	<Segment>
			        		<div><h3>Email: {this.props.location.state.email}</h3></div>
			        		<div><h3><a href={this.props.location.state.website}>Website</a></h3></div>
			        	</Segment>
			        	<Segment>              
			        		<Announcements userCountry={this.state.userCountry} userCity={this.state.userCity} userActivity={this.state.userActivity} />
						</Segment>
			        </Segment.Group>
			       
			        <div className="commentInput">
						<CommentBox userCountry = {this.state.userCountry} userCity={this.state.userCity} userActivity={this.state.userActivity} loggedin={this.state.loggedin} />
			        </div>
			         <div className="comments">
			        	<Segment><Comments userCountry = {this.state.userCountry} userCity={this.state.userCity} userActivity={this.state.userActivity} /></Segment>
			        </div> 
			    </div>
	        );
		}
}

export default ClubEventPage;