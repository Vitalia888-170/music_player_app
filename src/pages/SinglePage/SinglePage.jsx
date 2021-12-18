import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCurrentSongIndex, getReleaseImage, getCurrentPlaylist } from '../../selectors/selectors';
import { TracksMemoized } from '../../components/tracks/Tracks';
import "./single.css";
import { getCurrentReleasesTracks } from '../../reducers/playlist-reducer';

const TracksBg = styled.div`
width:700px;
height:450px;
background: url(${props => props.image});
background-size:cover;
background-repeat:no-repeat;
filter:blur(20px);
position:absolute;
top:-200px;
left:0;
index:2;
opacity:0.6;
`;
const TracksImage = styled.div`
width:200px;
height:200px;
background: url(${props => props.image});
background-size:cover;
background-repeat:no-repeat;
z-index:5;
position:relative;
top:50px;
left:50px;
`;

export const SinglePage = ({ handleSongIndex }) => {
   let imageUrl = useSelector(getReleaseImage);
   let tracksList = useSelector(getCurrentPlaylist);
   let currentSongIndex = useSelector(getCurrentSongIndex);
   return (
      <div className="custom-tracks-container">
         <div className="music-title">
            <h4>Tracks</h4>
         </div>
         <div className="custom-track-content">
            <TracksImage image={imageUrl} />
            <TracksBg image={imageUrl} />
            <h4>{tracksList.length > 0 ? tracksList[0].artists : ""}</h4>
         </div>
         <TracksMemoized
            data={tracksList}
            handleSongIndex={handleSongIndex}
            currentSongIndex={currentSongIndex}
         />

      </div>
   )
}


