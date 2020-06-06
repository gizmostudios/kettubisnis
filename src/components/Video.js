import React, { useState, useRef, useEffect } from 'react'
import styles from './Video.module.scss'
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
  const [src, setSrc] = useState(props.src_sd);
  
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
    
    return () => {};
  }, [paused]);
  
  return (
    <div className={styles.root}>
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
  // const [isDesktop, setIsDesktop] = useState(breakpoints.desktop);

  const handlePrevClick = () => {}
  const handleNextClick = () => {}

  // useEffect(() => {
  //   setIsDesktop(breakpoints.desktop);
  // }, [breakpoints])
  
  return (
    <>
      <div className={ `${styles.Videos} ${breakpoints.desktop && styles.desktop}` }>
        {props.children}
      </div>
      {breakpoints.desktop && (
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

export default Video;

export {
  Video,
  Videos
};