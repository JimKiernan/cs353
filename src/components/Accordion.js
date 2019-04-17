import React, { Component } from 'react'
import { Accordion, Icon, Image, Segment } from 'semantic-ui-react'
import './Accordion.css'; 
import SaveButton from './SaveButton';
import { Link } from 'react-router-dom'
import Announcements from './Announcements';


export default class AccordionDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      title:this.props.title
    };
  }

  componentDidMount(){

    var str = this.props.title;
    
    str = str.replace(/\s/g, '');
    this.setState({
      title:str
    });
    console.log(this.props.title);

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
                 userCountry: this.props.country,  
                 userCity:this.props.city, 
                 userActivity:this.props.activity
                }

              }}>
              <h2>{this.props.title}</h2>
             </Link>
            </Segment>
            <Segment><SaveButton buttonText={this.props.buttonText} country={this.props.country} city={this.props.city} activity={this.props.activity} name={this.props.name} date={this.props.date} /></Segment>
          </Segment.Group>
       </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
	        <Segment.Group horizontal>
	        	<Segment> <img alt = {this.props.alt} src={process.env.PUBLIC_URL + '/img/' + this.props.image} /> </Segment>
	          
            <Segment>
              <Announcements userCountry={this.props.country} userCity={this.props.city} userActivity={this.props.activity} />
            </Segment>                          
	        </Segment.Group>
          <Segment><h3>Email: {this.props.email} </h3></Segment>   
          <Segment><h3><a href={this.props.website}>Website</a></h3></Segment>   
       </Accordion.Content>
       <Icon name='plus'  active={activeIndex === 0} index={0} onClick={this.handleClick} />

    </Accordion>
    );
  }
}

