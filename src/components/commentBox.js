import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Form, TextArea } from 'semantic-ui-react'


export default class commentBox extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount() {
		 //set up firebase
	    const db = firebase.database();
	    const rootRef = db.ref();
	    
	    //get reference to keys
	    const countryRef = rootRef.child('Country').child(userCountry);
	    const cityRef = countryRef.child(userCity);
	    const activityRef = cityRef.child(userActivity);
	   	const commentRef = cityRef.child('Comments');

	}
	render(){
 	<TextArea placeholder='Leave a comment' />	
 	}

}
export default commentBox;