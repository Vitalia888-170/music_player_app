export const getIsOPenMainPage = (state) => {
   return state.auth.isOpen
}
export const getIsLoadingData = (state) => {
   return state.playlist.isLoading
}

export const getPlaylistSet = (state) => {
   return state.playlist.playlistSet;
}

export const getCurrentPlaylist = (state) => {
   return state.playlist.currentPlaylist;
}

export const getCurrentSongIndex = (state) => {
   return state.audio.currentSongIndex;
}

export const getIsPlaying = (state) => {
   return state.audio.isPlaying;
}

export const getSeveralReleases = (state) => {
   return state.main.releases;
}

export const getReleaseImage = (state) => {
   return state.main.releaseImage;
}

export const getReleaseTracks = (state) => {
   return state.main.tracks;
}
export const getIsTracks = (state) => {
   return state.main.isTracks;
}
export const getCategories = (state) => {
   return state.main.categories;
}
export const getCategoriesPlaylist = (state) => {
   return state.main.currentCategoryPlaylist;
}
