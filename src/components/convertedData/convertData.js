import { v4 as uuidv4 } from 'uuid';
export const convertPlaylistTracksData = (data) => {
   let playlist = [];
   data.items.forEach(item => {
      let song = {
         id: uuidv4(),
         name: item.track.name,
         artists: item.track.artists[0].name,
         type: item.track.artists[0].type,
         popularity: item.track.popularity,
         url: item.track.preview_url,
         album: {
            type: item.track.album.album_type,
            name: item.track.album.name,
            date: item.track.album.release_date,
            total: item.track.album.total_tracks,
         },
         images: item.track.album.images,
         limit: data.limit,
         total: data.total
      }
      return playlist = [...playlist, song];
   });
   return playlist;
}

export const convertPlaylistsData = (data) => {
   let playlistItem = [];
   data.forEach(item => {
      let playlistData = {
         id: item.id,
         name: item.name,
         image: item.images[0].url,
         totalTracks: item.tracks.total
      }
      return playlistItem = [...playlistItem, playlistData];
   });
   return playlistItem;
}

export const convertReleasesData = (data) => {
   let release = [];
   data.forEach(item => {
      let simpleRelease = {
         id: item.id,
         type: item.album_type,
         name: item.name,
         artists: item.artists[0].name,
         images: item.images
      }
      return release = [...release, simpleRelease];
   });
   return release;
}

export const convertReleaseTracksData = (data) => {
   let tracks = [];
   data.forEach(item => {
      let releaseTrack = {
         id: item.id,
         url: item.preview_url,
         name: item.name,
         artists: item.artists[0].name
      }
      return tracks = [...tracks, releaseTrack];
   });
   return tracks;
}

export const convertCategoriesData = (data) => {
   let categories = [];
   data.forEach(item => {
      let categoryItem = {
         id: item.id,
         name: item.name,
         url: item.icons[0].url
      }
      return categories = [...categories, categoryItem];
   });
   return categories;
}

export const convertCategoriesPlaylistData = (data) => {
   let categPlaylist = [];
   data.forEach(item => {
      let playlistItem = {
         id: item.id,
         name: item.name,
         url: item.images[0].url
      }
      return categPlaylist = [...categPlaylist, playlistItem];
   });
   return categPlaylist;
}