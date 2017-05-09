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

import Modal from 'react-modal';

import Starfield from '../components/Starfield';
import TypistCycle from '../components/TypistCycle';
import FormCharm from '../components/FormCharm'; // Custom, alpha variant of FC

import './styles.scss';
import '../node_modules/react-typist/dist/Typist.css';
import 'animate.css/animate.css';

import mouseIcon from './mouse-icon.svg';
import testShipIcon from './test-ship.png';
import testServiceIcon from './test-service-icon.png';

import mockupSM from './mockup-sm-01.jpg';
import mockupECO from './mockup-eco-01.jpg';
import mockupHM from './mockup-hm-01.jpg';

import blueprintIdea from './blueprint-idea@2x.png';
import buildIdea from './build-idea@2x.png';
import launchIdea from './launch-idea@2x.png';

import presentationIcon from './presentation-icon.png';
import documentIcon from './document-icon.png';
import graphicsIcon from './graphics-icon.png';
import webIcon from './web-icon.png';
import mobileIcon from './mobile-icon.png';
import brandingIcon from './branding-icon.png';

import ogImage from './og-image.png';
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
        <StarterOverlay
          hasLoaded={props.hasLoaded}
          loadingProgressPercent={props.loadingProgressPercent}
        />
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
  hasLoaded: React.PropTypes.bool.isRequired,
  loadingProgressPercent: React.PropTypes.number.isRequired,
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

function StarterOverlay(props) {
  let content = (<div />);

  const loadingProgressPercent = props.loadingProgressPercent;

  if (!props.hasLoaded) {
    content = (
      <div className="starfield-overlay blink_me">
        <h2>Loading ({loadingProgressPercent} %), please wait.</h2>
      </div>
    );
  } else {
    content = (
      <div className="starfield-overlay blink_me">
        <h2>Please Move Your Mouse</h2>
        <object className="mouseIcon" type="image/svg+xml" data={mouseIcon} width={80}>
          Mouse Icon
        </object>
      </div>
    );
  }

  return (
    <div>
      {content}
    </div>
  );
}
StarterOverlay.propTypes = {
  hasLoaded: React.PropTypes.bool.isRequired,
  loadingProgressPercent: React.PropTypes.number.isRequired,
};


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
          <a
            onClick={() => props.contactOpen()}
            className="navItem contact"
          >
            Contact&nbsp;Us
          </a>
        </nav>
      </WidthMaster>
    </Sticky>
  );
}
StickyNav.propTypes = {
  windowDimensions: React.PropTypes.object.isRequired,
  contactOpen: React.PropTypes.func.isRequired,
};

function IntroPane() {
  return (
    <div className="section">
      <div className="services-pane">
        <h2>Guiding your projects from <u>idea</u> to <u>launch</u>.</h2>
        <div className="blockContainer">
          <p>
            At Apollo27, we take a hands-on and holistic approach to making your idea a reality.
            Having primarily worked with start-ups,
            we know how fast-paced and dynamic work needs to be, and we take great care in positioning
            your content towards its intended audience; whether it be investors, clients, or users.
          </p>
          <div className="columns">
            <div className="solutionColumn">
              <img alt="test" src={blueprintIdea} width={200} />
              <h3>
                Planning Phase
              </h3>
              <p>
                We plan all projects together with our clients,
                ensuring we set out on a mission with clear goals, great deliverables and realistic timelines.
              </p>
            </div>
            <div className="solutionColumn">
              <img alt="test" src={buildIdea} width={200} />
              <h3>
                Building Phase
              </h3>
              <p>
                Excellence directs our work like a rocket's guidance-computer, and we keep you updated
                throughout construction with timely progress reports.
              </p>
            </div>
            <div className="solutionColumn">
              <img alt="test" src={launchIdea} width={200} />
              <h3>
                Launch Phase
              </h3>
              <p>
                Nothing fills us with more pride than the successful launch of another project.
                Post-launch we of course offer mission-support to ensure a smooth ride.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesPane(props) {
  const items = props.content.map((row) => {
    const columns = row.map((entry) => {
      return (
        <div className="solutionColumn">
          <img alt="test" src={entry.icon} width={160} />
          <h3>
            {entry.title}
          </h3>
          <p>
            {entry.detail}
          </p>
        </div>
      );
    });

    return (
      <div className="columns">
        {columns}
      </div>
    )
  });

  return (
    <div className="section red">
      <div className="intro-pane">
        <h2>The right skills for the mission</h2>
        <div className="blockContainer">
          <p>
            At Apollo27, we offer a wide-ranging array of complementary skills to ensure
            we complete and execute the mission without a glitch, no matter its shape, size or type.
          </p>
          {items}
        </div>
      </div>
    </div>

  );
}
ServicesPane.propTypes = {
  content: React.PropTypes.arrayOf(React.PropTypes.object),
};

function SlideIcon(props) {
  const invert = props.invert;
  const animation = !invert ? [
    'fadeInLeft',
    'fadeInRight',
  ] : [
    'fadeInRight',
    'fadeInLeft',
  ];

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
        <h4>{props.subtitle}</h4>
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
  subtitle: PropTypes.string.isRequired,
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
          subtitle="Web | Documents | Presentations | Branding | Graphics"
          description="SkyMining is the world's first commerical solution for removing CO2 from the atmosphere, and turning it into a clean, renewable fuel. Apollo27 worked on SkyMining in a 3-year partnership that involved working on all aspects of the business case, including its launch website, business plan, and investor material."
          icon={mockupSM}
        />
        <SlideIcon
          title="EcoServices"
          subtitle="Web | Graphics | Branding"
          description="EcoServices is a Swedish energy startup, enabling companies to increase both energy efficiency and profits by turning previously large capital investments into service-solutions. Apollo27 created their new bilingual launch site, as well as working on framing."
          icon={mockupECO}
          invert
        />
        <SlideIcon
          title="HeadMarket"
          subtitle="UI / UX Mockups | Presentations | Graphics"
          description="HeadMarket is an early-stage tech startup looking to revolutionise the way companies source and manage job candidates with an all-in-one online recruitment tool. We have so far helped them with a seed-stage investor presentation, and an array of mockups for their website-in-development."
          icon={mockupHM}
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

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      telephone: '',
      query: '',
      formStatus: 'idle',
      modalOpen: this.props.open,
    };

    this.formCallback = this.formCallback.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateFormComponent = this.updateFormComponent.bind(this);
    this.submissionInProgress = this.submissionInProgress.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      modalOpen: props.open,
    });
  }

  formCallback(type) {
    if (type === 'error') {
      this.setState({
        formStatus: 'failed',
      });
    } else {
      this.setState({
        formStatus: 'sent',
      });
    }
  }

  submissionInProgress() {
    console.log('submitPressed');
    this.setState({
      formStatus: 'sending',
    });
  }

  closeModal() {
    this.props.onClose();
    this.setState({
      modalOpen: false,
    });
  }

  updateFormComponent(event, component) {
    const value = event.target.value;

    console.log('should update component %s with value %s', component, value);

    this.setState({
      [component]: value
    });
  }

  render() {

    const disableItems = (this.state.formStatus !== 'idle');

    let headerText = 'Drop Us A Line.';
    let bodyTextTop = 'Fill in your details below, and let us know how we can help.';
    let bodyTextBottom = 'We aim to get back to you within 24 hours, during the week.';
    let buttonText = 'SUBMIT';

    switch (this.state.formStatus) {
      case 'idle':
        break;
      case 'sending':
        buttonText = 'SENDING...';
        break;
      case 'sent':
        headerText = 'Thanks!';
        bodyTextTop = 'You will hear from us soon.';
        buttonText = 'SENT';
        break;
      case 'failed':
        headerText = 'Oops!';
        bodyTextTop = 'There was an error processing your submission';
        bodyTextBottom = 'Please email us at missions@apollo27.com instead';
        buttonText = 'SENDING FAILED';
        break;
      default:
        break;
    }

    const buttonStyle = (disableItems) ? {opacity: '0.6', pointerEvents: 'none'} : {};

    return (
      <Modal
        isOpen={this.state.modalOpen}
        contentLabel="Modal"
        style={{
          overlay: {
            zIndex: 200000,
          },
          content: {
            top: '120px',
            bottom: '120px',
            left: '10vw',
            right: '10vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }
        }}
      >
        <div
          style={{
            right: '13vw',
            top: '160px',
            position: 'fixed',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '2rem',
            cursor: 'pointer',
            color: '#FF4242',
          }}
          onClick={() => this.closeModal()}
        >
          X
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h1 style={{ color: '#FF4242' }}>{headerText}</h1>
          <p>{bodyTextTop}<br />{bodyTextBottom}</p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginRight: '1.4rem',
            }}>
              <input
                className="text-field"
                size="32" type="text"
                placeholder="Name"
                onChange={(event, value) => this.updateFormComponent(event, 'name')}
                disabled={disableItems}
              />
              <input
                className="text-field"
                size="32" type="text"
                placeholder="Email Address"
                onChange={(event, value) => this.updateFormComponent(event, 'email')}
                disabled={disableItems}
              />
              <input
                className="text-field"
                size="32" type="text"
                placeholder="Telephone (incl. country code)"
                onChange={(event, value) => this.updateFormComponent(event, 'telephone')}
                disabled={disableItems}
              />
            </div>
            <textarea
              className="text-field"
              cols="31"
              rows="4"
              placeholder="How can we help?"
              onChange={(event, value) => this.updateFormComponent(event, 'query')}
              disabled={disableItems}
            />
          </div>
          <FormCharm
            data={{
              name: this.state.name,
              email: this.state.email,
              telephone: this.state.telephone,
              query: this.state.query,
            }}
            callback={type => this.formCallback(type)}
          >
            <div
              className="submit-button"
              onClick={() => this.submissionInProgress()}
              style={buttonStyle}
            >
              {buttonText}
            </div>
          </FormCharm>
        </div>
      </Modal>
    );
  }
}
ModalForm.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
};

export default class Index extends React.Component {

  constructor(props) {
    super(props);

    const canUseDOM = ExecutionEnvironment.canUseDOM;

    if (canUseDOM) {
      this.state = {
        canUseDOM: ExecutionEnvironment.canUseDOM,
        didLoad: false,
        hasInteracted: false,
        loadingProgressPercent: 0,
        windowDimensions: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        contactOpen: false,
      };
    } else {
      this.state = {
        canUseDOM: ExecutionEnvironment.canUseDOM,
        hasInteracted: false,
      };
    }

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
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }

  render() {
    const canUseDOM = this.state.canUseDOM;
    let canvas = null;

    // let windowDimensions = null;

    if (canUseDOM) {
      canvas = (
        <Starfield
          onInteraction={() => this.setState({ hasInteracted: true })}
          didLoad={() => this.setState({ didLoad: true })}
          updateLoadingProgress={progress => this.setState({ loadingProgressPercent: progress })}
        />
      );
    }

    return (
      <StickyContainer>
        <Helmet
          title={config.siteTitle} meta={[
            {
              name: 'description',
              content: 'Apollo27 — creators of digital experiences.',
            }, {
              name: 'keywords',
              content: 'apollo27, web, design, graphics, freelance',
            }, {
              name: 'og:title',
              content: 'Apollo27 | Digital Design',
            }, {
              name: 'og:description',
              content: 'Creators of digital experiences.',
            }, {
              name: 'og:image',
              content: ogImage,
            },
          ]}
        />
        <div style={{ backgroundColor: '#222' }}>
          <input type="checkbox" className="switch" checked={this.state.hasInteracted} readOnly />
          <StarfieldEnclosure
            hasInteracted={this.state.hasInteracted}
            hasLoaded={this.state.didLoad}
            loadingProgressPercent={this.state.loadingProgressPercent}
          >
            {canvas}
          </StarfieldEnclosure>
        </div>
        <StickyNav
          windowDimensions={this.state.windowDimensions || { width: 0, height: 0 }}
          contactOpen={() => this.setState({ contactOpen: true })}
        />
        <Element name="intro_pane" className="element">
          <IntroPane />
        </Element>
        <hr className="section-divider" />
        <Element name="services_pane" className="element">
          <ServicesPane
            content={[[
              {
                title: 'Web',
                detail: 'HTML/CSS, Javascript, React.JS, Wordpress, and hosting',
                icon: webIcon,
              },
              {
                title: 'Mobile Apps',
                detail: 'Native apps for iOS (Swift) — billingual apps in React Native',
                icon: mobileIcon,
              },
              {
                title: 'Graphics',
                detail: 'Anything from simple icons to complex infographics',
                icon: graphicsIcon,
              }],
              [{
                title: 'Branding',
                detail: 'Logo design, typography, colour, and iconography',
                icon: brandingIcon,
              },
              {
                title: 'Documents',
                detail: 'Content and formatting for any type of business documentation',
                icon: documentIcon,
              },
              {
                title: 'Presentations',
                detail: 'Advanced Keynote, PowerPoint and video presentations',
                icon: presentationIcon,
              }],
            ]}
          />
        </Element>
        <hr className="section-divider" />
        <Element name="clients_pane" className="element">
          <ClientsPane />
        </Element>
        <ModalForm
          open={this.state.contactOpen}
          onClose={() => this.setState({ contactOpen: false })}
        />
        <UnderDevelopmentSign />
      </StickyContainer>
    );
  }
}
