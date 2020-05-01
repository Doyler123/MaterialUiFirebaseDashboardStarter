import React, {createContext, useContext, useReducer} from 'react';

export const actions = {
    CHANGE_ROUTE: "changeRoute",
    CHANGE_HEADING: "changeHeading",
    SET_MOBILE: "setMobile"
}

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const defaultReducer = (state, action) => {
    switch(action.type){
      case actions.CHANGE_ROUTE:
        return {
          ...state,
          route: action.route
        }
      case actions.CHANGE_HEADING:
        return {
          ...state,
          heading : action.heading
        }
      case actions.SET_MOBILE:
        return {
          ...state,
          mobile: action.mobile
      }
      default:
          return state
    }
  }