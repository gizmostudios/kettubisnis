import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {
  return (
    <a className={ styles.Button } {...props}>
      {props.children || props.title || null}
    </a>
  )
}

export default Button;