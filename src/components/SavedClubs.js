import React, { Component } from 'react';
import firebase from '../firebase.js';
import Cards from '../components/Cards';
import {  Container, Comment, Segment } from 'semantic-ui-react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class SavedClubs extends Component {
  constructor(){
    super();
    this.state = {
      result:[]
    }
  
  }

  componentDidMount(){

  	 //set up firebase
      const db = firebase.database();
      const rootRef = db.ref();
      const userListRef = rootRef.child('UserList'); 
      var newState = [];  
      //get id for current user if there is one
      if (firebase.auth().currentUser !== null){
         var userID = firebase.auth().currentUser.uid;
         console.log(userID);
         var userRef = userListRef.child(userID);
         var userRefKey = userListRef.child(userID).key;
         console.log(userRefKey);

         userRef.on('value', (snapshot) => {
          //var newState = [];
          let results = snapshot.val(); 
          console.log(results);
          for(let item in results){
              console.log("item is " + item);
              var ref = userRef.child(item);//gives ref to club
        
              ref.on("value", (snapshot) => {
               
                var country = snapshot.child("country").val();
                var city = snapshot.child("city").val();
                var name = snapshot.child("name").val();
                var activity = snapshot.child("activity").val();
                var email = snapshot.child("email").val();
                var image = snapshot.child("image").val();
                var location = snapshot.child("location").val();
                var website = snapshot.child("website").val();
                var linkname = name.replace(/\s/g, '');
			   
                newState.push({
                 country:country,
                 city:city,
                 name:name,
                 activity:activity,
                 email:email,
                 location:location,
                 image:image, 
                 website:website,
                 linkname: linkname
                
                });
                this.setState({
                  result: newState
                });
              });

           }
        });
      }

  }

  render(){
  	 let { result } = this.state; //es6 syntax; destructuring assignment

    return (

    <div className="joined">
        
         {
             result.length===0 && <div>You haven't joined any clubs yet</div>
         }
         { 
         result.length > 0 && (
         	<div>
         	<Container>
         	   <Typography style={{marginTop: 15}} variant="h5" gutterBottom>
	            Clubs you've joined
	       	  </Typography>
	         	<Container>
		         	<Grid container justify="center" spacing={Number(16)}>	                    
		             
		                {this.state.result.map((item) => {
		                  return (
		                  	 <Grid item spacing={32}>
		                    	<Cards name={item.name} country={item.country} city={item.city} activity={item.activity} link ={ `clubs/${item.linkname}` } email={item.email} location={item.location} website={item.website} image={item.image} />
		                   	</Grid>
		                   )
		                })}         
		              	              
		         	</Grid>  
		         </Container>
	         </Container>
	         </div>
     
      		)

   		}
   		</div>
   	);
   

	}
}
export default SavedClubs