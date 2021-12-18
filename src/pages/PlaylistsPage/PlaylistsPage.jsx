import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AudioPannel } from '../../components/audioPannel/AudioPannel';
import { Playlists } from '../../components/playlists/Playlists';
import { TracksMemoized } from '../../components/tracks/Tracks';
import { getPlaylistsThunk } from '../../reducers/playlist-reducer';
import { getCurrentPlaylist, getCurrentSongIndex, getIsLoadingData, getIsPlaying } from '../../selectors/selectors';
import { actions } from "../../reducers/audio-reducer";
import './playlist.css';

export const PlaylistsPage = ({ handleSongIndex }) => {
   const scrollContainerRef = useRef(null);
   let dispatch = useDispatch();
   useEffect(() => {
      dispatch(getPlaylistsThunk());
   }, []);
   let isLoading = useSelector(getIsLoadingData);
   let playlistItemData = useSelector(getCurrentPlaylist);
   let currentSongIndex = useSelector(getCurrentSongIndex);

   if (isLoading) {
      return (
         <div className="playlist-container">
            <div className="music-title">
               <h4>My playlists</h4>
            </div>
            <Playlists />
            <TracksMemoized data={playlistItemData}
               handleSongIndex={handleSongIndex}
               currentSongIndex={currentSongIndex}
               scrollContainerRef={scrollContainerRef}
            />
         </div>
      )
   } else {
      return <div>Loading ... </div>
   }
}


