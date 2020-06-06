import React from 'react';
import Layout from '~components/Layout';
import {Videos, Video} from '~components/Video';
import Footer from '~components/Footer';

import videoData from '~data/videoData.json';

const Home = () => {

  return (
    <Layout>
      <Videos>
        {videoData.videos.map((videoData, index) => {
          return (
            <Video
              key={index}
              index={index + 1}
              {...videoData}
            />
          )
        })}
      </Videos>
      <Footer
        videoData={videoData}
      />
    </Layout>
  )
}

export default Home;