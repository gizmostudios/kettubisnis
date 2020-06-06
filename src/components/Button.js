import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {
  return (
    <button className={ styles.Button } {...props}>
      {props.children || props.title || null}
    </button>
  )
}

export default Button;