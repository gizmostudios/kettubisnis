import React from "react";
import cx from 'classnames';
import styles from './Text.module.scss';

// Helpers
import {useBreakpoint} from '~helpers/Breakpoint';
import If from '~helpers/If';

const Text = (props) => {
  const breakpoints = useBreakpoint();

  return (
    <p className={cx(
      styles.Text,
      If(props.className)
    )}>
      { props.children || props.content }
    </p>
  )
}

export default Text;