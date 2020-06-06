import React from "react";
// import cx from "classnames";

const Icon = (props) => {

  const icons = {
    play: {
      svg: <path d="M14.8979 9L0.116608 17.6603L0.116609 0.339745L14.8979 9Z" fill="currentColor" />,
      size: [16,18]
    },
    home: {
      svg: <path d="M0.5 16.7857V5.78695L8 0.883099L15.5 5.78694V16.7857H0.5Z" fill="none" stroke="currentColor" strokeWidth="2" />,
      size: [16,18]
    },
    prev: {
      svg: <path d="M11 1L1 11L11 21" fill="none" stroke="currentColor" strokeWidth="1" />,
      size: [12,22]
    },
    next: {
      svg: <path d="M1 21L11 11L1 1" fill="none" stroke="currentColor" strokeWidth="1" />,
      size: [12,22]
    },
    grid: {
      svg: <g fill="currentColor"><rect width="7" height="7"/><rect y="10.5" width="7" height="7"/><rect y="21" width="7" height="7"/><rect x="10.5" width="7" height="7"/><rect x="10.5" y="10.5" width="7" height="7"/><rect x="10.5" y="21" width="7" height="7"/><rect x="21" width="7" height="7"/><rect x="21" y="10.5" width="7" height="7"/><rect x="21" y="21" width="7" height="7"/></g>,
      size: [28,28]
    },
    info: {
      svg: <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z" fill="currentColor" />,
      size: [24, 24],
      rules: {
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    },
    close: {
      svg: <g><line x1="8.92889" y1="27.4939" x2="27.4939" y2="8.92889" stroke="currentColor" strokeWidth="2" /><line y1="-0.5" x2="26.2548" y2="-0.5" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 27.8475 27.8474)" stroke="currentColor" strokeWidth="2" /></g>,
      size: [38, 38]
    }
  }

  return (
    <svg
      width={props.width || icons[props.name].size[0]}
      height={props.height || icons[props.name].size[1]}
      style={props.style || {}}
      onClick={props.onClick || null}
      className={props.className || ''}
      {...icons[props.name].rules || {}}
    >
        {icons[props.name].svg}
    </svg>
  )
}

export default Icon;