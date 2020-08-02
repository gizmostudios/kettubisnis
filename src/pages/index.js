import React, { useState } from 'react';
import Layout from '~components/Layout';
import Videos from '~components/Videos';
import Footer from '~components/Footer';

// data
import videoData from '~data/videoData.json';

const Home = () => {

  const [currentVideoId, setCurrentVideoId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Layout
      fullscreen={isPlaying}
    >
      <Videos
        videoData={videoData}
        currentVideoId={currentVideoId}
        onPlay={(currentVideoId) => {
          setCurrentVideoId(currentVideoId);
          setIsPlaying(true);
          document.body.classList.add('playing');
        }}
        onPause={() => {
          setIsPlaying(false);
          document.body.classList.remove('playing');
        }}
      />
      <Footer
        videoData={videoData}
        onVideoSelect={(selectedVideoId) => {
          setCurrentVideoId(selectedVideoId);
        }}
        // hide={isPlaying}
      />
    </Layout>
  )
}

export default Home;