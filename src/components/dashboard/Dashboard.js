/*global gtag*/

import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import RouteListItems from './RouteListItems'
import {useStateValue} from '../../state'
import Loading from '../common/Loading'
import constants from '../../constants/constants'
import routes from '../../constants/routes'
import { auth } from '../../config/firebase/firebase'
import UserIcon from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        LuttrellstownMenClub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    [theme.breakpoints.down('md')]: {
      paddingRight: '16px',
    }
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
  },
  fixedHeight: {
    height: 330,
  },
  fixedHeightHalf: {
    height: 145,
  },
  gridBoxes: {
    padding: 10
  },
  dateButton: {
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
    },
  }
}));

export default function Dashboard({children, compData, loading}) {
  
  const classes = useStyles();
  const history = useHistory();
  
  const [{ route, heading, mobile } ] = useStateValue();
  
  const [open, setOpen] = React.useState(!mobile);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userProfileOpen = Boolean(anchorEl);


  const toolbarVariant = "permanent";

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    auth().signOut().then(() => {
      history.push(routes.LOGIN);
    })
  }


  useEffect(()=>{
    setOpen(!mobile)
  }, [mobile])


  useEffect(()=>{
    let mainContainer = document.querySelector('#mainContainer')
    if(mainContainer){
      mainContainer.scrollTop = 0;
    } 
  }, [route, heading])
  

  return (
    <div className={classes.root}>
        
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, (open && !loading) && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, (open && !loading) && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {heading}
            </Typography>
            <div>
              <IconButton className={classes.dateButton} aria-label="profile" color="inherit" onClick={handleMenu}>
                <UserIcon style={!mobile ? {marginRight: 10} : {}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={userProfileOpen}
                onClose={handleProfileClose}
              >
                <MenuItem onClick={() => {}}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      {!loading ? 
      <React.Fragment>
        <Drawer
          variant={toolbarVariant}
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{<RouteListItems setOpen={setOpen} loading={loading}/>}</List>
        </Drawer>
        <main id="mainContainer" className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth={route === routes.ADD_COMP ? "xl" : "lg"} className={classes.container}>
            {children}
            <Box pt={4}>
              {/* <Copyright /> */}
            </Box>
          </Container>
        </main>
      </React.Fragment>
       : <main id="mainContainer" className={classes.content}><Loading /></main>}
    </div>
  );
}
