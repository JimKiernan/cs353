import React, { Component } from 'react';
import firebase from '../firebase.js';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import AccordionDisplay from '../Accordion';
import SegmentDisplay from '../SegmentDisplay';
import TopMenu from '../TopMenu';


class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userCountry: '',
      // userCity: '',
      // userActivity: '',

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
  onSearchSubmit(term1, term2, term3){

  }
  componentDidMount() {

    const userCountry = this.props.location.state.userCountry;
    const userCity = this.props.location.state.userCity;
    const userActivity = this.props.location.state.userActivity;
    console.log(userCountry)
    
    //set up firebase
    const db = firebase.database();
    const rootRef = db.ref();
    
    //get reference to keys
    const countryRef = rootRef.child('Country').child(userCountry);
    const cityRef = countryRef.child(userCity);
    const activityRef = cityRef.child(userActivity);

    //Query database, obtain results
    activityRef.on('value', (snapshot) => {
      let results = snapshot.val();
      console.log("results are " + snapshot.key);

      {/*  if(snapshot.numChildren()>1){ */}
          let newState = [];

          for (let item in results) {
            console.log("item is " + item);
            newState.push({
                id: results[item].id,
                name: item,
                photo: results[item].Photo,
                description: results[item].location

            });
          }
          this.setState({
            result: newState
          });
        {/* }
        else{
          this.setState({
            
            result: [ {name: results, photo:null, description: null}]
          } );
        } */}
        
    });
  }


render() {
  let { result } = this.state; //es6 syntax; destructuring assignment

    return (

    <div className="results">
     <h1> Results </h1>
     {
         result.length==0 && <div>No results found</div>
     }
     { 
         result.length > 0 && (
       <Container>
          <SegmentDisplay>
                
            {this.state.result.map((item) => {
              return (
                <AccordionDisplay key={item.id} title = {item.name} image={item.photo} details={item.description} />
                  )
            })}
                
              
          </SegmentDisplay>
         </Container>)
        }
        </div>
      );
    }
  }
export default ResultPage;