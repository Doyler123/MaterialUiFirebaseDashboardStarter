import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStateValue, actions } from './state';
import { HashRouter, Route, Redirect } from "react-router-dom";
import routes from './constants/routes'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/signin/SignIn';
import SignUp from './components/signin/SignUp';
import { auth } from './config/firebase/firebase';
import Home from './components/home';


function App() {

  const [ state, dispatch ] = useStateValue();

  const theme = useTheme();
  const mobile = !useMediaQuery(theme.breakpoints.up('sm'));

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);


  auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  });

  useEffect(()=>{
    dispatch({
      type: actions.SET_MOBILE,
      mobile: mobile
    })
  }, [mobile]);

  const RequireAuth = ({ children }) => {
    if (!loggedIn) {
      return <Redirect to={routes.LOGIN} />;
    }
  
    return children;
  };


  return (
    <div className="App">
      <HashRouter>
        <Route exact={true} path={routes.LOGIN} render={() => <SignIn loading={loading}/>}/>
        <Route exact={true} path={routes.REGISTER} component={SignUp}/>
        <RequireAuth>
          <Dashboard loading={loading}>
            <Route exact={true} path={routes.LOGIN} render={()=> <Redirect from={routes.LOGIN} to={routes.HOME} /> }/>
            <Route path={routes.HOME} component={Home} />
          </Dashboard>
        </RequireAuth>
      </HashRouter>
    </div>
  );
}

export default App;
