import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'


const Cards =(props)=>{

		return (		 
			 <Card centered >
			 	<Card.Content>
					<Link to={{
		              pathname:`${props.link}`,
		              state: {
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
            	<Card.Header>{props.name}</Card.Header></Link>
					<Card.Description>
					<div><img alt = {props.name} src={process.env.PUBLIC_URL + '/img/' + props.image} /></div>
					<div>{props.city}, {props.country}</div>
					
					<div>{props.activity}</div>
					</Card.Description>
				</Card.Content>
			</Card>
			
		);
};


export default Cards;
