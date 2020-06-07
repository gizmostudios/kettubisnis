import React, { useState, useEffect } from "react";
// import React from "react";
import styles from './Navbar.module.scss';
import { Link } from "gatsby";
import cx from 'classnames';
import If from '~helpers/If';

// components
import Icon from '~components/Icon';

// Helpers
import {useBreakpoint} from '~helpers/Breakpoint';

const NavItems = (props) => {
  const breakpoints = useBreakpoint();
  return props.items.map((item, index) => {

    let title = item.title;
    let icon = null;

    if(item.title.hasOwnProperty('breakpoints')) {
      title = item.title.breakpoints.map((bp, index) => {
        if(breakpoints[bp]) {
          return <span key={index}>{ item.title.name }</span>;
        } else {
          return null;
        }
      })
    }

    if(item.icon) {
      icon = item.icon.breakpoints.map((bp, index) => {
        if(breakpoints[bp]) {
          return <Icon key={index} name={ item.icon.name } />;
        } else {
          return null;
        }
      })
    }

    return (
      <Link
        key={index}
        to={item.path}
        className={ styles.item }
        activeClassName={ styles.active }
      >
        {title}
        {icon}
      </Link>
    )
  })
}

const Navbar = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const breakpoints = useBreakpoint();
  const items = props.items ? <NavItems items={props.items} /> : null;

  useEffect(() => {
    document.body.classList[dropdownVisible ? 'add' : 'remove']('noscroll');
  }, [dropdownVisible]);
  

  return (
    <div className={`${styles.root}`}>
      <div className={`
        ${styles.navbar}
        ${If(props.hide, styles.hide)}`}
      >
        {breakpoints['desktop'] && <div className={styles.items}>{items}</div>}

        <Link
          className={cx(styles.brand, breakpoints['mobile'] ? styles.center : null)}
          to={'/'}
        >
          <img src={props.logo} className={styles.logo} />
        </Link>

        {breakpoints['mobile'] && (
          <>
            <button
              className={cx(styles.hamburger, dropdownVisible && styles.close)}
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </>
        )}
      </div>

      {breakpoints['mobile'] && (
        <div className={cx(styles.dropdown, dropdownVisible && styles.show)}>
          {items}
        </div>
      )}
    </div>
  )
}

export default Navbar;