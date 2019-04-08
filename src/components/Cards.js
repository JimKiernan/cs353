import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image } from 'semantic-ui-react'


const Cards =(props)=>{

		return (
		 
			 <Card centered >
			 	<Card.Content>
					<Card.Header>{props.title}</Card.Header>
					<Image alt = "img" src={props.image} />
					<Card.Description>{props.details}</Card.Description>
				</Card.Content>
			</Card>
			
		);
		
	

};


export default Cards;
