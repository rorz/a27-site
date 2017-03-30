import React from 'react';
// import { Link } from 'react-router';
// import { prefixLink } from 'gatsby-helpers';
import { Container } from 'react-responsive-grid'
import Helmet from 'react-helmet';
import { config } from 'config';
import ExecutionEnvironment from 'exenv'; // Environment checking for universal apps

import Starfield from '../components/Starfield';
import Typist from 'react-typist';

import './styles.scss';

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

class TypistCycle extends React.Component {
  constructor(props) {
    super(props);

    this.totalCycles = this.props.numberOfCycles;
    this.isInfinite = (this.totalCycles < 0);

    this.lineDidFinish = this.lineDidFinish.bind(this);

    this.state = {
      currentLine: 0,
      cyclesCompleted: 0,
    };
  }

  lineDidFinish() {
    let nextLine = this.state.currentLine;
    if (nextLine >= this.props.content.length) {
      nextLine = 0;
    } else {
      nextLine += 1;
    }

    let nextCycle = this.state.cyclesCompleted;
    if (nextLine === 0) {
      nextCycle += 1;
    }

    setTimeout(() => {
      this.setState({
        currentLine: nextLine,
        cyclesCompleted: nextCycle,
      });
    }, this.props.segmentDelay*1000);
  }

  render() {
    const shouldCallback = (this.state.cyclesCompleted < this.totalCycles || (this.isInfinite));
    const callback = shouldCallback ? this.lineDidFinish : null;

    const lineToPrint = this.props.content[this.state.currentLine];

    const typistKey = `typist-${this.state.currentLine}:${this.state.cyclesCompleted}`;

    const typist = (
      <Typist key={typistKey} className="starfield-byline" onTypingDone={() => callback()}>
        {lineToPrint}
      </Typist>
    );

    return (
      <div>
        {typist}
      </div>
    );
  }
}
TypistCycle.propTypes = {
  numberOfCycles: React.PropTypes.number,
  content: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  segmentDelay: React.PropTypes.number,
};
TypistCycle.defaultProps = {
  numberOfCycles: 1,
  segmentDelay: 0.44,
};

function StarfieldOverlay() {
  return (
    <div className="starfield-overlay">
      <h1>Apollo 27</h1>
      <TypistCycle
        content={['Digital design and consulting.', 'Creators of compelling interactive experiences.', 'Made in the UK.']}
        numberOfCycles={1}
        segmentDelay={0.8}
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
        <h2>Let us propell your idea<br />to the stratosphere.</h2>
      </div>
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
      <div>
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
        <IntroPane />
        <IntroPane />
        <IntroPane />
      </div>
    );
  }
}
