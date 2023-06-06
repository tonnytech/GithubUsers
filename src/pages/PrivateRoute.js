/* eslint-disable */

import React from 'react';
import { Navigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({childern}) => {
    const {isAuthenticated, user} = useAuth0();
    const {isUser} = isAuthenticated && user;
    if(!isUser) {
        return <Navigate to='login' />
    }
   return childern
};
export default PrivateRoute;
