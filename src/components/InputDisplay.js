import React from 'react'
import { Input } from 'semantic-ui-react'

const InputExampleFocus = (props) => {

	
	return(
		<Input  focus className="form-input" name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
	);
} 
export default InputExampleFocus;