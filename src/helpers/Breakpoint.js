import React, {
  useState,
  useEffect,
  createContext,
  useContext} from 'react';

const defaultValue = {};

const defaultQueries = {
  xs: '(max-width: 320px)',
  sm: '(min-width: 321px) and (max-width: 720px)',
  md: '(min-width: 721px) and (max-width: 1024px)',
  lg: '(min-width: 1025px)',
  mobile: '(max-width: 640px)',
  desktop: '(min-width: 641px)',
  landscape: '(orientation: landscape)',
}

const BreakpointContext = createContext(defaultValue);

const BreakpointProvider = ({children, queries=false}) => {
  const [queryMatch, setQueryMatch] = useState({});

  queries = queries || defaultQueries;

  useEffect(() => {
    const mediaQueryLists = {};
    const keys = Object.keys(queries);
    let isAttached = false;

    const handleQueryListener = () => {
      const updatedMatches = keys.reduce((acc, media) => {
        acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media].matches);
        return acc;
      }, {})
      setQueryMatch(updatedMatches)
    }

    if (window && window.matchMedia) {
      const matches = {};
      keys.forEach(media => {
        if (typeof queries[media] === 'string') {
          mediaQueryLists[media] = window.matchMedia(queries[media]);
          matches[media] = mediaQueryLists[media].matches
        } else {
          matches[media] = false
        }
      });
      setQueryMatch(matches);
      isAttached = true;
      keys.forEach(media => {
        if(typeof queries[media] === 'string') {
          mediaQueryLists[media].addListener(handleQueryListener)
        }
      });
    }

    return () => {
      if(isAttached) {
        keys.forEach(media => {
          if(typeof queries[media] === 'string') {
            mediaQueryLists[media].removeListener(handleQueryListener)
          }
        });
      }
    }
  }, [queries]);

  return (
    <BreakpointContext.Provider value={queryMatch}>
      {children}
    </BreakpointContext.Provider>
  )

}

function useBreakpoint() {
  const context = useContext(BreakpointContext);
  if(context === defaultValue) {
    throw new Error('useBreakpoint must be used within BreakpointProvider');
  }
  return context;
}
export {useBreakpoint, BreakpointProvider};