import React, { useEffect, useRef } from "react";
import Fetcher from './Fetcher.js';

import Flickity from "react-flickity-component";
import "../Flickity.css";
import ScrollToTopOnMount from "./ScrollToTopOnMount.js";
import Masonry from 'react-masonry-component';
import AudioPlayer from "./AudioPlayer.js";
import Grid from "./Grid.js";
import Video from "./Video.js";

const Page = ({ match }) => {
  return <Fetcher endpoint={`${process.env.REACT_APP_API_ADDRESS}exhibit/${match.params.slug}.json`}>
    {data => <InnerPage data={data} currentSlug={match.params.slug} />}
  </Fetcher>
}

export default Page;

const InnerPage = ({ data, currentSlug }) => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [data])
  return (
    <div className="Page bg--black color--white">
      <div className="container ">
        <ScrollToTopOnMount />
        <h1 className="heading ff-sans--bold size--headerxl">{data.title}</h1>
        <h2 className="heading ff-sans--bold">{data.subtitle}</h2>
        <div className="Page-body text-with-border border-color--red">{data.items.map(mapChildren)}</div>
      </div>
      <Grid items={data.siblings} currentSlug={currentSlug} />
    </div>
  )
}

const mapChildren = props => {
  switch (props.component) {
    case "Image":
      return <ImageGrid {...props} key={props.id} />
    case "Text":
      return <Text {...props} key={props.id} />
    case "Video":
      return <Video {...props} key={props.id} />
    case "Quote":
      return <Quote {...props} key={props.id} />
    case "Audio":
      return <Audio {...props} key={props.id} />

    default:
      console.log(`Missing Component: ${props.component}`);
      return null
  }
}

const Images = ({ images }) => images.map(image => <img key={image.url} alt={image.title} src={image.url} />)

const ImageGrid = ({ images, caption }) => (
  <div className="ImageGrid">
    <Masonry className={'ImageGrid-grid block'}>
      {Images({images})}
    </Masonry>
    {caption && <div className="ImageGrid-caption">
      <div className="img-caption color--white">{caption}</div>
    </div>}
  </div>
)

const Text = ({ text }) => (
  <div className={`Text block rte ff-sans size--body ${ text.includes('image-caption') ? 'text-align--center block--negative-margin' : '' }`} dangerouslySetInnerHTML={{ __html: text }} />
)

const Quote = ({ text }) => (
  <div className="Quote block ff-serif size--h2 text-align--center">{text}</div>
)

const Audio = ({ audioUrl, images }) => {
  const audioRef = useRef()
  const flickityRef = useRef()

  useEffect(() => {
    audioRef.current.addEventListener("play", onAudioPlay)
    audioRef.current.addEventListener("pause", onAudioPause)
    return () => {
      audioRef.current.removeEventListener("play", onAudioPlay)
      audioRef.current.removeEventListener("pause", onAudioPause)
    }
  },[])

  function onAudioPlay() {
    flickityRef.current.playPlayer()
  }

  function onAudioPause() {
    flickityRef.current.stopPlayer()
  }

  return (
    <div className="Audio block">
      <AudioPlayer playerRef={audioRef}>
        <source src={audioUrl} />
      </AudioPlayer>
      <Flickity
        flickityRef={c => flickityRef.current = c}
        options={{
          draggable: false,
          prevNextButtons: false,
          pageDots: false,
          autoPlay: 5000
        }}
        reloadOnUpdate={true}>
        {images.map((image) => <div key={image.url} className="iframe-wrapper" style={{ width: '100%' }}><img alt={image.title} src={image.url} /></div>)}
      </Flickity>
    </div>
  )
}
