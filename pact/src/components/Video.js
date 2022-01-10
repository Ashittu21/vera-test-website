import React from "react";
import YouTube from "react-youtube";
import Vimeo from "react-vimeo";

export default ({ videoId, service }) => (
  <div className="Video block">
    <div className="iframe-wrapper">
      {service === "youtube" ? <YouTube videoId={videoId} /> : <Vimeo videoId={videoId} />}
    </div>
  </div>
)