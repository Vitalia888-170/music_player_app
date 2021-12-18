import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getPlaylistTracksThunk } from '../../reducers/playlist-reducer';
import { getCategoriesPlaylist } from '../../selectors/selectors';
import './categories.css';

export const CategoryPlaylist = () => {
   let dispatch = useDispatch();
   let playlists = useSelector(getCategoriesPlaylist);

   const handleGetPlaylist = (id) => {
      dispatch(getPlaylistTracksThunk(id));
   }
   return (
      <div className="categories-playlist">
         <div className="music-title">
            <h4>Playlist</h4>
         </div>
         <div className="categories-playlist-container">
            {
               playlists.map(item => {
                  return <div key={item.id} className="categories-playlist-content" onClick={() => handleGetPlaylist(item.id)}>
                     <NavLink to="/music/tracks">
                        <img src={item.url} alt="tracklist" />
                     </NavLink>
                     <h4>{item.name}</h4>
                  </div>
               })
            }
         </div>

      </div>
   )
}
