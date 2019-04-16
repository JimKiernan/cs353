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
    console.log(props.children);
  }

  componentDidMount(){

    var str = this.props.title;
    var str2 = this.props.title;
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
           {/* need to put in userCountry, city and activty as props to the clubeventpage*/}
            <Segment>
            <Link to={{
              pathname:`/clubs/${this.state.title}`,
              state: {
                 name: this.props.title,
                 image: this.props.image
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

	        	<Segment> <Image alt = {this.props.alt} src={this.props.image} /> </Segment>
	          <Segment> <p>{this.props.details}</p></Segment>	 
            <Segment><Announcements /></Segment>
               
	        </Segment.Group>
       </Accordion.Content>
       <Icon name='plus'  active={activeIndex === 0} index={0} onClick={this.handleClick} />

    </Accordion>
    );
  }
}

