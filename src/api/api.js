import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://api.spotify.com/v1/',
});

instance.interceptors.request.use(function (config) {
   const token = localStorage.getItem('client_token');
   config.headers.Authorization = token ? `Bearer ${token}` : '';
   return config;
});

export const MusicAPI = {
   getActualPlaylists() {
      return instance.get(`me/playlists`).then(res => res.data);
   },
   getActualPlaylistTracks(playlist_id) {
      return instance.get(`playlists/${playlist_id}/tracks`).then((res) => res.data);
   },
   getNewRelease() {
      return instance.get(`browse/new-releases`).then((res) => res.data);
   },
   getAlbumTracks(id) {
      return instance.get(`albums/${id}/tracks`).then((res) => res.data);
   },
   getCategoriesList() {
      return instance.get(`browse/categories`).then((res) => res.data);
   },
   getCategoriesTracks(category_id) {
      return instance.get(`browse/categories/${category_id}/playlists`).then((res) => res.data);
   }
}
