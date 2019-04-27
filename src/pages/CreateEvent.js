import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import firebase from '../firebase.js';

const database = firebase.database().ref('/');


const styles = {
    card: {
      maxWidth: '40%',
      //position: 'absolute',
      margin: '0 auto',
      padding: 20
    },
    media: {
      height: 140,
    },
    snackbar: {
      position: 'absolute',
    },
  };

class CreateEvent extends Component {

  constructor(props){
    super(props);

    this.state = {
        title: "",
        desc: "",
        date: "",
        venue: "",
        organizer: "",

        snackbar: false
    }
}

inputHandler = (ev) => {
  this.setState({
      [ev.target.name]: ev.target.value
  })
}

handleClose = () => {
  this.setState({ 
    snackbar: false,
    title: "",
        desc: "",
        date: "",
        venue: "",
        organizer: "",
   });
};

  createEvent = () => {
    let event = {
      title: this.state.title,
      desc: this.state.desc,
      date: this.state.date,
      venue: this.state.venue,
      organizer: this.state.organizer
    }
    database.child('events').push(event)
    .then(()=>{
      this.setState({ snackbar: true });
      // this.props.history.push("/allevents")
    })
  }
  render() {
    return (
      <div className="App">

      <Typography style={{marginTop: 15}} variant="h4" gutterBottom>
          Create Event
      </Typography>

      <hr style={{width: '30%', marginBottom: '2%'}}/>

  <Card style={styles.card}>
    <Typography variant="h6" gutterBottom>
      Fillout the form to create an event
    </Typography>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="title"
          label="Event Name"
          fullWidth
          autoComplete="fname"
          value={this.state.title}
          onChange={this.inputHandler.bind(this)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="desc"
          label="Event Description"
          fullWidth
          autoComplete="lname"
          value={this.state.desc}
          onChange={this.inputHandler.bind(this)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address1"
          name="venue"
          label="Event Venue"
          fullWidth
          autoComplete="billing address-line1"
          value={this.state.venue}
          onChange={this.inputHandler.bind(this)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="address2"
          name="organizer"
          label="Event Organizer Name"
          fullWidth
          autoComplete="billing address-line2"
          value={this.state.organizer}
          onChange={this.inputHandler.bind(this)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
        type="date"
          required
          id="date"
          name="date"
          label="Event Date"
          fullWidth
          InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          value={this.state.date}
          onChange={this.inputHandler.bind(this)}
        />
      </Grid>
      <Grid item xs={12}>
        {/* <FormControlLabel
          control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        /> */}
        <Button variant="contained" color="primary" onClick={this.createEvent}>
          Create
      </Button>

      </Grid>
    </Grid>
    </Card>

       <Snackbar
            open={this.state.snackbar}
            autoHideDuration={4000}
            //onClose={this.handleClose}
            message={<span id="snackbar-fab-message-id">Event Created</span>}
            action={
              <Button color="inherit" size="small" onClick={this.handleClose}>
                OK
              </Button>
            }
            style={styles.snackbar}
          />
  </div>
    );
  }
}

export default CreateEvent;
