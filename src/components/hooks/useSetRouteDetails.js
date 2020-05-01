import { useEffect } from 'react';
import { useStateValue, actions } from '../../state';

const useSetRouteDetails = (currentRoute, currentHeading) => {

    const [{ route, heading }, dispatch ] = useStateValue();

    useEffect(()=>{
        if(route !== currentRoute){
            dispatch({
                type: actions.CHANGE_ROUTE,
                route: currentRoute
            })
        }
        if(heading !== currentHeading){
            dispatch({
              type: actions.CHANGE_HEADING,
              heading: currentHeading
            })
        }
    })

}

export default useSetRouteDetails;
