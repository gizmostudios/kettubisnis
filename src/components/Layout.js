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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kettu Bisnis</title>
      </Helmet>

      <header>
        <Navbar
          logo={'/images/kettulogo.png'}
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