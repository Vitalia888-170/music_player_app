import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actions } from '../../reducers/auth-reducer';
import './preload.css';

const getReturnedParamsFromSpotifyAuth = (hash) => {
   const stringAfterHashtag = hash.substring(1);
   const paramsInUrl = stringAfterHashtag.split("&");
   const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
   }, {});
   return paramsSplitUp;
};
export const PreloadPage = () => {
   let dispatch = useDispatch();

   const usingUrlReceivedParams = () => {
      if (window.location.hash) {
         const { access_token } = getReturnedParamsFromSpotifyAuth(window.location.hash);
         if (access_token) {
            dispatch(actions.receiveToken(access_token));
            localStorage.setItem('client_token', access_token);
         } else {
            dispatch(actions.setAuthError('Something got wrong. Try to login again'));
         }
      }
   }
   useEffect(() => {
      usingUrlReceivedParams();
   }, []);

   const handleOpenPage = () => {
      dispatch(actions.setIsOpenPage(true));
   }
   return (
      <div className="container">
         <div className="preload-content">
            <h3>Welcome to your music app</h3>
            <NavLink to='/music' onClick={handleOpenPage}>Get started</NavLink>
         </div>
      </div>
   )
}


