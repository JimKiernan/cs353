import React, { Component } from 'react'
import { Accordion, Icon, Image } from 'semantic-ui-react'
import './Accordion.css'; 
import SaveButton from './SaveButton'


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
        {this.props.title}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
	        <div className="image" className="centre">
	        	<Image alt = {this.props.alt} src="../img/ex1.jpg" /> 
	        </div>
	        <div className="details">
	         <p>{this.props.details}</p>
	         </div>
	      <SaveButton />
        </Accordion.Content>

       </Accordion>
      );
   }
}

