import React, { useState, useRef } from "react";
import Fetcher from './Fetcher.js';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import Grid from "./Grid.js";
import { Waypoint } from "react-waypoint";
import { useSpring, useChain, animated } from "react-spring"
import { anchorize } from 'helpers';
import Video from "./Video.js";
import Share from "./Share.js";

import Modal from 'react-modal';
Modal.setAppElement('#root')

configureAnchors({offset: -60 })

const Home = ({ match }) => {
  const [animate,setAnimate] = useState(false);

  const fadeVideoRef = useRef()
  const [videoStyle,setVideoStyle] = useSpring(() => ({
    from: {
      opacity: 0
    },
    ref: fadeVideoRef
  }))
  setVideoStyle({
    opacity: animate ? 1 : 0
  })


  const titleRef = useRef()
  const [titleStyle,setTitleStyle] = useSpring(() => ({
    from: {
      opacity: 0
    },
    ref: titleRef
  }))
  setTitleStyle({
    opacity: animate ? 1 : 0
  })

  useChain(animate ? [fadeVideoRef, titleRef] : [titleRef,fadeVideoRef],[0,.5,1])

  return (
    <Fetcher endpoint={`${process.env.REACT_APP_API_ADDRESS}gallery/${window.GALLERY_ID}.json`}>
      {(data) => (
        <div className="Home ff-serif bg--black">
          <Waypoint
            onEnter={() => {
              setAnimate(true)
            }}
            onLeave={()=> {
              setAnimate(false)
            }}>
            <section className="Home-splash">
              <animated.div style={videoStyle}>
                <div className="background-screen" />
                <video className="background-video" muted autoPlay loop>
                  <source src={data.videoUrl} />
                </video>
              </animated.div>
              <div className="Home-splash-inner block--small color--white">
                <h1 className="Home-splash-title-heading size--headerxl ff-sans--bold uppercase">
                  {data.heading.split(" ").map((d,i)=><span key={d+i}>{d + " "}</span>)}
                </h1>
                <animated.div
                  style={titleStyle}
                  className="Home-splash-title-subheading size--body ff-sans">
                  {data.subheading}
                </animated.div>
                <animated.div
                  style={titleStyle}
                  className="Home-splash-links ff-sans--bold color--white">
                  {data.anchors.map(anchor => <a className="Home-splash-link color--white hover-bg--red" key={anchorize(anchor)} href={`#${anchorize(anchor)}`}>{anchor}</a>)}
                </animated.div>
                <animated.div
                  style={titleStyle}
                  className="Home-splash-share">
                  <Share hideHeading />
                </animated.div>
              </div>
            </section>
          </Waypoint>
          {data.blocks.map(({ component, id, anchor, ...rest }) => {
            let inner;
            switch (component) {
              case 'TextSection':
                inner = <div key={id}>
                  <TextSection {...rest} />
                </div>
                return anchor ? <ScrollableAnchor key={id} id={anchorize(anchor)}>
                  {inner}
                </ScrollableAnchor> : inner
              case 'Grid':
                inner = <div key={id}>
                  <Grid items={data.children} hideShare />
                </div>
                return anchor ? <ScrollableAnchor key={id} id={anchorize(anchor)}>
                  {inner}
                </ScrollableAnchor> : inner
              default:
                return null;
            }
          })}

        </div>
      )}
    </Fetcher>
  )
}

export default Home;

const TextSection = ({ backgroundImage, blocks }) => {
  return (
      <section className="Home-splash-section bg--black color--white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'fixed',
          position: 'relative'
        }}>
        {backgroundImage && <div className="background-screen bg--red" />}
        <div className="block block--small">
          {blocks.map(block => {
            switch (block.component) {
              case 'Heading':
                return <Heading key={block.id} {...block} />
              case 'Text':
                return <div key={block.id} className="rte block ff-sans size--body" dangerouslySetInnerHTML={{ __html: block.text }} />
              case 'Ctas':
                return <div key={block.id} className="Home-splash-ctas Home-splash-links ff-sans--bold">
                  {block.blocks.map(block => {
                    switch (block.component) {
                      case "LinkOut":
                        return <a key={block.id} className="Home-splash-link color--white hover-bg--red" href={block.url}>{block.text}</a>

                      case "VideoModal":
                        return <VideoModal
                          key={block.id}
                          text={block.text}
                          videoId={block.videoId}
                          service={block.service} />

                      default:
                        return null;
                    }
                  })}
                </div>

              case 'List':
                return <div key={block.id} className="Home-splash-list">
                  {block.blocks.map(item => {
                    switch (item.component) {
                      case 'ListItem':
                        return <div className="Home-splash-list-item border-color--red" key={item.id}>
                          {item.blocks.map(block => {
                            switch (block.component) {
                              case 'Heading':
                                return <div
                                  key={block.id}
                                  className="ff-sans stroke-text--thin size--h2 Home-splash-list-heading"
                                  dangerouslySetInnerHTML={{ __html: block.text }} />
                              case 'Text':
                                return <div
                                  key={block.id}
                                  className="Text ff-sans size--body"
                                  dangerouslySetInnerHTML={{ __html: block.text }} />
                              default:
                                return null;
                            }
                          })}
                          </div>

                      case 'Heading':
                        return <Heading key={item.id} {...item} />
                      default:
                        return null
                    }})}
                </div>

              default:
                return null;
            }
          })}
        </div>
      </section>
  )
}

const Heading = block => <h2 className="Home-splash-heading size--headerxl" dangerouslySetInnerHTML={{ __html: block.text }} />


const VideoModal = ({ videoId, text, service   }) => {
  const [isOpen,setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  return (<>
    <button
      className="Home-splash-link color--white hover-bg--red"
      onClick={openModal}>
      {text}
    </button>
    <Modal
      style={{
        overlay: {
          zIndex: 4
        },
        content: {
          backgroundColor: 'transparent',
          borderRadius: 0,
          border: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0
        }
      }}
      isOpen={isOpen}
      onRequestClose={closeModal}>
      <Video videoId={videoId} service={service} />
    </Modal>
  </>)
}
