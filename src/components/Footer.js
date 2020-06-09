import React, { useEffect, useState } from 'react';
import styles from './Footer.module.scss'
import cx from 'classnames';

// Components
import Icon from '~components/Icon';

// Helpers
import {useBreakpoint} from '~helpers/Breakpoint';
import If from '~helpers/If';

const Thumbnail = (props) => {

  // constants
  const path = `/videos/posters`;
  const breakpoints = useBreakpoint();
  const maxChar = 100;

  const handleClick = () => {
    props.onClick(props.index);
  }

  return (
    <div
      className={`${styles.Thumbnail} ${breakpoints.desktop && styles.desktop}`}
      onClick={handleClick}
    >
      <img src={`${path}/${props.poster}`} />
      <h3 className={styles.thumbTitle}>
        {props.title.length < maxChar
          ? props.title
          : String(props.title.substr(0, maxChar)) + '...'
        }
      </h3>
      <span className={styles.subtitle}>
        {props.subtitle}
      </span>
    </div>
  )
}

const Footer = (props) => {

  const [showGrid, setShowGrid] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const breakpoints = useBreakpoint();

  const handleHomeClick = () => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }

  const handleVideoClick = (videoId) => {
    props.onVideoSelect(videoId);
    setShowHome(false);
    setShowGrid(false);
  }
  
  useEffect(() => {
    const checkScroll = () => {
      if(!showHome && window.scrollY > 100) {
        setShowHome(true);
      }
      
      if(showHome && window.scrollY <= 100) {
        setShowHome(false);
      }
    }

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showHome]);


  useEffect(() => {
    document.body.classList[showGrid ? 'add' : 'remove']('noscroll');

    return () => {};
  }, [showGrid])

  return (
    <footer className={cx(
      styles.footer,
      If(showGrid, styles.showGrid),
      If(props.hide && breakpoints.desktop, styles.hide)
    )}>
      <header
        className={ styles.header }
      >
        <Icon
          name={showGrid ? 'close' : 'grid'}
          className={ styles.icon }
          onClick={() => setShowGrid(!showGrid)}
        />

        {!showGrid && showHome && (
          <Icon
            name="home"
            className={`${styles.icon} ${styles.homeIcon}`} 
            onClick={handleHomeClick}
          />
        )}
      </header>

      <div className={styles.grid}>
        {showGrid && (
          <>
            {props.videoData.videos.map((videoData, index) => {
              return (
                <Thumbnail
                  key={index}
                  index={index + 1}
                  onClick={(videoId) => handleVideoClick(videoId)}
                  {...videoData}
                />
              )
            })}
          </>
        )}
      </div>
    </footer>
  )
}

export default Footer;