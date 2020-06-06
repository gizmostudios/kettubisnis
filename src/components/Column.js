import React, { useEffect, useState } from 'react';
import styles from './Column.module.scss';

// Helpers
import {useBreakpoint} from '~helpers/Breakpoint';

const Column = (props) => {

  return (
    <div className={ styles.column }>
      { props.children || null }
    </div>
  )
}

const Columns = (props) => {

  const breakpoints = useBreakpoint();
  const [isDesktop, setIsDesktop] = useState(breakpoints.desktop);

  useEffect(() => {
    if(breakpoints.desktop) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
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