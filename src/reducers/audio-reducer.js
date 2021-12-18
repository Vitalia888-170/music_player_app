import { MusicAPI } from "../api/api";
import { convertReleaseTracksData } from "../components/convertedData/convertData";

const initialState = {
   currentSongIndex: 0,
   isPlaying: false,

}
export const audioReducer = (state = initialState, action) => {
   switch (action.type) {
      case "SET-IS-PLAYING":
         return {
            ...state,
            isPlaying: action.isPlay
         }
      case "SET-CURRENT-SONG-INDEX":
         return {
            ...state,
            currentSongIndex: action.index
         }
      default:
         return state;
   }
}

export const actions = {
   setIsPlaying: (isPlay) => ({ type: "SET-IS-PLAYING", isPlay }),
   setCurrentSongIndex: (index) => ({ type: "SET-CURRENT-SONG-INDEX", index }),
}

export const getCurrentReleasesTracks = (id) => {
   return async (dispatch) => {
      let data = await MusicAPI.getAlbumTracks(id);
      dispatch(actions.setReleaseTracks(convertReleaseTracksData(data.items)));
      console.log(convertReleaseTracksData(data.items));
   }
}