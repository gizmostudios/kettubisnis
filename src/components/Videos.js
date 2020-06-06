import React, { useState, useRef, useEffect } from 'react';
import styles from './Videos.module.scss';
import cx from 'classnames';

// components
import Icon from '~components/Icon';

// helpers
import {useBreakpoint} from '~helpers/Breakpoint';


const Video = (props) => {
  
  const vidRef = useRef();
  const breakpoints = useBreakpoint();
  const [paused, setPaused] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [src, setSrc] = useState(props.src_sd); //@TODO: make SD/HD switch

  // constants
  const videoPath = `/videos`;
  const posterPath = `/videos/posters`;

  const handlePlayClick = (newPlayState) => {
    setPaused(!newPlayState || !paused);
  }

  const handleVideoClick = () => {
    setPaused(!paused);
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

    props[paused ? 'onPause' : 'onPlay'](props.index);
    return () => {}
  }, [paused]);
  
  return (
    <div
      className={cx(styles.root, breakpoints.desktop && styles.desktop)}
      id={props.id || false}
    >
      <div
        className={cx(styles.player, breakpoints.desktop && styles.desktop)}
        >
        <video
          className={ cx(styles.Video, breakpoints.desktop && styles.desktop) }
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
    return () => {
      abortController.abort();
    };
  }, [props.currentVideoId]);
  
  return (
    <>
      <div className={ `${styles.Videos} ${breakpoints.desktop && styles.desktop}` }>
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
                }}
                onPause={(videoId) => {
                  setIsPlaying(false);
                  setCurrentVideoId(videoId);
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