
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
	componentDidMount() {
		 //set up firebase
	    const db = firebase.database();
	    const rootRef = db.ref();
	    
	    //get reference to keys
	    const countryRef = rootRef.child('Country').child(this.props.userCountry);
	    const cityRef = countryRef.child(this.props.userCity);
	    const activityRef = cityRef.child(this.props.userActivity);
	   //const commentRef = cityRef.child('Comments');

	} 
	 handleChange=function(e,{value}){
     this.setState({commentText:value});
     console.log("state is: "+ this.state.commentText);
   }
   
	handleSubmit(e){
		e.preventDefault();
		 //set up firebase
	    const db = firebase.database();
	    const rootRef = db.ref();
	    
	    //get reference to keys
	    const countryRef = rootRef.child('Country').child(this.props.userCountry);
	    const cityRef = countryRef.child(this.props.userCity);
	    const activityRef = cityRef.child(this.props.userActivity);
	   //const commentRef = cityRef.child('Comments');


	   	// set the state variables
	   	// first set the userID variable
	   	if (firebase.auth().currentUser !== null){
	   		var userID = firebase.auth().currentUser.uid; //gets the user id property from the current user
	   		this.setState({
	      		uid: userID
	    	});
	    	//create a new section for comments in the club, and obtain its key	    	
		   	var commentsKey = activityRef.push().key;

			 //create a new comment and obtain its key
		   	var newCommentKey = activityRef.child(commentsKey).push().key;
	    	//set the username variable
	    	rootRef.ref('/UserList/' + userID).once('value', function(snapshot){
	  			var name = snapshot.val() && snapshot.val().username;
	  			this.setState({
	  				username:name
		    	});	  			
  			});
  			//set the time comment was posted
		   	var date = new Date();
		   	var y = d.getFullYear();
		   	var m = d.getMonth() + 1;
		   	var d = d.getDate();
		   	var mins = d.getMinutes();
		   	var hour = d.getHours();
		   	var time = d + "/" + m + "/" + y +"/" + " " + hour + ":"+ mins;
	 		this.setState({
	  			postTime:time
		    }); 			
  			

		   //put the comment in the comments section of the club in Firebase
		   var comment = {
		   		author: this.state.username,
		   		uid: this.state.uid,
		   		text: this.state.commentText,
		   		time: this.state.postTime
		   };
		   //var updates['/Comments/' + newCommentKey] = comment;
		   activityRef.child(commentsKey).update(comment);	   
		}
	}    
