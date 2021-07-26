import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FaReact } from 'react-icons/fa';
import { FaNode } from 'react-icons/fa';
import { SiSocketDotIo } from 'react-icons/si';
import { SiMaterialUi } from 'react-icons/si';
import Typography from '@material-ui/core/Typography';
import Logo from '../../../utils/media/live-chat-logo.png'
import GoogleLog from '../google/GoogleLog'
import { makeStyles } from '@material-ui/core/styles';
import './LoginScreen.css'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    marginTop: "10rem",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginScreen() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="loginscreen__left-side">
        <img src={Logo} alt="" />
        <div className="icons">
          <FaReact className="icon"/>
          <FaNode className="icon-node"/>
          <SiSocketDotIo className="icon"/>
          <SiMaterialUi className="icon"/>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="loginscreen__right-side">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <GoogleLog className="googlelog"/>
        </div>
      </Grid>
    </Grid>
  );
}