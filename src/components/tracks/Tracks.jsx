import React, { useEffect } from 'react';
import { useRef } from 'react';
import { IoHeartCircleOutline } from "react-icons/io5";
import { BsMusicNoteBeamed } from "react-icons/bs";



const Tracks = ({ data, handleSongIndex, currentSongIndex }) => {
   console.log('track render');
   const scrollContainerRef = useRef(null);
   console.log(data);
   console.log(currentSongIndex);
   useEffect(() => {
      let currentTrack = document.querySelector(".active-song");
      if (currentTrack) {
         let trackPos = +currentTrack.offsetTop / 2 + 20;
         let scrollContainerHeight = +scrollContainerRef.current.offsetHeight;
         if (trackPos > scrollContainerHeight) {
            currentTrack.scrollIntoView({ behavior: "smooth" });
         } else {
            scrollContainerRef.current.scrollTop = "0";
         }
      }
   }, [currentSongIndex]);

   return (
      <div className="tracks-container" ref={scrollContainerRef}>
         {
            data.map((song, index) => {
               return (
                  <div key={song.id} className={currentSongIndex === index ? "active-song" : ""}>
                     <div className={song.url === null ? "tracks-content track-disabled" : "tracks-content"} onClick={() => handleSongIndex(index)}>
                        <p className="track-index">{index + 1}</p>
                        <div>
                           {song.images
                              ? <img src={song.images[2].url} alt="song" />
                              : <div className="song-icon">
                                 <BsMusicNoteBeamed />
                              </div>
                           }
                        </div>
                        <p className="track-name">{song.name}</p>
                        <p className="track-artist">{song.artists}</p>
                        {
                           song.type && <p className="track-type">{song.type}</p>
                        }
                        {
                           song.popularity && <p className="track-pop">{song.popularity}</p>
                        }
                        <div className="track-options">
                           <IoHeartCircleOutline />
                        </div>
                     </div>
                  </div>
               )
            })}
      </div>
   )
}

export const TracksMemoized = React.memo(Tracks);

