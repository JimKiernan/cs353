import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'


const Cards =(props)=>{

		return (		 
			 <Card  centered raised>
			 	<Card.Content>
			 		<Card.Header>          			 
           			 
						<Link to={{
			              pathname:`${props.link}`,
			              state: {
			              	id: props.key,
			                 name: props.name,
			                 image: props.image,
			                 email:props.email,
			                 website:props.website,
			                 location: props.location,
			                 userCountry: props.country,  
			                 userCity:props.city, 
			                 userActivity:props.activity
			                }
			            }}>			       
            	
            		{props.name}
            		</Link>            	 
			       </Card.Header>
					<Card.Description>
					<div><Image alt = {props.name} src={process.env.PUBLIC_URL + '/img/' + props.image} size="small" /></div>
					<div>{props.city}, {props.country} </div>
					
					<div>{props.activity}</div>
					</Card.Description>
				</Card.Content>
			</Card>
			
		);
};


export default Cards;
