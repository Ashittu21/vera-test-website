import React, { useRef, useEffect, useState } from "react";
import "./AudioPlayer.css";
import Play from "./play.js";
import Pause from "./pause.js";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

const ppEvents = ['play','pause']

const formatTime = (time) => {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours ? (hours+':'):'') + minutes +':'+seconds;
}

export default ({ playerRef=useRef(), children, ...rest }) => {
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    ppEvents.forEach(function(e) {
      playerRef.current.addEventListener(e, ppListener);
    })
    playerRef.current.addEventListener("timeupdate", progressListener);
    playerRef.current.addEventListener("durationchange", durationListener);
    return function() {
      ppEvents.forEach(function(e) {
        playerRef.current.removeEventListener(e, ppListener);
      })
      playerRef.current.removeEventListener("timeupdate", progressListener);
      playerRef.current.removeEventListener("durationchange", durationListener);
    }
  }, [])

  function ppListener() {
    setPaused(playerRef.current.paused);
  }
  function progressListener() {
    setProgress(playerRef.current.currentTime)
  }
  function durationListener() {
    setDuration(playerRef.current.duration)
  }
  function onSliderChange(value) {
    playerRef.current.currentTime = value
  }
  function onPpClick() {
    if (paused) {
      playerRef.current.play()
    } else {
      playerRef.current.pause()
    }
  }
  return (
    <div className={`AudioPlayer bg--black color--white ${duration === 0 && 'AudioPlayer--loading'}`}>
      <button className="AudioPlayer-pp" onClick={onPpClick}>{paused ? <Play className="fill--white" /> : <Pause className="fill--white" />}</button>
      <div className="AudioPlayer-progress ff-sans">{formatTime(progress)}/{formatTime(duration)}</div>
      <Slider min={0} max={duration} value={progress} onChange={onSliderChange} />
      <audio ref={playerRef} {...rest}>{children}</audio>
    </div>
  )
}