import React from 'react';
import Fetcher from './Fetcher.js';
import { Link } from 'react-router-dom';
import { anchorize } from 'helpers';

const Nav = ({ isHome }) => {
  return (
    <Fetcher endpoint={`${process.env.REACT_APP_API_ADDRESS}gallerynav/${window.GALLERY_ID}.json`}>
      {({ heading, anchors }) => (
        <nav className="Nav bg--red color--white" style={{ height: "60px" }}>
          <div className="Nav-lockup">
            <a href="/"><img alt="Vera Institute of Justice" src={`${process.env.REACT_APP_API_ADDRESS}dist/img/logo_med-white.svg`} /></a>
            <NavItem
              isLink={isHome}
              to={window.GALLERY_BASENAME}
              className="Nav-heading size--body color--white">
              {heading}
            </NavItem>
          </div>
          <div className="Nav-links ff-sans">
            {anchors.map(anchor=> (
              <NavItem
                key={anchorize(anchor)}
                isLink={isHome}
                to={`${window.GALLERY_BASENAME}#${anchorize(anchor)}`}
                className="ff-sans--bold color--white">
                {anchor}
              </NavItem>
            ))}
          </div>
        </nav>
      )}
    </Fetcher>
  )
}
const NavItem = ({ isLink, to, children, ...rest }) => {
  return isLink ? (<a href={to} {...rest}>{children}</a>) : (<Link to={to} {...rest}>{children}</Link>)
}

export default Nav;