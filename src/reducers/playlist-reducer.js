import { MusicAPI } from "../api/api"
import { convertCategoriesPlaylistData, convertPlaylistsData, convertPlaylistTracksData, convertReleaseTracksData } from "../components/convertedData/convertData"

const initialState = {
   playlistSet: null,
   currentPlaylist: [],
   isLoading: false,
}

const playlistReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'SET-PLAYLISTS':
         return {
            ...state,
            playlistSet: action.playlists
         }
      case 'SET-CURRENT-PLAYLIST':
         return {
            ...state,
            currentPlaylist: action.playlistItem
         }
      case 'SET-IS-LOADING':
         return {
            ...state,
            isLoading: action.isLoading
         }
      default:
         return state;
   }
}

export const actions = {
   setPlaylists: (playlists) => ({ type: 'SET-PLAYLISTS', playlists }),
   setCurrentPlaylist: (playlistItem) => ({ type: 'SET-CURRENT-PLAYLIST', playlistItem }),
   setIsLoading: (isLoading) => ({ type: 'SET-IS-LOADING', isLoading }),
}

export const getPlaylistsThunk = () => {
   return async (dispatch) => {
      dispatch(actions.setIsLoading(false));
      let data = await MusicAPI.getActualPlaylists();
      if (data) {
         dispatch(actions.setPlaylists(convertPlaylistsData(data.items)));
         let actualPlaylists = convertPlaylistsData(data.items);
         let playlistId = actualPlaylists[1].id;
         await dispatch(getPlaylistTracksThunk(playlistId));
         dispatch(actions.setIsLoading(true));
      }
   }
}

export const getPlaylistTracksThunk = (playlistId) => {
   return async (dispatch) => {
      let data = await MusicAPI.getActualPlaylistTracks(playlistId);
      if (data) {
         dispatch(actions.setCurrentPlaylist(convertPlaylistTracksData(data)));
      }
   }
}

export const getCurrentReleasesTracks = (id) => {
   return async (dispatch) => {
      let data = await MusicAPI.getAlbumTracks(id);
      dispatch(actions.setCurrentPlaylist(convertReleaseTracksData(data.items)));
      console.log(convertReleaseTracksData(data.items));
   }
}


export default playlistReducer;


