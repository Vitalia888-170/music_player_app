import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCategoriesThunk, getCategoriesTracksThunk, getSeveralTracksThunk } from '../../reducers/main-reducer';
import { getCategories, getSeveralReleases } from '../../selectors/selectors';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./home.css";
import { useRef } from 'react';
import { actions } from '../../reducers/main-reducer';
import { NavLink } from 'react-router-dom';
import { getCurrentReleasesTracks } from '../../reducers/playlist-reducer';


export const HomePage = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getSeveralTracksThunk());
   }, []);
   let data = useSelector(getSeveralReleases);
   let categories = useSelector(getCategories);
   let releaseRef = useRef(null);
   let categoryRef = useRef(null);
   let contentReleaseRef = useRef(null);
   let contentCategoriesRef = useRef(null);

   const scrollToView = (scrollDirection, container, block) => {
      let elem = container.current.offsetWidth + 30;
      if (scrollDirection) {
         block.current.scrollBy(elem, 0);
      } else {
         block.current.scrollBy(-elem, 0);
      }
   }

   const handleGetReleaseTracks = (id, url) => {
      dispatch(actions.setReleaseImage(url));
      dispatch(getCurrentReleasesTracks(id));
   }

   const handleGetCategoriesTracks = (id) => {
      dispatch(getCategoriesTracksThunk(id))
   }
   return (
      <div className="release">
         <div className="music-title">
            <h4>New releases</h4>
         </div>
         <div className="music-main-list">
            <div className="release-container categories" ref={categoryRef}>
               <IoIosArrowBack className="arrow-prev" onClick={() => scrollToView(false, categoryRef, contentCategoriesRef)} />
               {categories.map(item => {
                  return <div className="release-content " key={item.id} ref={contentCategoriesRef} onClick={() => handleGetCategoriesTracks(item.id)}>
                     <NavLink to="/music/category-playlist">
                        <img src={item.url} alt="release" />
                     </NavLink>
                     <h4>{item.name}</h4>
                  </div>
               })}
               <IoIosArrowForward className="arrow-next" onClick={() => scrollToView(true, categoryRef, contentCategoriesRef)} />
            </div>
         </div>
         <div className="music-main-list">
            <div className="release-container" ref={releaseRef}>
               <IoIosArrowBack className="arrow-prev" onClick={() => scrollToView(false, releaseRef, contentReleaseRef)} />
               {data.map(item => {
                  return <div className="release-content" key={item.id} ref={contentReleaseRef} onClick={() => handleGetReleaseTracks(item.id, item.images[0].url)}>
                     <NavLink to="/music/tracks">
                        <img src={item.images[1].url} alt="release" />
                     </NavLink>
                     <h4>{item.name}</h4>
                  </div>
               })}
               <IoIosArrowForward className="arrow-next" onClick={() => scrollToView(true, releaseRef, contentReleaseRef)} />
            </div>
         </div>
      </div>
   )
}
