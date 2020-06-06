import React, { useEffect, useState } from 'react';
import styles from './Columns.module.scss';

// Helpers
import {useBreakpoint} from '~helpers/Breakpoint';

const Column = (props) => {

  return (
    <div
      className={`
        ${styles.column}
        ${props.align === 'center' ? styles.center : ''}`
      }>
      { props.children || null }
    </div>
  )
}

const Columns = (props) => {

  const breakpoints = useBreakpoint();
  const [isDesktop, setIsDesktop] = useState(breakpoints.desktop);
  const abortController = new AbortController();

  useEffect(() => {
    if(breakpoints.desktop) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }

    return () => {
      abortController.abort();
    }
  }, [breakpoints]);

  return (
    <div className={`${styles.columns} ${isDesktop && styles.desktop}`}>
      { props.children || null }
    </div>
  )
}

export {
  Column,
  Columns
}