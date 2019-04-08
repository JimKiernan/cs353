import React, { Component } from 'react';
import Comments from '../components/Comments';
import {Image, Segment} from 'semantic-ui-react'

class ClubEventPage extends Component {  

		constructor(props){
			super(props);
		}
		render() {
 
		    return (

		    <div className="results">
		     	<h1> {this.props.name} </h1>
		    </div>
		     <div className="image" className="centre">
	        	<Image alt = "img" src={this.props.image} /> 
	        </div>
	        <div className="info">
	        	<Segment>{this.props.details}</Segment>
	        </div>
	        <div className="comments">
	        	
	        </div>

		}
}

export default ClubEventPage;