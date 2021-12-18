import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../pages/PlaylistsPage/playlist.css';
import { getPlaylistTracksThunk } from '../../reducers/playlist-reducer';
import { getPlaylistSet } from '../../selectors/selectors';

export const Playlists = () => {
   let dispatch = useDispatch();
   let playlists = useSelector(getPlaylistSet);
   const handleGetCurrentTracks = (id) => {
      dispatch(getPlaylistTracksThunk(id));
   }
   return (
      <div className="playlist-content">
         {
            playlists.map(playlist => {
               return <div className="playlist" key={playlist.id} onClick={() => handleGetCurrentTracks(playlist.id)}>
                  <img src={playlist.image} alt="playlist" />
                  <div className="playlist-inform">
                     <h4>{playlist.name}</h4>
                     <p>Total tracks: {playlist.totalTracks}</p>
                  </div>
               </div>
            })
         }
      </div>
   )
}
