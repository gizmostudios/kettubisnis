import React from "react";
import styles from "./Container.module.scss";
import cx from 'classnames';
import { useBreakpoint } from '~helpers/Breakpoint';
import If from '~helpers/If';

const Container = (props) => {

  const breakpoints = useBreakpoint();

  return (
    <div className={cx(
      styles.Container,
      props.className || '',
      If(breakpoints.mobile, styles.mobile)
    )}>
      {props.children}
    </div>
  )
}

export default Container;