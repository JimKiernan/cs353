import React, { Component } from 'react';
import Comments from '../components/Comments';
import {Image, Segment} from 'semantic-ui-react';
import CommentBox from '../components/CommentBox';

class ClubEventPage extends Component {  

		constructor(props){
			super(props);
		}
		render() {
 
		    return (

		    <div className="results">
		     	<Segment><h1> {this.props.name} </h1></Segment>
		    </div>
		     <div className="image" className="centre">
	        	<Image alt = "img" src={this.props.image} /> 
	        </div>
	        <div className="info">
	        	<Segment>{this.props.details}</Segment>
	        </div>
	       
	        <div className="commentInput">
				<CommentBox />
	        </div>
	         <div className="comments">
	        	<Segment><Comments /></Segment>
	        </div>

		}
}

export default ClubEventPage;