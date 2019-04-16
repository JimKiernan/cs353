import React, { Component } from 'react'
import { Accordion, Icon, Image, Segment } from 'semantic-ui-react'
import './Accordion.css'; 
import SaveButton from './SaveButton';



export default class AccordionDisplay extends Component {
	constructor(props) {
    super(props);
    this.state = {activeIndex: -1};
    console.log(props.children);
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
  	  <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          <Segment.Group horizontal>
            <Segment>{this.props.title}</Segment>
            <Segment><SaveButton country={this.props.country} city={this.props.city} activity={this.props.activity} name={this.props.name} date={this.props.date} /></Segment>
          </Segment.Group>
       </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
	        <Segment.Group horizontal>
	        	<Segment> <Image alt = {this.props.alt} src="../img/ex1.jpg" /> </Segment>
	          <Segment> <p>{this.props.details}</p></Segment>	         
	        </Segment.Group>
       </Accordion.Content>

    </Accordion>
    );
  }
}

