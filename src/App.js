import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store/redux-state'
import { LoginPage } from './pages/LoginPage/LoginPage';
import { PreloadPage } from './pages/PreloadPage/PreloadPage';
import { getCurrentPlaylist, getCurrentSongIndex, getIsOPenMainPage, getIsPlaying, getReleaseTracks } from './selectors/selectors';
import { PlaylistsPage } from './pages/PlaylistsPage/PlaylistsPage';
import { SideMenu } from './components/sideMenu/sideMenu';
import './App.css';
import { actions } from './reducers/audio-reducer';
import { AudioPannel } from './components/audioPannel/AudioPannel';
import { HomePage } from './pages/HomePage/HomePage';
import { SinglePage } from './pages/SinglePage/SinglePage';
import { CategoryPlaylist } from './pages/CategoryPlaylist/CategoryPlaylist';


const App = () => {
  const isOpenMainPage = useSelector(getIsOPenMainPage);
  const songsList = useSelector(getCurrentPlaylist);
  let dispatch = useDispatch();
  const setCurrentSongIndex = (index) => {
    dispatch(actions.setCurrentSongIndex(index));
  }

  const setIsPlaying = (status) => {
    dispatch(actions.setIsPlaying(status));
  }

  const handleSongIndex = useCallback(
    (index) => {
      dispatch(actions.setCurrentSongIndex(index));
      dispatch(actions.setIsPlaying(true));
    },
    [],
  );
  if (isOpenMainPage) {
    return (
      <div className="main-container">
        <SideMenu />
        <AudioPannel
          songsList={songsList}
          setCurrentSongIndex={setCurrentSongIndex}
          setIsPlaying={setIsPlaying}
        />
        <Route exact path="/music" render={() => <HomePage />} />
        <Route exact path="/music/tracks" render={() => <SinglePage handleSongIndex={handleSongIndex} />} />
        <Route exact path="/music/category-playlist" render={() => <CategoryPlaylist />} />
        <Route path="/playlists" render={() => <PlaylistsPage handleSongIndex={handleSongIndex} />} />
      </div>
    )
  } else {
    return (
      <>
        <Route path="/login" render={() => <LoginPage />} />
        <Route path="/preload" render={() => <PreloadPage />} />
      </>
    )
  }
}

const AppContainer = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}
export default AppContainer;