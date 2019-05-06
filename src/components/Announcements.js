import React, { Component } from 'react';
import { Message, Container } from 'semantic-ui-react';
import firebase from '../firebase.js';

 class Announcements extends Component {
	
 	constructor(props) {
	    super(props);
		this.state = {
			userCountry: this.props.userCountry,
			userCity: this.props.userCity,
			userActivity:this.props.userActivity,
			current:'None yet for this group'
	    }
	 }
	 componentDidMount() {
	 var announcement = this.state.current;
	  //set up firebase
	    const db = firebase.database();
	    const rootRef = db.ref();

	    //get reference to keys
	    var countryRef = rootRef.child('Country').child(this.state.userCountry);
	    var cityRef = countryRef.child(this.state.userCity);
	    var activityRef = cityRef.child(this.state.userActivity);
	   	
	    //Query database, obtain results
	    activityRef.on("value", function(snapshot) {
	    	 var results = snapshot.val();
	    	 for (let item in results) {
	    	 	var ref = activityRef.child(item);
	    		//var announcementsRef = ref.child("Announcements");
	    		ref.on("value", function(snapshot) {
	    			var ref2 = snapshot.child("Announcements/1");
	    			 announcement = ref2.val();
		    		
		    		console.log("Announcement is: "+ announcement);
		    	 });
		    	  
	    	}

	    });	 
	    if(announcement!==" " && announcement!==""){
		    this.setState({
				current: announcement
			});	  
		}
	    
	}

  render(){
  	return(
  		<Message  size='big' compact floating color='black'
  		   	header="Announcements"
  		   	content={this.state.current}
  		  /> 
  		  
  	);
  }
}
export default Announcements;