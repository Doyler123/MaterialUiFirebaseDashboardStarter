import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import routes from '../../constants/routes';
import constants from '../../constants/constants';
import validator from 'email-validator';
import { auth } from '../../config/firebase/firebase';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {

  const classes = useStyles();

  const history = useHistory();

  const [ valid, setValid ] = useState(true);

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  
  const [ firstNameError, setFirstNameError ] = useState('');
  const [ lastNameError, setLastNameError ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ confirmPasswordError, setConfirmPasswordError ] = useState('');

  useEffect(()=>{
      if(password && password.length < 6){
          setPasswordError('Minimum 6 characters');
      }else{
          setPasswordError('');
      }
  }, [password])

  const onClickSignUp = () => {
    validateForm();
    if(valid){
        auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            userCredential.user.updateProfile({displayName: `${firstName} ${lastName}`}).then(() => {
                history.push(routes.Home)
            })
        })
        .catch(error => {
            switch(error.code){
                case constants.ERRORS.FIREBASE.EMAIL_IN_USE:
                    setEmailError(error.message)
                    break;
                case constants.ERRORS.FIREBASE.INVALID_EMAIL:
                    setEmailError(error.message)
                    break;
                case constants.ERRORS.FIREBASE.WEAK_PASSWORD:
                    setPasswordError(error.message)
                    break;
                default:
                
            }
        })
    }
  }

  const setError = (setFieldError, message) => {
    if(valid){
        setValid(false);
    }
    setFieldError(message);
  }

  const resetErrors = () => {
    setValid(true)
    setFirstNameError('')
    setLastNameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')
  }

  const validateForm = () => {
    resetErrors()
    if(!firstName || !lastName || !email || !password || !confirmPassword){
        !firstName && setError(setFirstNameError, constants.ERRORS.REQUIRED)
        !lastName && setError(setLastNameError, constants.ERRORS.REQUIRED)
        !email && setError(setEmailError, constants.ERRORS.REQUIRED)
        !password && setError(setPasswordError, constants.ERRORS.REQUIRED)
        !confirmPassword && setError(setConfirmPasswordError, constants.ERRORS.REQUIRED)
    }

    if(password && password !== confirmPassword){
        setError(setPasswordError, constants.ERRORS.PASSWORD_MATCH)
        setError(setConfirmPasswordError, constants.ERRORS.PASSWORD_MATCH)
    }

    if(email && !validator.validate(email)){
        setError(setEmailError, constants.ERRORS.EMAIL)
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={firstName}
                onChange={(event) => {setFirstName(event.target.value)}}
                error={!!firstNameError}
                helperText={firstNameError}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lastName}
                onChange={(event) => {setLastName(event.target.value)}}
                error={!!lastNameError}
                helperText={lastNameError}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(event) => {setEmail(event.target.value)}}
                error={!!emailError}
                helperText={emailError}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(event) => {setPassword(event.target.value)}}
                error={!!passwordError}
                helperText={passwordError}
                variant="outlined"
                required
                fullWidth
                name="password"
                label={"Password"}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={confirmPassword}
                onChange={(event) => {setConfirmPassword(event.target.value)}}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
                e.preventDefault();
                onClickSignUp();
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link 
                href="#" 
                variant="body2" 
                onClick={(e) => {
                    e.preventDefault();
                    history.push(routes.LOGIN)
                }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}