import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useStateValue, actions } from '../../state'
import routes from '../../constants/routes'
import { withRouter } from "react-router-dom";
import constants from '../../constants/constants'

const RouteListItems = withRouter(({history, setOpen, loading}) => {
  
  const [{ route, mobile }, dispatch ] = useStateValue();

  const onClickItem = (event, newRoute) => {
    event.preventDefault()
    if(mobile){
      setOpen(false)
    }
    history.push(newRoute)
    dispatch({
        type: actions.CHANGE_ROUTE,
        route: newRoute
    })
  }
  
  return (<div>
    <ListItem disabled={loading} button selected={route === routes.HOME} onClick={(e) => {onClickItem(e, routes.HOME)}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary={constants.PAGE_HEADINGS.HOME} />
    </ListItem>
  </div>)
});

export default RouteListItems