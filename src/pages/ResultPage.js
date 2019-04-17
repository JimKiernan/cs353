import React, { Component } from 'react';
import firebase from '../firebase.js';
import { Card, Icon, Image, Segment } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import AccordionDisplay from '../components/Accordion';
import TopMenu from '../components/TopMenu';


class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      name: '', //key
      photo: '',
      website: '',
      location: '',
      description: '',
      email:'',
      phone: '',
      result: []
    }
    
  }
  
  componentDidMount() {

    const userCountry = this.props.location.state.userCountry;
    const userCity = this.props.location.state.userCity;
    const userActivity = this.props.location.state.userActivity;
    console.log(userCountry + userCity +userActivity);
    
    //set up firebase
    const db = firebase.database();
    const rootRef = db.ref();
    console.log("setting up DB");
    //get reference to keys
    const countryRef = rootRef.child('Country').child(userCountry);
    const cityRef = countryRef.child(userCity);
    const activityRef = cityRef.child(userActivity);

    //Query database, obtain results
    activityRef.on('value', (snapshot) => {
      var results = snapshot.val();
      console.log("results are " + snapshot.key);

      var newState = [];

      for (let item in results) {
        console.log("item is " + item);

        var ref = activityRef.child(item);//gives ref to club
        
        ref.on("value", (snapshot) => {
         
          var email = snapshot.child("Email:").val();
          var photo = snapshot.child("Photo:").val();
          var website = snapshot.child("Website:").val();
          var id = snapshot.child("id:").val();
          console.log("Email "+ email);

        newState.push({
          id: id,
          country: userCountry,
          city: userCity,
          activity: userActivity,
          name: item,
          photo: photo,
          email: email,
          website: website
          
          });
        this.setState({
            result: newState
          });
        });
             
      }
                    
    });
  }


render() {
  let { result } = this.state; //es6 syntax; destructuring assignment

    return (

    <div className="results">
     <h1> Results </h1>
     {
         result.length===0 && <div>No results found</div>
     }
     { 
     result.length > 0 && (
      <Container>
         
          <Segment raised>   
            {this.state.result.map((item) => {
              return (
                <AccordionDisplay country={item.country} city={item.city} activity={item.activity} key={item.id} title = {item.name} alt={item.photo}  image={item.photo} email={item.email} website={item.website} buttonText="Join" />
               )
            })}                
          </Segment> 
          
      </Container>)
    }
        </div>
      );
    }
  }
export default ResultPage;