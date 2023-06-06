/* eslint-disable */

import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();


const GithubProvider = ({children}) => {

    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers)
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState({show: false, msg: ''});

    const searchGithubUser = async (user)=> {
        toggleError()
        setIsloading(true)
        const responce = await axios(`${rootUrl}/users/${user}`).catch ((error)=> console.log(error))
        if(responce) {
            setGithubUser(responce.data)
            const {login, followers_url} = responce.data;
            //repos
            axios(`${rootUrl}/users/${login}/repos?per_page=100`).then (responce => setRepos(responce.data));

            //followers

            axios(`${followers_url}?per_page=100`).then (responce => setFollowers(responce.data));
            // [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
            // [Followers](https://api.github.com/users/john-smilga/followers)
        }
        else {
            toggleError(true, 'there is no user with that user name')
        }
         checkRequests();
         setIsloading(false);
    }


    //check rate
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`).then(({data})=> {
            
            let {
                rate: {remaining },
            } = data;
            
            setRequests(remaining);

            if(remaining === 0) {
                toggleError(true, 'sorry hourly rate exceeded')
            }
        }).catch ((error)=> console.log(error))
    }

    function toggleError (show = false, msg = '') {
        setError({show, msg})
    }
    // request loading
    useEffect(
        checkRequests,[]
        )
    
    // error

    
    return <GithubContext.Provider value={{githubUser,repos,followers, requests, error, searchGithubUser, isLoading}}>
        {children}
    </GithubContext.Provider>
};


export {GithubProvider, GithubContext};
