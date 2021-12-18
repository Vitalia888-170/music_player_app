import { MusicAPI } from "../api/api";
import { convertCategoriesData, convertCategoriesPlaylistData, convertReleasesData, convertReleaseTracksData } from "../components/convertedData/convertData";

const initialValue = {
   categories: [],
   currentCategoryPlaylist: [],
   releases: [],
   releaseImage: ""
}

export const mainReducer = (state = initialValue, action) => {
   switch (action.type) {
      case "SET-RELEASES":
         return {
            ...state,
            releases: action.release
         }
      case "SET-RELEASE-TRACKS":
         return {
            ...state,
            tracks: action.tracks
         }
      case "SET-RELEASE-IMAGE":
         return {
            ...state,
            releaseImage: action.image
         }
      case "SET-CATEGORIES":
         return {
            ...state,
            categories: action.categories
         }
      case "SET-CATEGORY_PLAYLIST":
         return {
            ...state,
            currentCategoryPlaylist: action.playlist
         }
      default:
         return state;
   }
}

export const actions = {
   setReleases: (release) => ({ type: "SET-RELEASES", release }),
   setReleaseTracks: (tracks) => ({ type: "SET-RELEASE-TRACKS", tracks }),
   setReleaseImage: (image) => ({ type: "SET-RELEASE-IMAGE", image }),
   setCategories: (categories) => ({ type: "SET-CATEGORIES", categories }),
   setCategoryPlaylist: (playlist) => ({ type: "SET-CATEGORY_PLAYLIST", playlist }),
}
export const getSeveralTracksThunk = () => {
   return async (dispatch) => {
      let data = await MusicAPI.getNewRelease();
      if (data) {
         console.log(convertReleasesData(data.albums.items));
         await dispatch(actions.setReleases(convertReleasesData(data.albums.items)));
         dispatch(getCategoriesThunk());
      }
   }
}

export const getCategoriesThunk = () => {
   return async (dispatch) => {
      let data = await MusicAPI.getCategoriesList();
      dispatch(actions.setCategories(convertCategoriesData(data.categories.items)));
      console.log(convertCategoriesData(data.categories.items));
   }
}

export const getCategoriesTracksThunk = (id) => {
   return async (dispatch) => {
      let data = await MusicAPI.getCategoriesTracks(id);
      dispatch(actions.setCategoryPlaylist(convertCategoriesPlaylistData(data.playlists.items)));
      console.log(convertCategoriesPlaylistData(data.playlists.items));
   }
}