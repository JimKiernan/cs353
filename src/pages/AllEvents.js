import React, { Component } from 'react';
import '../App.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import CircularProgress from '@material-ui/core/CircularProgress';

import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

import firebase from '../firebase.js';

const database = firebase.database().ref('/');

const styles = {
    card: {
      maxWidth: '40%',
      //position: 'absolute',
      margin: '0 auto',
      marginBottom: '2%'
    },
    media: {
      height: 140,
    },
    actions: {
        display: 'flex',
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
  };

class AllEvents extends Component {
    constructor(props){

        super(props);

        this.state = {
            expanded: false,
            allevents: [],
            loader: true,
        }
    }

    componentDidMount(){
  
        let that = this;
        let allevents = [];


        database.child("events").on("value", function(snapshot){

            snapshot.forEach(function(childSnapshot) {
                var obj = childSnapshot.val();
                obj.id = childSnapshot.key;

                allevents.push(obj);

              });
              that.setState({
                allevents: allevents,
              },()=>{
                console.log("All Events",allevents)
                 that.setState({loader: false})
              });
            })
             
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
      };

      going = (uid, event) => {
        console.log("Going with", uid)
        let eventData = {
          title: event.title,
          desc: event.desc,
          date: event.date,
          venue: event.venue,
          organizer: event.organizer
        }
        database.child('myevents').child(uid).child(event.id).set(eventData)
        .then(()=>{
          //this.setState({ snackbar: true });
          alert("You joined the event!");
          // this.props.history.push("/allevents")
        })
      } 

      notGoing = () => {


      }
  render() {
    return (
        <div className="App">

            <Typography style={{marginTop: 15}} variant="h4" gutterBottom>
                All Events
            </Typography>

            <hr style={{width: '30%', marginBottom: '2%'}}/>
            

            {
                (this.state.loader === true) ?
                (<CircularProgress />) :
                (this.state.allevents.map((event, ind)=>{
                  console.log("aasds",event)
                    return <Card style={styles.card}>
                    <CardActionArea>
                        <CardMedia
                        style={styles.media}
                        // image={require("../images/event.jpg")}
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {event.title}
                        </Typography>
                        <Typography component="p" style={{marginBottom: 15}}>
                            {event.desc}
                        </Typography>
                        <Typography variant="button" align="center" style={{marginTop: 5}}>
                            <span style={{fontWeight: 'bold'}}>Organizer:</span> {event.organizer}
                        </Typography>
                        <Typography variant="button" align="center" style={{marginTop: 5}}>
                        <span style={{fontWeight: 'bold'}}>Venue:</span> {event.venue}
                        </Typography>
                        <Typography variant="button" align="center" style={{marginTop: 5}}>
                        <span style={{fontWeight: 'bold'}}>Date:</span> {event.date}
                        </Typography>
                        </CardContent>
                    </CardActionArea>

                            <CardActions disableActionSpacing>
                                <Button size="small" color="primary" onClick={this.going.bind(this, firebase.auth().currentUser.uid, event)}>
                                <CheckCircle color="primary" />
                                   Going
                                </Button>

                                <Button size="small" color="secondary">
                                <RemoveCircle color="secondary" />
                                   Not Going
                                </Button>
                            </CardActions>
                </Card>
                }))
            }


        </div>
    );
  }
}

export default AllEvents;
