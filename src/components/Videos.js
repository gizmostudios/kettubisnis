import React, { useState, useRef, useEffect } from 'react';
import styles from './Videos.module.scss';
import cx from 'classnames';
import { isIOS } from 'react-device-detect';

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


  // constants
  const videoPath = `/videos`;
  const posterPath = `/videos/posters`;

  useEffect(() => {
    setPaused(!props.play);
    if(!props.play) {
      vidRef.current.pause();
    }
    return () => {};
  }, [props.play]);

  useEffect(() => {
    vidRef.current.addEventListener('pause', pauseVideo);
    return () => vidRef.current.removeEventListener('pause', pauseVideo);
  }, [paused]);

  const pauseVideo = () => {
    if (vidRef.current.seeking) return;
    setPaused(true);
    props.onPause(props.index);
  }

  return (
    <div
      className={cx(
        styles.root,
        If(breakpoints.desktop, styles.desktop),
        If(!paused, styles.fullscreen))}
      id={props.id || false}
    >
      <div
        className={cx(
          styles.player,
          If(breakpoints.desktop, styles.desktop)
        )}
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
          poster={`${posterPath}/${props.poster}`}
          ref={vidRef}
          controls={!paused || isIOS}
          >
          <source src={`${videoPath}/${src}`} type={props.type || 'video/mp4'} />
          Sorry, your browser doesn't support the video tag.
        </video>

        {paused && (
          <>
            <div
              className={cx(
                styles.playButton,
                If(breakpoints.mobile, styles.mobile),
                If(isIOS, styles.ios)
              )}
              onClick={() => {
                setPaused(false);
                props.onPlay(props.index);
                vidRef.current.play();
              }}
              >
              <Icon name='play' />
            </div>

            <div
              className={styles.backdrop}
              onClick={() => {
                setPaused(false);
                props.onPlay(props.index);
                vidRef.current.play();
              }}
            />
          </>
        )}
      </div>

      {(paused || breakpoints.mobile) && (
        <div
          className={cx(
            styles.info,
            If(breakpoints.desktop, styles.desktop)
          )}
          onClick={() => setShowDescription(!showDescription)}
        >
          <h3 className={ styles.infoTitle }>
            <span>{props.title}</span>
            
            {/* {breakpoints.desktop && ( */}
            <Icon
              name="info"
            />
          </h3>

          <span className={ styles.subtitle }>{props.subtitle}</span>

          <p
            className={ cx(styles.description, If(showDescription, styles.open)) }
            >
            {props.description}
          </p>
        </div>
      )}

      {/* {(!paused && breakpoints.desktop) && (
        <Icon
          className={styles.closeButton}
          name="close"
          onClick={pauseVideo}
        />
      )} */}
    </div>
  )
}

const Videos = (props) => {
  
  const VideosRef = useRef();
  const breakpoints = useBreakpoint();
  const [currentVideoId, setCurrentVideoId] = useState(props.currentVideoId);
  const [initialized, setInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoLength = props.videoData.videos.length;

  const handlePrevClick = () => {
    setCurrentVideoId(currentVideoId > 1 ? currentVideoId - 1 : videoLength);
  }
  const handleNextClick = () => {
    setCurrentVideoId(currentVideoId < videoLength ? currentVideoId + 1 : 1);
  }

  useEffect(() => {
    if(currentVideoId) {

      if(!initialized) { // don't smoothscroll on page init
        setInitialized(true);
        return;
      }

      document.getElementById(`video-${currentVideoId}`).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }

    return () => {};
  }, [currentVideoId, isPlaying]);
  
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
                play={index + 1 === currentVideoId && isPlaying}
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