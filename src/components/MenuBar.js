import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import NoteAdd from '@material-ui/icons/NoteAdd';
import CalendarToday from '@material-ui/icons/CalendarToday';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Dashboard from '@material-ui/icons/Dashboard'
import Toast from './Toast';
import { withRouter } from "react-router-dom";
import firebase from '../firebase.js';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    align: "right"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  loginButton: {
    alignItems: 'flex-end'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class MenuBar extends Component {
 
   constructor(props){
     super(props);
      this.state = {
        top: false,
        open:false
        
      };
      if (firebase.auth().currentUser !== null){
        this.state ={
             loggedOut:false         
        };
    } else{
      this.state={
             loggedOut:true       
        }
    }
    this.signOut = this.signOut.bind(this);

   }

   componentDidMount(){
      if (firebase.auth().currentUser !== null){
        this.setState({
             loggedOut:false     
        }); 
      }else{
        this.setState({
          loggedOut:true
        })
      }
   }
     

      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

      signOut = () => {
        firebase.auth().signOut()
        .then(()=>{
          this.props.history.push("/");
        });
        this.setState({open:true});
      }

    
  render() {
   
    
    return (
      <div className="MenuBar">
        {
          this.state.open===true && (<div><Toast open={this.state.open} message="You have logged out" /></div>)
        }    
      <AppBar position="static">
        <Toolbar>
        
          <Button color="inherit" variant="outlined"
            component={Link} to="/"  name='home'>
            Home
          </Button>
           <Button  color="inherit" component={Link} to="/login">
              Login
          </Button>

          <Button color="inherit"  component={Link} to="/dashboard">
              Dashboard
            </Button>
          <Button  color="inherit" component={Link} to="/profile" >
              Profile
          </Button>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}></Typography>
         
         
          <div>
            <Button  color="inherit" onClick={this.signOut}>
              Logout
            </Button>
          </div>
        </Toolbar> 
    </AppBar>
    </div>
 
       
    );
  }
}

export default withRouter(MenuBar);
