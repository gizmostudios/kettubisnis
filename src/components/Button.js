import React from 'react';
import styles from './Button.module.scss';
import cx from 'classnames';

const Button = (props) => {
  return (
    <a
      className={cx(
        styles.Button,
        props.className || ''
      )}
      target={props.target}
      alt={props.alt}
      title={props.title}
      onClick={props.onClick}
      href={props.href}
    >
      {props.children || props.title || null}
    </a>
  )
}

export default Button;