import React from 'react'
import { Segment } from 'semantic-ui-react'

const SegmentDisplay = (props) =>{
	return (
	  <Segment raised>{props.children}</Segment>
	);
};

export default SegmentDisplay;