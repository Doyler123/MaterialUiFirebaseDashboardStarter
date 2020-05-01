import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import routes from '../../constants/routes';
import Loading from '../common/Loading';
import constants from '../../constants/constants';
import { auth } from '../../config/firebase/firebase';
import Alert from '@material-ui/lab/Alert';


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
  paper: {
    marginTop: theme.spacing(8),
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
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  alertMessage: {
    marginTop: '15px'
  }
}));

export default function SignIn({ loading }) {
  const classes = useStyles();

  const history = useHistory();

  const [ valid, setValid ] = useState(true);


  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const [ errorBar, setErrorBar ] = useState('');

  const onClickSignIn = () => {
    setValid(true)
    if(!!email && !!password){
        auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            history.push(routes.HOME)
        })
        .catch(error => {
            switch(error.code){
                case constants.ERRORS.FIREBASE.INVALID_EMAIL:
                case constants.ERRORS.FIREBASE.WRONG_PASSWORD:
                case constants.ERRORS.FIREBASE.USER_NOT_FOUND:
                    setErrorBar(constants.ERRORS.INVALID_LOGIN)
                    setValid(false)
                    break;
                default:
                    setErrorBar(error.message)
                    setValid(false)   
            }
        })
    }else{
        setValid(false)
    }
  }
  
  if(loading){
      return( <main id="mainContainer" className={classes.content}><Loading /></main> )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorBar ? <Alert className={classes.alertMessage} severity="error">{errorBar}</Alert> : null}
        <form className={classes.form} noValidate>
          <TextField
            value={email}
            onChange={(event) => {setEmail(event.target.value)}}
            error={!valid}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={(event) => {setPassword(event.target.value)}}
            error={!valid}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} onClick={(e) => {
                e.preventDefault();
                onClickSignIn();
            }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link 
                href="#" 
                variant="body2" 
                onClick={(e) => {
                    e.preventDefault();
                    history.push(routes.REGISTER)}
                }>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}