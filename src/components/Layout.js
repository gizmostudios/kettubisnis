import React, { useEffect } from "react";
import '~styles/main.scss';

// Components
import Navbar from '~components/Navbar';
import { Helmet } from 'react-helmet';

// Helpers
import {BreakpointProvider} from '~helpers/Breakpoint';

const Layout = (props) => {
  
  return (
    <BreakpointProvider>
      <Helmet>
        <title>Kettu Bisnis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Helmet>

      <header>
        <Navbar
          logo={'/images/kettulogo.svg'}
          hide={props.fullScreen}
          items={[{
            title: {
              name: 'home',
              breakpoints: ['mobile']
            },
            icon: {
              name: 'home',
              breakpoints: ['desktop']
            },
            path: '/'
          },
          {
            title: 'contact',
            path: '/contact'
          }]}
        />
      </header>

      { props.children }

    </BreakpointProvider>
  )
}

export default Layout;