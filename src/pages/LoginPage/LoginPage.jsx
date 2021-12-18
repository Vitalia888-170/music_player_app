import React from 'react';
import { FaSpotify } from "react-icons/fa";
import './login.css';
const CLIENT_ID = "ad4128004aca4581b65a29e9da29bb49"; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/preload";
const SPACE_DELIMITER = "%20";
const SCOPES = [
   "user-read-currently-playing",
   "user-read-playback-state",
   "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);


export const LoginPage = () => {

   const handleLogin = () => {
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
   };

   return (
      <div className="container">
         Login page
         <div className="login-content">
            <FaSpotify className="login-content__logo" />
            <h3>Brief explanation</h3>
            <p>Through the Spotify Web API, external applications retrieve Spotify content such as album data and playlists. To access user-related data through the Web API, an application must be authorized by the user to access that particular information.</p>
            <button onClick={handleLogin}>Authorize via Spotify</button>
         </div>
      </div>
   )
}

