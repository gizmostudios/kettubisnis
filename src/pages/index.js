import React, { useState } from 'react';
import Layout from '~components/Layout';
import Videos from '~components/Videos';
import Footer from '~components/Footer';

import videoData from '~data/videoData.json';

const Home = () => {

  const [currentVideoId, setCurrentVideoId] = useState(1);

  return (
    <Layout>
      <Videos
        videoData={videoData}
        currentVideoId={currentVideoId}
      />
      <Footer
        videoData={videoData}
        onVideoSelect={(selectedVideoId) => {
          setCurrentVideoId(selectedVideoId);
        }}
      />
    </Layout>
  )
}

export default Home;