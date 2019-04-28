import React, { Component } from 'react';
import DropdownDisplay from '../components/DropdownDisplay';
import { Segment, Container, Form } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import InputDisplay from '../components/InputDisplay';
import {BrowserRouter,Route, Link,Redirect} from 'react-router-dom';
import ResultPage from './ResultPage';

 
const countryOptions = [
 
  { key: 'kh', value: 'Cambodia', flag: 'kh', text: 'Cambodia' },
  { key: 'cn', value: 'China', flag: 'cn', text: 'China' },
  { key: 'jp', value: 'Japan', flag: 'jp', text: 'Japan' },
  { key: 'vn', value: 'Vietnam', flag: 'vn', text: 'Vietnam' },
  { key: 'kr', value: 'South Korea', flag: 'kr', text: 'South Korea' },
  { key: 'hk', value: 'Hong Kong', flag: 'hk', text: 'Hong Kong' },
  { key: 'my', value: 'Malaysia', flag: 'my', text: 'Malaysia' },
  { key: 'id', value: 'Indonesia', flag: 'id', text: 'Indonesia' },
  { key: 'mm', value: 'Myanmar', flag: 'mm', text: 'Myanmar' },
  { key: 'sg', value: 'Singapore', flag: 'sg', text: 'Singapore' },
  { key: 'tw', value: 'Taiwan', flag: 'tw', text: 'Taiwan' },
  { key: 'ph', value: 'Philippines', flag: 'ph', text: 'Philippines' },
  { key: 'th', value: 'Thailand', flag: 'th', text: 'Thailand' },
  { key: 'in', value: 'India', flag: 'in', text: 'India' }
];
const activityOptions = [
 
  { key: 'GAA', value: 'GAA', text: 'GAA' },
  { key: 'Irish dancing', value: 'Irish dancing', text: 'Irish dancing' },
  { key: 'Irish music', value:'Irish music', text: 'Irish music' },
  { key: 'Irish language', value: 'Irish language', text: 'Irish language' },
];

class FrontPage extends Component {
  constructor() {
    super();
    this.state = {
      userCountry: '',
      userCity: '',
      userActivity: '',      
      result: [],
      toResults: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
     console.log("state is: "+ this.state.userCity);
  }
   handleCountryChange=function(e,{value}){
     this.setState({userCountry:value});
     console.log("state is: "+ this.state.userCountry);
   }

   handleActivityChange=function(e, {value}) {
    this.setState({
      userActivity: value
    });
     console.log("state is: "+ this.state.userCity);
  }
  handleSubmit(e) {
    e.preventDefault();
    const userCountry = this.state.userCountry;
    const userCity = this.state.userCity;
    const userActivity = this.state.userActivity;
    //need to check if the user has inputted values first
    this.setState({
      toResults: true
    });
  }    
  
  //call the results page <Results /> with prop this.state.userCity, userCountry & userAcitivity
  render() {

    if(this.state.toResults === true){
      return <Redirect to= {{
        pathname: '/results',
        state: {
          userCountry: this.state.userCountry,
          userCity: this.state.userCity,
          userActivity: this.state.userActivity
         }}
        }
      />
    }

    return (

      <div className='app'>
        <Container>
        <header>
            <div className="wrapper">
              <h1>Fáilte Asia</h1>
                             
            </div>
        </header>    
        </Container>   
               
        <Container>

          <Form onSubmit={this.handleSubmit}>
                 
            <Segment>
              <Form.Field>
                  <DropdownDisplay name="Enter your country" title="userCountry" options= {countryOptions} onChange={this.handleCountryChange} value={this.state.userCountry} />
              </Form.Field>
            </Segment>

                   
            <Segment>     
              <Form.Field>                  
                <InputDisplay name="userCity" placeholder='Enter your city' onChange={this.handleChange} value={this.state.userCity} />
              </Form.Field>
            </Segment>                  
                  
                    
            <Segment >
              <Form.Field>
                <DropdownDisplay name="Enter your activity" title="userActivity" options= {activityOptions} onChange={this.handleActivityChange} value={this.state.userActivity} />
              </Form.Field>
            </Segment>             
                              
            <Button color="primary" size="large" variant = "outlined" onClick={this.handleSubmit} >
              Search
            </Button>
          </Form>
        </Container>
       
      </div>
    );
  }
}
export default FrontPage;