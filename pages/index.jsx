import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Helmet from 'react-helmet';
import { config } from 'config';
import ExecutionEnvironment from 'exenv'; // Environment checking for universal apps

import Starfield from '../components/Starfield';

import './styles.scss';

function StarFieldEnclosure(props) {
  return (
    <div className={'starfield-enclosure'}>
      {props.children}
    </div>
  );
}

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canUseDOM: ExecutionEnvironment.canUseDOM,
    };
  }

  render() {
    const canUseDOM = this.state.canUseDOM;
    let canvas = null;

    if (canUseDOM) {
      canvas = (
        <Starfield />
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
        <StarFieldEnclosure>
          {canvas}
        </StarFieldEnclosure>
        <h1>
                Hi Chris
              </h1>
      </div>
    );
  }
}
