import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
// import { prefixLink } from 'gatsby-helpers';
import { Container } from 'react-responsive-grid';
import Helmet from 'react-helmet';
import { config } from 'config';
import ExecutionEnvironment from 'exenv'; // Environment checking for universal apps

import { StickyContainer, Sticky } from 'react-sticky';

import { Link, Element } from 'react-scroll';

import Reveal from 'react-reveal';

import Starfield from '../components/Starfield';
import TypistCycle from '../components/TypistCycle';

import './styles.scss';
import '../node_modules/react-typist/dist/Typist.css';
import 'animate.css/animate.css';

import mouseIcon from './mouse-icon.svg';
import testShipIcon from './test-ship.png';
import testServiceIcon from './test-service-icon.png';

import mockupSM from './mockup-sm-01.jpg';
// const Scroll = require('react-scroll');
//
// const Link = Scroll.Link;
// const Element = Scroll.Element;


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
      <Link
        className="scroll-down-link blink_me"
        to="intro_pane"
        smooth
        duration={1800}
      >
        &darr;&nbsp;SCROLL DOWN&nbsp;&darr;
      </Link>
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


function WidthMaster(props) {
  return (
    <div className="sectionWidth">
      <div className="sectionWidthChild">
        {props.children}
      </div>
    </div>
  );
}
WidthMaster.propTypes = {
  children: React.PropTypes.element.isRequired,
};

function StickyNav(props) {
  const linkOffset = props.windowDimensions.height * -0.1;
  console.log(`link offset: ${linkOffset}`);

  return (
    <Sticky
      style={{
        backgroundColor: 'white',
        borderBottomColor: '#ddd',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        boxShadow: '0 0 8px 0 rgba(0,0,0,.2), 0 0 4px 0 rgba(0,0,0,.19)',
        zIndex: '9002',
      }}
    >
      <WidthMaster>
        <nav className="stickyNav">
          <Link
            activeClass="active"
            className="navItem"
            to="intro_pane"
            spy
            smooth
            offset={linkOffset}
            duration={500}
          >
            Solutions
          </Link>
          <Link
            activeClass="active"
            className="navItem"
            to="services_pane"
            spy
            smooth
            offset={linkOffset}
            duration={500}
          >
            Services
          </Link>
          <Link
            activeClass="active"
            className="navItem"
            to="clients_pane"
            spy
            smooth
            offset={linkOffset}
            duration={500}
          >
            Clients
          </Link>
          <a className="navItem contact">Contact Us</a>
        </nav>
      </WidthMaster>
    </Sticky>
  );
}
StickyNav.propTypes = {
  windowDimensions: React.PropTypes.object.required,
};

function IntroPane() {
  return (
    <div className="section">
      <div className="services-pane">
        <h2>Guiding your business from <u>idea</u> to <u>fruition</u>.</h2>
        <div className="blockContainer">
          <p>
            At Apollo27, we take a hands-on and holistic approach to making your idea a reality.
            Having primarily worked with start-ups,
            we know how fast-paced and dynamic work needs to be.
            We&apos;re also well-versed in positioning the content we create
            towards the audience you need; whether it be investors, clients, or users.
          </p>
          <div className="columns">
            <div className="solutionColumn">
              <img alt="test" src={testShipIcon} width={200} />
              <h3>
                Planning Phase
              </h3>
              <p>
                We take meticulous care over the planning of your idea
                and want to make sure it succeeds!
                We won&apos;t stop at anything to see it planned.
              </p>
            </div>
            <div className="solutionColumn">
              <img alt="test" src={testShipIcon} width={200} />
              <h3>
                Building Phase
              </h3>
              <p>
                You take meticulous care over the building of your idea
                and want to make sure it succeeds!
                We won&apos;t stop at anything to see it built.
              </p>
            </div>
            <div className="solutionColumn">
              <img alt="test" src={testShipIcon} width={200} />
              <h3>
                Launch Phase
              </h3>
              <p>
                I take meticulous care over the launching of your idea
                and want to make sure it succeeds!
                We won&apos;t stop at anything to see it!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesPane() {
  return (
    <div className="section red">
      <div className="intro-pane">
        <h2>A mission-satisfying array of skillsets.</h2>
        <div className="blockContainer">
          <p>
            At Apollo27, we take a hands-on and holistic approach to making your idea a reality.
            Having primarily worked with start-ups,
            we know how fast-paced and dynamic work needs to be.
            We&apos;re also well-versed in positioning the content we create
            towards the audience you need; whether it be investors, clients, or users.
          </p>
          <div className="columns">
            <div className="solutionColumn">
              <img alt="test" src={testServiceIcon} width={160} />
              <h3>
                Planning Phase
              </h3>
            </div>
            <div className="solutionColumn">
              <img alt="test" src={testServiceIcon} width={160} />
              <h3>
                Building Phase
              </h3>
            </div>
            <div className="solutionColumn">
              <img alt="test" src={testServiceIcon} width={160} />
              <h3>
                Launch Phase
              </h3>
            </div>
          </div>
          <div className="columns">
            <div className="solutionColumn">
              <img alt="test" src={testServiceIcon} width={160} />
              <h3>
                Planning Phase
              </h3>
            </div>
            <div className="solutionColumn">
              <img alt="test" src={testServiceIcon} width={160} />
              <h3>
                Building Phase
              </h3>
            </div>
            <div className="solutionColumn">
              <img alt="test" src={testServiceIcon} width={160} />
              <h3>
                Launch Phase
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

function SlideIcon(props) {
  const invert = props.invert;
  const animation = !invert ? [
    'fadeInLeft',
    'fadeInRight',
  ] : [
    'fadeInRight',
    'fadeInLeft',
  ];

  console.log(`animation ${animation[0]}`);

  let layout = [
    (<Reveal key={animation[0]} style={{zIndex: 0}} className="one-two-icon" effect={`animated ${animation[0]}`}>
      <img src={props.icon} alt="clients_image" />
    </Reveal>),
    (<Reveal key={animation[1]} className="one-two-para" effect={`animated ${animation[1]}`}>
      <div
        style={{
          textAlign: (invert ? 'right' : 'left'),
          padding: (invert ? '1rem 3rem 2rem 0' : '1rem 0 2rem 3rem'),
        }}
      >
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </Reveal>),
  ];


  if (invert) {
    layout = layout.reverse();
  }

  return (
    <div className="one-two">
      {layout}
    </div>
  );
}
SlideIcon.propTypes = {
  invert: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};


function ClientsPane() {
  return (
    <div className="section">
      <div className="services-pane">
        <h2>Some things we&apos;ve built:</h2>
        <SlideIcon
          title="SkyMining®"
          description="More hello-worldy-stuff"
          icon={mockupSM}
        />
        <SlideIcon
          title="EcoServices"
          description="More hello-worldy-stuff"
          icon={testShipIcon}
          invert
        />
        <SlideIcon
          title="HeadMarket"
          description="More hello-worldy-stuff"
          icon={testShipIcon}
        />
      </div>
    </div>
  );
}

function UnderDevelopmentSign() {
  return (
    <div className="under-development-box">
      <h3>This site is currently <strong>under development</strong></h3>
      <p><Link>Please let us know if you find something out of place.</Link></p>
    </div>
  );
}

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canUseDOM: ExecutionEnvironment.canUseDOM,
      hasInteracted: false,
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }


  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({
      window: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
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
        <StickyNav windowDimensions={this.state.windowDimensions} />
        <Element name="intro_pane" className="element">
          <IntroPane />
        </Element>
        <hr className="section-divider" />
        <Element name="services_pane" className="element">
          <ServicesPane />
        </Element>
        <hr className="section-divider" />
        <Element name="clients_pane" className="element">
          <ClientsPane />
        </Element>
        <UnderDevelopmentSign />
      </StickyContainer>
    );
  }
}
