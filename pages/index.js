import React from 'react'
import {Link} from 'react-router'
import {prefixLink} from 'gatsby-helpers'
import Helmet from 'react-helmet'
import {config} from 'config'
import ExecutionEnvironment from 'exenv'; // Environment checking for universal apps
import ReactCursorPosition from 'react-cursor-position';

// ** REACT THREE ** //
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
// ** REACT THREE ** //

class Simple extends React.Component {
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

        this.particleCount = 200;
        this.particleParameters = [
            [
                [
                    1.0, 0.2, 0.5
                ],
                sprite2,
                3
            ],
            [
                [
                    0.95, 0.1, 0.5
                ],
                sprite3,
                15
            ],
            [
                [
                    0.90, 0.05, 0.5
                ],
                sprite1,
                7
            ],
            [
                [
                    0.85, 0, 0.5
                ],
                sprite5,
                8
            ],
            [
                [
                    0.80, 0, 0.5
                ],
                sprite4,
                5
            ]
        ];

        this.state = {
            cubeRotation: new THREE.Euler(),
            canUseDOM: ExecutionEnvironment.canUseDOM,
            particleVertices: null,
            particleRotations: null,
        };

        this._onAnimate = () => {
            // we will get this callback every frame

            // pretend cubeRotation is immutable.
            // this helps with updates and pure rendering.
            // React will be sure that the rotation has now updated.
            // this.animateParticles()

            if (this.state.particleVertices != null) {
              this.updateParticles(() => {
                this.particleSystem = this.createParticleSystem();
              })
            }


            this.setState({
                cubeRotation: new THREE.Euler(this.state.cubeRotation.x + 0.1, this.state.cubeRotation.y + 0.1, 0)
            });
        };
    }

    animateParticles() {
        for (let i = 0; i < this.state.particleSystem.length; i++) {

            let particleBlock = this.particleSystem[i];

            var verts = particleBlock.geometry.vertices;
            for (let ii = 0; ii < verts.length; ii++) {
                var vert = verts[ii];
                if (vert.z < -200) {
                    vert.z = Math.random() * 400 - 200;
                }
                vert.z = vert.z + (0.2 * deltaTime);
                // vert.y = vert.y - (lastScrollY * 0.002);
            }
            particleBlock.geometry.verticesNeedUpdate = true;

            particleBlock.rotation.y -= .005 * deltaTime;
            particleBlock.position.y = lastScrollY * 0.2 * parallaxVals[i];
            console.log('particle block: ' + i);
            particleBlock.rotation.x = .02 * mouseY * 0.01 * parallaxVals[i];
            particleBlock.rotation.y = .01 * mouseX * 0.01 * parallaxVals[i];

        }
    }

    updateParticles(callback) {

      const deltaTime = this.renderClock.getDelta();
      // Vertices
      const newVertices = this.state.particleVertices.map((vertex) => {
        vertex.z += 0.3 * deltaTime;
        return vertex;
      })

      // Block rotation
      const newRotations = this.state.particleRotations.map((rotation) => {
        rotation.z -= 0.5 * deltaTime;
        return rotation
      })

      this.setState({
        particleVertices: newVertices,
        particleRotations: newRotations,
      }, callback())
    }

    createParticleSystem() {
        var tempParticleArray = [];

        let geometryVertices = this.state.particleVertices;

        if (geometryVertices == null) {

          geometryVertices = [];

          for (let i = 0; i < this.particleCount; i++) {
              var vertex = new THREE.Vector3();
              vertex.x = (2*Math.random() - 1) * this.particleCount;
              vertex.y = (2*Math.random() - 1) * this.particleCount;
              vertex.z = (2*Math.random() - 1) * this.particleCount;
              geometryVertices.push(vertex);
          }
        }

        let particleRotations = this.state.particleRotations;
        if (particleRotations == null) {
          particleRotations = [];
        }

        for (const particleParameter of this.particleParameters) {
            const particleColor = particleParameter[0];
            const particleSprite = particleParameter[1];
            const particleSize = particleParameter[2];

            const rotationIndex = this.particleParameters.indexOf(particleParameter);
            let particleRotation = particleRotations[rotationIndex];
            if (particleRotation == null) {
              particleRotation = new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6);
              particleRotations.push(particleRotation);
            }


            const particleFog = new THREE.FogExp2(0x000000, 0.0008);

            const particles = (
                <points rotation={particleRotation}>
                  <geometry vertices={geometryVertices} // USE STATE OR OTHER
                    dynamic={true}/>
                  <pointsMaterial size={particleSize} map={particleSprite} blending={THREE.AdditiveBlending} depthTest={false} transparent={true} color={particleColor} fog={particleFog}/>
                </points>
            )
            tempParticleArray.push(particles);
        }

        this.setState({
          particleVertices: geometryVertices,
          particleRotations: particleRotations,
        });
        return tempParticleArray;

    }

    componentWillMount() {
      this.particleSystem = this.createParticleSystem();
    }

    render() {

        if (!this.state.canUseDOM) {
            return null;
        }

        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height

        const particles = this.particleSystem.map((particle) => {
            return particle
        })


        return (
            <React3 mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
              width={width} height={height} onAnimate={this._onAnimate}>
              <scene>
                <perspectiveCamera name="camera" fov={70} aspect={width / height} near={1} far={1000} position={this.cameraPosition}/>
                <directionalLight position={new THREE.Vector3(1, -1, 1)}/>
                {particles}
                <mesh rotation={this.state.cubeRotation}>
                  <boxGeometry width={1} height={1} depth={1}/>
                  <meshBasicMaterial color={0x00ff00}/>
                </mesh>
              </scene>
            </React3>
        );
    }
}

export default class Index extends React.Component {
    render() {
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
              <ReactCursorPosition>
                <Simple/>
              </ReactCursorPosition>
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
