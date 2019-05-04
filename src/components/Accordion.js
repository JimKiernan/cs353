import React, { Component } from 'react'
import { Accordion, Icon, Image, Segment } from 'semantic-ui-react'
import './Accordion.css'; 
import SaveButton from './SaveButton';
import { Link } from 'react-router-dom';
import Announcements from './Announcements';
import Toast from './Toast';
import firebase from '../firebase.js';


export default class AccordionDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      title:this.props.title,
      location: "See announcements for current training location",

    };
  }

  componentDidMount(){

    var str = this.props.title;
    
    str = str.replace(/\s/g, '');
    this.setState({
      title:str
    });
    console.log("location is " +this.props.location);
    if(this.props.location !== "Training Ground"){
      this.setState({
        location: this.props.location
      });
    } 

  }
  

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    return(
	  <Accordion>
  	  <Accordion.Title >
          <Segment.Group horizontal>
            <Segment>
            <Link to={{
              pathname:`/clubs/${this.state.title}`,
              state: {
                 name: this.props.title,
                 image: this.props.image,
                 email:this.props.email,
                 website:this.props.website,
                 location: this.state.location,
                 userCountry: this.props.country,  
                 userCity:this.props.city, 
                 userActivity:this.props.activity
                }

              }}>
              <h2>{this.props.title}</h2>
             </Link>
            </Segment>
            <Segment><SaveButton buttonText={this.props.buttonText} email={this.props.email} location={this.props.location} website={this.props.website} country={this.props.country} city={this.props.city} activity={this.props.activity} club={this.props.club} name={this.props.name} image={this.props.image}  /></Segment>
          </Segment.Group>
       </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
	        <Segment.Group horizontal>
	        	<Segment> <img alt = {this.props.alt} src={process.env.PUBLIC_URL + '/img/' + this.props.image} /> </Segment>
	          
            <Segment>
              <Announcements userCountry={this.props.country} userCity={this.props.city} userActivity={this.props.activity} />
            </Segment>                          
	        </Segment.Group>
          <Segment><h2>Email:</h2><h3> {this.props.email} </h3></Segment>   
          <Segment><h2><a target="_blank" href={"http://"+this.props.website}>Website</a></h2></Segment>   
          <Segment><h2>Location: </h2> <h3> {this.state.location} </h3></Segment>   

       </Accordion.Content>
       <Icon name='plus'  active={this.state.activeIndex} index={0} onClick={this.handleClick} />

    </Accordion>
    );
  }
}

