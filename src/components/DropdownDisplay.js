import React from 'react'
import { Dropdown, Flag, Segment } from 'semantic-ui-react'


const DropdownDisplay = (props) => {

  return(
    <div className="dropdown">
      <Dropdown
        placeholder = {props.name}
        title = {props.title}
         value = {props.value}
        fluid
        search
        selection
        options={props.options}
        onChange={props.onChange}
      />
    </div>
       
  );
}

export default DropdownDisplay;

