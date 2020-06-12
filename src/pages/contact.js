import React, { useState } from 'react';

// Components
import Layout from '~components/Layout';
import Container from '~components/Container';
import {Columns, Column} from '~components/Columns';
import Button from '~components/Button';
import Text from '~components/Text';

// Styles
import styles from './contact.module.scss';

const Contact = () => {
  const [callLabel, setCallLabel] = useState('Call me');
  const [mailLabel, setMailLabel] = useState('Mail me');

  const phone = '+31 6 255 81 358';
  const email = 'loviisa.mellin@gmail.com';

  return (
    <Layout>
      <Container className={styles.container}>
        <Columns>
          <Column align="center">
            <h1 className={ styles.title }>ABOUT LOVIISA</h1>
            
            <Text className={styles.text}>
              Hi,
              <br /><br />
              I’m Loviisa Mellin, audio visual professional living in Amsterdam. I've been freelancing in the creative industry since 2006 and my main focus and expertise is video editing and production of video content. I’m primarily editing TV commercials, mood films, brand films and diverse audio visual content. 
              <br /><br />
              Within my company Kettu* Bisnis Productions (*a fox in Finnish) I’m providing a full range of services in video production for commercial clients and the cultural sector. I’m overseeing all aspects of production work including financial, creative, and technical processes. I've collaborated with Heineken, Nike, adidas, TomTom, Ikea and brands alike. I've also enjoyed producing films for prestigious cultural award ceremonies like the Erasmus Prize.
              <br /><br />
              I’m great in choosing strong visuals to help client tell their story the best possible way. My tools are Adobe CC: Premiere Pro, After Effects, Photoshop, Illustrator, InDesign and DaVinci Resolve.
              <br /><br />
              Don’t hesitate to get in contact. 
              Best regards,
              <br /><br />
              Loviisa
            </Text>

            <div className={ styles.buttons }>
              <Button
                className={ styles.button }
                href="/documents/CV Loviisa Mellin 2020.pdf"
                target="_blank"
              >
                Resume (PDF 461KB)
              </Button>
              <Button
                className={ styles.button }
                href={ callLabel === phone ? `tel:${phone}` : null }
                onClick={callLabel !== phone ? (event) => {
                  setCallLabel(phone);
                  event.preventDefault();
                } : null}
              >
                {callLabel}
              </Button>
              <Button
                className={ styles.button }
                href={ mailLabel === email ? `mailto:${email}` : null }
                onClick={mailLabel !== email ? (event) => {
                  setMailLabel(email);
                  event.preventDefault();
                } : null}
              >
                {mailLabel}
              </Button>
            </div>
          </Column>

          <Column>
            <img
              className={ styles.portret }
              src="/images/loviisa.jpg"
            />
          </Column>
        </Columns>
      </Container>
    </Layout>
  )
}

export default Contact;