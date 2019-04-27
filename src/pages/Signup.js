import React, { Component } from 'react';

import '../App.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import firebase from '../firebase.js';


const database = firebase.database().ref('/');
const styles = {
    card: {
        maxWidth: '40%',
        //position: 'absolute',
        margin: '0 auto',
        padding: 20
      },
    main: {
        width: 'auto',
        display: 'block', 
      },
      paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'none'
      },
      submit: {
      },
  };

class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            pass: "",
            fname: "",
            lname: "",
        }
    }

    loginGoogle = () => {
      let that = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        that.props.history.push("/");
      }).catch(function(error) {

      });
    }

    signup = () => {
        let that = this;
        console.log(this.state.email);
        console.log(this.state.pass);
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
        .then(function(user){
          //saving user to database

          let userData = {
            fname: that.state.fname,
            lname: that.state.lname,
            email: that.state.email,
          }
          database.child('users').child(user.user.uid).set(userData)
          .then(()=>{
            that.props.history.push("/");
          })

            
        })
        .catch(function(error) {
            console.log(error);
          });
      };

      inputHandler = (ev) => {
          this.setState({
              [ev.target.name]: ev.target.value
          })
      }

  render() {
    return (
        <div className="App">

    <Typography style={{marginTop: 15}} variant="h4" gutterBottom>
          Signup
      </Typography>

      <hr style={{width: '30%', marginBottom: '2%'}}/>

        <Card style={styles.card}>
        <CssBaseline />
        <Paper style={styles.paper}>
          <Avatar style={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Fill out this form to signup
          </Typography>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">FirstName</InputLabel>
              <Input id="fname" name="fname" autoComplete="email" value={this.state.fname} onChange={this.inputHandler.bind(this)} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">LastName</InputLabel>
              <Input id="lname" name="lname" autoComplete="email" value={this.state.lname} onChange={this.inputHandler.bind(this)} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={this.inputHandler.bind(this)} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="pass" type="password" id="pass" autoComplete="current-password" value={this.state.pass} onChange={this.inputHandler.bind(this)} />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={styles.submit}
              onClick={this.signup}
            >
              Sign Up
            </Button>

            <Button variant="contained" color="default" style={{marginTop: 15}} onClick={this.loginGoogle} >
              Signup with Google
              {/* <CloudUploadIcon style={{marginLeft: 3}}/> */}
            </Button>
            
        </Paper>
        </Card>
        </div>
    );
  }
}

export default Signup;
