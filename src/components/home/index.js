import React, { useEffect } from 'react';
import { useStateValue, actions } from '../../state';
import routes from '../../constants/routes';
import constants from '../../constants/constants';
import useSetRouteDetails from '../hooks/useSetRouteDetails'


const Home = () => {

    useSetRouteDetails(routes.HOME, constants.PAGE_HEADINGS.HOME)

    return(
        <div>
            Home
        </div>
    )
}

export default Home;