import React from 'react'
import {Link} from 'react-router'
import {prefixLink} from 'gatsby-helpers'
import Helmet from 'react-helmet'
import {config} from 'config'
import ExecutionEnvironment from 'exenv'; // Environment checking for universal apps

// ** REACT THREE ** //
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
// ** REACT THREE ** //

import './styles.scss';

const ParticleCount = 200;

function NewParticlePos() {
  return (2*Math.random() - 1) * ParticleCount;
}

function NewPosition(x, y, z) {
  return new THREE.Vector3(
    x,
    y,
    z
  );
}

function NewRotation(x, y, z) {
  return new THREE.Euler(
    -x * 0.0001,
    -y * 0.0001,
    z
  );
}

function StarFieldEnclosure(props) {
  return (
    <div className={'starfield-enclosure'}>
      {props.children}
    </div>
  )
}

class Starfield extends React.Component {
    constructor(props, context) {
        super(props, context);

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.

        this.renderClock = new THREE.Clock(true);

        this.cameraPosition = new THREE.Vector3(0, 0, 50);

        var textureLoader = new THREE.TextureLoader();
        const sprite1 = textureLoader.load("./snowflake.png");
        const sprite2 = textureLoader.load("./snowflake-2.png");
        const sprite3 = textureLoader.load("./snowflake-3.png");
        const sprite4 = textureLoader.load("./snowflake-4.png");
        const sprite5 = textureLoader.load("./snowflake-5.png");

        this.particleParameters = [
            [
                [1.0, 0.2, 0.5],
                sprite2,
                3
            ],
            [
                [0.95, 0.1, 0.5],
                sprite3,
                15
            ],
            [
                [0.90, 0.05, 0.5],
                sprite1,
                7
            ],
            [
                [0.85, 0, 0.5],
                sprite5,
                8
            ],
            [
                [0.80, 0, 0.5],
                sprite4,
                5
            ]
        ];

        this.parallaxValues = [2.0, 0.6, 1.2, 0.8, 0.9];

        this.state = {
            particleVertices: null, // Individual Vertices
            particleRotations: null, // Per block
            particlePositions: null, // Per block
            scrollPosition: 0,
            mousePosition: {
              x: 0,
              y: 0,
            },
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

        this._onAnimate = () => {
            // we will get this callback every frame

            if (this.state.particleVertices != null) {
              this.updateParticles(() => {
                this.particleSystem = this.createParticleSystem();
              })
            }
        };
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillMount() {
      this.particleSystem = this.createParticleSystem();
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleScroll(event) {
      const scrollTop = event.srcElement.body.scrollTop;

      this.setState({
        scrollPosition: scrollTop,
      })
    }

    handleMouseMove(event) {
      console.log(event);
      const mousePosition = {
        x: event.x,
        y: event.y,
      }

      this.setState({
        mousePosition: mousePosition,
      })
    }

    updateParticles(callback) {

      const deltaTime = this.renderClock.getDelta();
      // Vertices
      const newVertices = this.state.particleVertices.map((vertex) => {
        if (vertex.z < (-2 * ParticleCount) || vertex.z > (ParticleCount)) {
          vertex.z = NewParticlePos()*-2;
        }
        vertex.z += 2 * deltaTime;
        return vertex;
      })

      // Block rotation
      const newRotations = this.state.particleRotations.map((rotation) => {

        const rotationIndex = this.state.particleRotations.indexOf(rotation);
        const parallax = this.parallaxValues[rotationIndex];

        // Need to create a new Euler instead of directly modifying the old one — SEE NewRotation() global for weightings
        rotation = NewRotation(
          this.state.mousePosition.y*parallax,
          this.state.mousePosition.x*parallax,
          rotation.z
        )

        return rotation
      })

      // Block repositioning
      const newPositions = this.state.particlePositions.map((position) => {
        const positionIndex = this.state.particlePositions.indexOf(position);
        const parallax = this.parallaxValues[positionIndex];

        position = NewPosition(
          position.x,
          this.state.scrollPosition*0.1,
          position.z
        );

        return position;
      })


      this.setState({
        particleVertices: newVertices,
        particleRotations: newRotations,
        particlePositions: newPositions,
      }, callback())
    }

    createParticleSystem() {
        var tempParticleArray = [];

        let geometryVertices = this.state.particleVertices;

        if (geometryVertices == null) {

          geometryVertices = [];

          for (let i = 0; i < ParticleCount; i++) {
              var vertex = new THREE.Vector3();
              vertex.x = NewParticlePos();
              vertex.y = NewParticlePos();
              vertex.z = NewParticlePos();
              geometryVertices.push(vertex);
          }
        }

        let particleRotations = this.state.particleRotations;
        if (particleRotations == null) {
          console.log("used null");
          particleRotations = [];
        }

        let particlePositions = this.state.particlePositions;
        if (particlePositions == null) {
          console.log("position null");
          particlePositions = [];
        }

        for (const particleParameter of this.particleParameters) {

            const colorBit = particleParameter[0];
            const hslColorString = new String('hsl(%s, %s, %s)', colorBit[0], colorBit[1], colorBit[2])

            const particleColor = new THREE.Color(hslColorString);
            const particleSprite = particleParameter[1];
            const particleSize = particleParameter[2];

            const rotationIndex = this.particleParameters.indexOf(particleParameter);
            let particleRotation = particleRotations[rotationIndex];

            if (particleRotation == null) {

              let parallax = this.parallaxValues[rotationIndex];

              particleRotation = NewRotation(
                this.state.mousePosition.y*parallax,
                this.state.mousePosition.x*parallax,
                Math.random() * 6
              )

              particleRotations.push(particleRotation);
            }

            let particlePosition = particlePositions[rotationIndex];

            if (particlePosition == null) {
              let parallax = this.parallaxValues[rotationIndex];

              particlePosition = new THREE.Vector3(1,1,1);
              particlePositions.push(particlePosition);

            }


            const particles = (
                <points key={'pointBlock-'+rotationIndex} rotation={particleRotation} position={particlePosition}>
                  <geometry vertices={geometryVertices} // USE STATE OR OTHER
                    dynamic={true}/>
                  <pointsMaterial size={particleSize} map={particleSprite} blending={THREE.AdditiveBlending} depthTest={false} transparent={true} color={particleColor} />
                </points>
            )
            tempParticleArray.push(particles);
        }

        this.setState({
          particleVertices: geometryVertices,
          particleRotations: particleRotations,
          particlePositions: particlePositions,
        });
        return tempParticleArray;

    }

    render() {

        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height

        const particles = this.particleSystem.map((particle) => {
            return particle
        })


        return (
            <React3 mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
              width={width} height={height} onAnimate={this._onAnimate}>
              <scene fog={new THREE.Fog(0x000000, 0.0008)}>
                <perspectiveCamera name="camera" fov={70} aspect={width / height} near={1} far={1000} position={this.cameraPosition}/>
                <directionalLight position={new THREE.Vector3(1, -1, 1)}/>
                {particles}
              </scene>
            </React3>
        );
    }
}

export default class Index extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        canUseDOM: ExecutionEnvironment.canUseDOM,
      }
    }

    render() {

      const canUseDOM = this.state.canUseDOM;
      let canvas = null

      if (canUseDOM) {
        canvas = (
          <Starfield/>
      )
      }

        return (
            <div>
              <Helmet title={config.siteTitle} meta={[
                {
                        "name": "description",
                        "content": "Sample"
                }, {
                        "name": "keywords",
                        "content": "sample, something"
                }
              ]}/>
              <StarFieldEnclosure>
                {canvas}
              </StarFieldEnclosure>
                <h1>
                  Hi people
                </h1>
                <p>Welcome to your new Gatsby site</p>
                <h2>Below are some pages showing different capabilities built-in to Gatsby</h2>
                <h3>Supported file types</h3>
                <ul>
                  <li>
                    <Link to={prefixLink('/markdown/')}>Markdown</Link>
                  </li>
                  <li>
                    <Link to={prefixLink('/react/')}>JSX (React components)</Link>
                  </li>
                  <li>
                    <Link to={prefixLink('/coffee-react/')}>CJSX (Coffeescript React components)</Link>
                  </li>
                  <li>
                    <Link to={prefixLink('/html/')}>HTML</Link>
                  </li>
                  <li>
                    <Link to={prefixLink('/json/')}>JSON</Link>
                  </li>
                  <li>
                    <Link to={prefixLink('/yaml/')}>YAML</Link>
                  </li>
                  <li>
                    <Link to={prefixLink('/toml/')}>TOML</Link>
                  </li>
                </ul>
                <h3>Supported CSS processors</h3>
                <ul>
                  <li>
                    <Link to={prefixLink('/postcss/')}>PostCSS</Link>
                  </li>
                  <li>
                    <Link to={prefixLink('/css-modules/')}>CSS Modules</Link>
                  </li>
                  <li>
                    <Link to={prefixLink('/sass/')}>Sass</Link>
                  </li>
                  <li>
                    <Link to={prefixLink('/less/')}>Less</Link>
                  </li>
                </ul>
                </div>
                )
                }
                }
