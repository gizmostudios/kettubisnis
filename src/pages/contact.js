import React from 'react';
import Layout from '~components/Layout';
import Container from '~components/Container';
import {Columns, Column} from '~components/Column';
import Button from '~components/Button';

const Home = () => {
  return (
    <Layout>
      <Container>
        <Columns>
          <Column>
            <h1>ABOUT LOVISSA</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis felis eros. Mauris aliquet at erat id suscipit. Duis pretium orci dui, ut ullamcorper ipsum ullamcorper eget. Praesent eget sagittis purus. Proin mattis sodales placerat. Ut egestas tempus tortor eget venenatis. </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis felis eros. Mauris aliquet at erat id suscipit. Duis pretium orci dui, ut ullamcorper ipsum ullamcorper eget. Praesent eget sagittis purus. Proin mattis sodales placerat. Ut egestas tempus tortor eget venenatis. </p>
          
            <Button>Contact</Button>
            <Button>CV</Button>
            <Button>Mail</Button>
          </Column>
          <Column>
            <img
              src="/images/loviisa.jpg"
              style={{
                maxHeight: 'calc(100vh - 140px)',
                maxWidth: '100%',

              }} />
          </Column>
        </Columns>
      </Container>
    </Layout>
  )
}

export default Home;