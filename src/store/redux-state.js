import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "../reducers/auth-reducer";
import playlistReducer from "../reducers/playlist-reducer";
import thunkMiddleware from "redux-thunk";
import { audioReducer } from "../reducers/audio-reducer";
import { mainReducer } from "../reducers/main-reducer";

let rootReducers = combineReducers({
   playlist: playlistReducer,
   auth: authReducer,
   audio: audioReducer,
   main: mainReducer
});

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default store;