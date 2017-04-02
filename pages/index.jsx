import React from 'react';
// import { Link } from 'react-router';
// import { prefixLink } from 'gatsby-helpers';
import { Container } from 'react-responsive-grid'
import Helmet from 'react-helmet';
import { config } from 'config';
import ExecutionEnvironment from 'exenv'; // Environment checking for universal apps

import Starfield from '../components/Starfield';
import TypistCycle from '../components/TypistCycle';

import { StickyContainer, Sticky } from 'react-sticky';

import './styles.scss';
import '../node_modules/react-typist/dist/Typist.css';

import mouseIcon from './mouse-icon.svg';

function StarfieldEnclosure(props) {
  if (!props.hasInteracted) { // Haven't moved the mouse yet
    return (
      <div className={'starfield-enclosure'}>
        {props.children}
        <div className={'starfield-blackout'} />
        <StarterOverlay />
      </div>
    );
  }
  return (
    <div className={'starfield-enclosure'}>
      {props.children}
      <div className={'starfield-blackout hide'} />
      <StarfieldOverlay />
    </div>
  );
}
StarfieldEnclosure.propTypes = {
  children: React.PropTypes.element.isRequired,
  hasInteracted: React.PropTypes.bool.isRequired,
};

function StarfieldOverlay() {
  return (
    <div className="starfield-overlay">
      <h1>Apollo 27</h1>
      <TypistCycle
        content={['Digital design and consulting.', 'Creators of compelling interactive experiences.', 'Made in the UK.']}
        numberOfCycles={1}
        segmentDelay={0.8}
        className="starfield-byline"
      />
    </div>
  );
}

function StarterOverlay() {
  return (
    <div className="starfield-overlay blink_me">
      <h2>MOVE YOUR MOUSE</h2>
      <object className="mouseIcon" type="image/svg+xml" data={mouseIcon} width={80}>
        Mouse Icon
      </object>
    </div>
  );
}

function IntroPane() {
  return (
    <div className="section red">
      <div className="intro-pane">
        <h2>We launch your project into the stars.</h2>
      </div>
    </div>
  );
}

function StickyNav() {
  const navStyle = {
    height: '8vh',
    backgroundColor: 'white',
    padding: '2.4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const itemStyle = {
    padding: '.6rem 0',
    margin: '0 2rem',
    borderBottomColor: 'red',
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
  };

  return (
    <Sticky>
      <nav style={navStyle}>
        <a style={itemStyle}>Our Solutions</a>
        <a style={itemStyle}>What We Do</a>
        <a style={itemStyle}>Clients</a>
        <a style={{marginLeft: 'auto'}}>Contact Us!</a>
      </nav>
    </Sticky>
  );
}

function ServicesPane() {
  return (
    <div className="section">
      <h2>Services!</h2>
    </div>
  );
}

function ClientsPane() {
  return (
    <div className="section">
      <h2>Clients!</h2>
    </div>
  );
}

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canUseDOM: ExecutionEnvironment.canUseDOM,
      hasInteracted: false,
    };
  }

  render() {
    const canUseDOM = this.state.canUseDOM;
    let canvas = null;

    if (canUseDOM) {
      canvas = (
        <Starfield onInteraction={() => this.setState({ hasInteracted: true })} />
      );
    }

    return (
      <StickyContainer>
        <Helmet
          title={config.siteTitle} meta={[
            {
              name: 'description',
              content: 'Sample',
            }, {
              name: 'keywords',
              content: 'sample, something',
            },
          ]}
        />
        <div style={{ backgroundColor: '#222' }}>
          <input type="checkbox" className="switch" checked={this.state.hasInteracted} readOnly />
          <StarfieldEnclosure hasInteracted={this.state.hasInteracted} >
            {canvas}
          </StarfieldEnclosure>
        </div>
        <StickyNav />
        <IntroPane />
        <hr className="section-divider" />
        <ServicesPane />
        <hr className="section-divider" />
        <ClientsPane />
      </StickyContainer>
    );
  }
}
