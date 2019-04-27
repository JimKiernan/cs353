import React, { Component } from 'react';
import '../App.css';
import './Profile.css';
import {BrowserRouter,Route, Link,Redirect} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import firebase from '../firebase.js';

const database = firebase.database().ref('/');

class Profile extends Component {


  constructor(props){

    super(props);

    this.state = {
        expanded: false,

        user: {
        },
        loader: true,
        alleventsCount: null,
        myeventsCount: null,
        

    }
    
}


componentDidMount(){
  if (firebase.auth().currentUser !== null){
        this.setState({
             loggedOut:false     
        }); 
  }else{
        this.setState({
          loggedOut:true
        });
  }
  
   let that = this;
  console.log(firebase.auth().currentUser);
    if (firebase.auth().currentUser !== null){
     
      database.child("users").child(firebase.auth().currentUser.uid).once("value", function(snapshot){
        console.log(snapshot.val());
        // snapshot.forEach(function(childSnapshot) {
        //     var obj = childSnapshot.val();
        //     obj.id = childSnapshot.key;

        //     allevents.push(obj);

        //   });

          that.setState({
            user: snapshot.val(),
          },()=>{
            console.log("Profile",that.state.user)
             that.setState({loader: false})
          });

        })

        database.child("myevents").child(firebase.auth().currentUser.uid).once("value", function(snapshot){
          const count = snapshot.numChildren();
          that.setState({myeventsCount: count})
        })

        database.child("events").once("value", function(snapshot){
          const count = snapshot.numChildren();
          that.setState({alleventsCount: count})
        })

      }        
  }
  
  render() {

   if(this.state.loggedOut === true){
      return <Redirect to= '/login' />
    } else{

    return (
        <div className="App">

        <Typography style={{marginTop: 15}} variant="h4" gutterBottom>
            Profile
        </Typography>

        <div class="container">

                    <div className="col-md-4" style={{width: '50%', margin: '0 auto', marginTop: 50}}>
                    <div className="profile-card text-center">

                        <div class="profile-info">

                        <img class="profile-pic" src="data:image/jpeg;base64,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" alt="profile"/>

                        <h2 class="hvr-underline-from-center">{this.state.user.fname} {this.state.user.lname}<span> </span><span>{this.state.user.email}</span></h2>
            
                        
                        <br/>
                        <div><span>Total Events:</span> {this.state.alleventsCount} </div>
                        <div><span>Events Followed:</span> {this.state.myeventsCount} </div>
                        <br/>
                        
                        </div>

                    </div>
                    </div>                 

                </div>
            </div>
    );
  }
  }
}

export default Profile;
