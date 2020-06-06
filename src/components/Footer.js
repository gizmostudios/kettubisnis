import React, { useEffect, useState } from 'react';
import styles from './Footer.module.scss'

// Components
import Icon from '~components/Icon';

// Helpers
import {useBreakpoint} from '~helpers/Breakpoint';

const Thumbnail = (props) => {

  // constants
  const path = `/videos/posters`;
  const breakpoints = useBreakpoint();
  const [maxChar, setMaxChar] = useState(0);

  useEffect(() => {
    if(breakpoints.xs) setMaxChar(10);
    if(breakpoints.sm) setMaxChar(20);
    if(breakpoints.md) setMaxChar(30);
    if(breakpoints.lg) setMaxChar(999);

    return () => {};
  }, [breakpoints])

  return (
    <div className={`${styles.Thumbnail} ${breakpoints.desktop && styles.desktop}`}>
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

  const handleHomeClick = () => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }

  
  const checkScroll = () => {
    if(!showHome && window.scrollY > 100) {
      setShowHome(true);
    }
    
    if(showHome && window.scrollY <= 100) {
      setShowHome(false);
    }
  }
  
  window.removeEventListener('scroll', checkScroll); //never have multiple listeners
  window.addEventListener('scroll', checkScroll);

  useEffect(() => {
    document.body.classList[showGrid ? 'add' : 'remove']('noscroll');
  }, [showGrid])

  return (
    <footer className={`${styles.footer} ${showGrid && styles.showGrid}`}>
      <header className={ styles.header }>
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