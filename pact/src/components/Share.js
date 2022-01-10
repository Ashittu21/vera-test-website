import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";
const ICON_SIZE = 48;
export default ({
  url=process.env.REACT_APP_API_ADDRESS + window.location.pathname.replace("/",""),
  hideHeading=false
}) => (
  <div className="Share">
    {!hideHeading && <div className="footnote ff-sans">Share</div>}
    <div className="Share-inner">
      <FacebookShareButton url={url}>
        <FacebookIcon size={ICON_SIZE} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={ICON_SIZE} />
      </TwitterShareButton>
      <EmailShareButton url={url}>
        <EmailIcon size={ICON_SIZE} />
      </EmailShareButton>
    </div>
  </div>
)