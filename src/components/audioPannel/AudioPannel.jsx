import React, { useRef, useState, useEffect } from 'react'
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { FaPause, FaPlay } from "react-icons/fa";
import { BsArrowRepeat, BsFillVolumeDownFill, BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import { RiPlayListFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { getCurrentSongIndex, getIsPlaying } from '../../selectors/selectors';



export const AudioPannel = ({ songsList, setCurrentSongIndex, setIsPlaying }) => {
   let isPlaying = useSelector(getIsPlaying);
   let currentSongIndex = useSelector(getCurrentSongIndex);
   const [curretSongTime, setCurrentSongTime] = useState('0 : 00');
   const [curretSongDuration, setCurrentSongDuration] = useState('0 : 00');
   const [rangeValue, setRangeValue] = useState(1);
   const audioRef = useRef(null);
   const progressRef = useRef(null);
   const volumeRef = useRef(null);

   useEffect(() => {
      if (isPlaying) {
         audioRef.current.play()
      } else {
         audioRef.current.pause();
      }
   }, [isPlaying]);

   useEffect(() => {
      audioRef.current.addEventListener("timeupdate", (e) => {
         const { currentTime, duration } = e.srcElement;
         let timeLasts = Math.floor(currentTime);
         if (duration) {
            let min_duration = Math.floor(duration / 60);
            let sec_duration = Math.floor(duration % 60);
            setCurrentSongDuration(`${min_duration} : ${sec_duration}`);
         }
         setCurrentSongTime(transformSongTime(timeLasts));
         let progressTime = (currentTime / duration) * 100;
         let progressBar = document.querySelector(".progress-bar");
         progressBar.style.width = `${progressTime}%`;
      });

      progressRef.current.addEventListener("click", (e) => {
         let { duration } = audioRef.current;
         let move_progress = (e.offsetX / e.srcElement.clientWidth) * duration;
         audioRef.current.currentTime = move_progress;
      });
   }, []);


   useEffect(() => {
      let volumeProgress = rangeValue / 100;
      audioRef.current.volume = `${volumeProgress}`;
   }, [rangeValue]);

   useEffect(() => {
      audioRef.current.onended = function () {
         setIsPlaying(false);
         switchSong(true);
         setIsPlaying(true);
      };
   }, [currentSongIndex]);

   const transformSongTime = (sec) => {
      if (sec < 60) {
         if (sec < 10) {
            return `0 : 0${sec}`
         } else {
            return `0 : ${sec}`
         }
      }
   }

   const switchSong = (forwards) => {
      if (forwards === true) {
         let temp = currentSongIndex;
         temp++;
         if (temp > songsList.length - 1) {
            temp = 0;
         }
         setCurrentSongIndex(temp);
         setIsPlaying(false);
         setTimeout(() => setIsPlaying(true), 200);
      } else {
         let temp = currentSongIndex;
         temp--;
         if (temp < 0) {
            temp = songsList.length - 1;
         }
         setCurrentSongIndex(temp);
         setIsPlaying(false);
         setTimeout(() => setIsPlaying(true), 200);
      }
   }
   return (
      <div className="audiopannel-container">
         <div className="audio-controls">
            <BsArrowRepeat />
            <AiOutlineStepBackward className="previous" onClick={() => switchSong(false)} />
            {isPlaying
               ? <div className="controls-play controls-pause">
                  <FaPause onClick={() => setIsPlaying(!isPlaying)} />
               </div>
               : <div className="controls-play">
                  <FaPlay className="play" onClick={() => setIsPlaying(!isPlaying)} />
               </div>

            }
            <AiOutlineStepForward className="next" onClick={() => switchSong(true)} />
         </div>
         <audio controls src={songsList.length > 0 ? songsList[currentSongIndex].url : ""} ref={audioRef}></audio>
         <div className="progress-area" ref={progressRef}>
            <span className="current-time">{curretSongTime}</span>
            <div className="progress-bar">
               <span></span>
            </div>
            <span className="total-time">{curretSongDuration}</span>
         </div>
         <div className="volume-container">
            {rangeValue < 1 ? <BsFillVolumeMuteFill /> : rangeValue > 90 ? < BsFillVolumeUpFill /> : < BsFillVolumeDownFill />}
            <div className="volume-area">
               <input ref={volumeRef} className="range" type="range" min="0" max="100" onChange={(e) => setRangeValue(e.target.value)} />
            </div>
         </div>
         <RiPlayListFill />
      </div>
   )
}
