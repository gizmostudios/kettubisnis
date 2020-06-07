import React, { useState, useRef, useEffect } from 'react';
import styles from './Videos.module.scss';
import cx from 'classnames';

// components
import Icon from '~components/Icon';

// helpers
import {useBreakpoint} from '~helpers/Breakpoint';
import If from '~helpers/If';

const Video = (props) => {
  
  const vidRef = useRef();
  const breakpoints = useBreakpoint();
  const [paused, setPaused] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [src, setSrc] = useState(props.src_sd); //@TODO: make SD/HD switch

  // GlobalStore.on('playVideo', (videoId) => {
  //   console.log(videoId);
  // });

  // constants
  const videoPath = `/videos`;
  const posterPath = `/videos/posters`;

  const handlePlayClick = (newPlayState) => {
    setPaused(!newPlayState || !paused);
    props.onPlay(props.index);
  }

  const handleVideoClick = () => {
    setPaused(!paused);
    props.onPause(props.index);
  }

  useEffect(() => {
    vidRef.current[paused ? 'pause' : 'play']();

    if(!paused && breakpoints.mobile) {
      try {
        vidRef.current.requestFullscreen();
      } catch (e) {
        console.log(e);
      }
    }
    
    return () => {}
  }, [paused]);
  
  return (
    <div
      className={cx(
        styles.root,
        If(breakpoints.desktop, styles.desktop),
        If(!paused, styles.fullscreen))}
      id={props.id || false}
    >
      <div
        className={cx(styles.player, breakpoints.desktop && styles.desktop)}
        >
        <video
          className={
            cx(
              styles.Video,
              If(breakpoints.desktop, styles.desktop),
              If(!paused, styles.fullscreen)
            )
          }
          controls={props.controls || false}
          preload={props.preload || 'none'}
          onClick={() => handleVideoClick()}
          poster={`${posterPath}/${props.poster}`}
          ref={vidRef}
          >
          <source src={`${videoPath}/${src}`} type={props.type || 'video/mp4'} />
          Sorry, your browser doesn't support the video tag.
        </video>

        {paused && (
          <>
            <div
              onClick={() => handlePlayClick(true)}
              className={styles.playButton}
              >
              <Icon name='play' />
            </div>

            <div
              onClick={() => handlePlayClick(true)}
              className={styles.backdrop}
              />
          </>
        )}
      </div>

      {(paused || breakpoints.mobile) && (
        <div
          className={ cx(styles.info, breakpoints.desktop && styles.desktop) }
          onClick={() => setShowDescription(!showDescription)}
        >
          <h3 className={ styles.infoTitle }>
            <span>{props.title}</span>

            {breakpoints.desktop && (
              <Icon
              name="info"
              />
              )}
          </h3>
          
          <p
            className={ cx(styles.description, showDescription && styles.open) }
            >
            {props.description}
          </p>
        </div>
      )}
    </div>
  )
}

const Videos = (props) => {
  
  const VideosRef = useRef();
  const breakpoints = useBreakpoint();
  const [currentVideoId, setCurrentVideoId] = useState(props.currentVideoId);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoLength = props.videoData.videos.length;

  const handlePrevClick = () => {
    setCurrentVideoId(currentVideoId > 1 ? currentVideoId - 1 : videoLength);
  }
  const handleNextClick = () => {
    setCurrentVideoId(currentVideoId < videoLength ? currentVideoId + 1 : 1);
  }

  useEffect(() => {
    document.getElementById(`video-${currentVideoId}`).scrollIntoView({
      behavior: 'smooth'
    });

    return () => {};
  }, [currentVideoId]);
  
  useEffect(() => {
    setCurrentVideoId(props.currentVideoId);
    return () => {};
  }, [props.currentVideoId]);
  
  return (
    <>
      <div className={cx(
          styles.Videos,
          If(breakpoints.desktop, styles.desktop),
          If(isPlaying, styles.fullscreen)
        )}
        ref={VideosRef}
      >
        {
          props.videoData.videos.map((videoData, index) => {
            return (
              <Video
                key={index}
                id={`video-${index + 1}`}
                index={index + 1}
                onPlay={(videoId) => {
                  setIsPlaying(true);
                  setCurrentVideoId(videoId);
                  props.onPlay(videoId);
                }}
                onPause={(videoId) => {
                  setIsPlaying(false);
                  setCurrentVideoId(videoId);
                  props.onPause(videoId);
                }}
                {...videoData}
              />
            )
          })
        }
      </div>
      {breakpoints.desktop && !isPlaying && (
        <>
          <div
            onClick={() => handlePrevClick()}
            className={styles.prevButton}
            >
            <Icon name='prev' />
          </div>

          <div
            onClick={() => handleNextClick()}
            className={styles.nextButton}
          >
            
            <Icon name='next' />
          </div>
        </>
      )}
    </>
  )
}

export default Videos;

export {
  Video,
  Videos
};