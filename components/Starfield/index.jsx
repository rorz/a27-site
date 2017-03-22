import React from 'react';

// ** REACT THREE ** //
import React3 from 'react-three-renderer';
import * as THREE from 'three';
// ** REACT THREE ** //

const ParticleCount = 200;

function NewParticlePos() {
  return ((2 * Math.random()) - 1) * ParticleCount;
}

function NewPosition(x, y, z) {
  return new THREE.Vector3(
    x,
    y,
    z,
  );
}

function NewRotation(x, y, z) {
  return new THREE.Euler(
    -x * 0.0001,
    -y * 0.0001,
    z,
  );
}

export default class Starfield extends React.Component {
  constructor(props, context) {
    super(props, context);

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.

    this.renderClock = new THREE.Clock(true);

    this.cameraPosition = new THREE.Vector3(0, 0, 50);

    const textureLoader = new THREE.TextureLoader();
    const sprite1 = textureLoader.load('./snowflake.png');
    const sprite2 = textureLoader.load('./snowflake-2.png');
    const sprite3 = textureLoader.load('./snowflake-3.png');
    const sprite4 = textureLoader.load('./snowflake-4.png');
    const sprite5 = textureLoader.load('./snowflake-5.png');

    this.particleParameters = [
      [
        [1.0, 0.2, 0.5],
        sprite2,
        3,
      ],
      [
        [0.95, 0.1, 0.5],
        sprite3,
        15,
      ],
      [
        [0.90, 0.05, 0.5],
        sprite1,
        7,
      ],
      [
        [0.85, 0, 0.5],
        sprite5,
        8,
      ],
      [
        [0.80, 0, 0.5],
        sprite4,
        5,
      ],
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

    this.onAnimate = () => {
            // we will get this callback every frame

      if (this.state.particleVertices != null) {
        this.updateParticles(() => {
          this.particleSystem = this.createParticleSystem();
        });
      }
    };
  }

  componentWillMount() {
    this.particleSystem = this.createParticleSystem();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleScroll(event) {
    const scrollTop = event.srcElement.body.scrollTop;

    this.setState({
      scrollPosition: scrollTop,
    });
  }

  handleMouseMove(event) {
    const mousePosition = {
      x: event.x,
      y: event.y,
    };

    if (mousePosition.x > 0 || mousePosition.y > 0) {
      this.props.onInteraction();
    }

    this.setState({
      mousePosition,
    });
  }

  updateParticles(callback) {
    const deltaTime = this.renderClock.getDelta();
      // Vertices
    const newVertices = this.state.particleVertices.map((vertex) => {
      const newVertex = vertex;

      if (vertex.z < (-2 * ParticleCount) || vertex.z > (ParticleCount)) {
        newVertex.z = NewParticlePos() * -2;
      }
      newVertex.z += 2 * deltaTime;
      return newVertex;
    });

    // Block rotation
    const newRotations = this.state.particleRotations.map((rotation) => {
      const rotationIndex = this.state.particleRotations.indexOf(rotation);
      const parallax = this.parallaxValues[rotationIndex];

      // Need to create a new Euler instead of directly modifying the old one
      // SEE NewRotation() global for weightings
      const newRotation = NewRotation(
          this.state.mousePosition.y * parallax,
          this.state.mousePosition.x * parallax,
          rotation.z,
        );

      return newRotation;
    });

      // Block repositioning
    const newPositions = this.state.particlePositions.map((position) => {
      const positionIndex = this.state.particlePositions.indexOf(position);
      const parallax = this.parallaxValues[positionIndex];

      const newPosition = NewPosition(
          position.x,
          this.state.scrollPosition * 0.1 * parallax,
          position.z,
        );

      return newPosition;
    });


    this.setState({
      particleVertices: newVertices,
      particleRotations: newRotations,
      particlePositions: newPositions,
    }, callback());
  }

  createParticleSystem() {
    const tempParticleArray = [];

    let geometryVertices = this.state.particleVertices;

    if (geometryVertices == null) {
      geometryVertices = [];

      for (let i = 0; i < ParticleCount; i += 1) {
        const vertex = new THREE.Vector3();
        vertex.x = NewParticlePos();
        vertex.y = NewParticlePos();
        vertex.z = NewParticlePos();
        geometryVertices.push(vertex);
      }
    }

    let particleRotations = this.state.particleRotations;
    if (particleRotations == null) {
      console.log('used null');
      particleRotations = [];
    }

    let particlePositions = this.state.particlePositions;
    if (particlePositions == null) {
      console.log('position null');
      particlePositions = [];
    }

    this.particleParameters.forEach((particleParameter) => {
      const colorBit = particleParameter[0];
      const particleColor = new THREE.Color();
      particleColor.setHSL(colorBit[0], colorBit[1], colorBit[2]);

      const particleSprite = particleParameter[1];
      const particleSize = particleParameter[2];

      const rotationIndex = this.particleParameters.indexOf(particleParameter);
      let particleRotation = particleRotations[rotationIndex];

      if (particleRotation == null) {
        const parallax = this.parallaxValues[rotationIndex];

        particleRotation = NewRotation(
                this.state.mousePosition.y * parallax,
                this.state.mousePosition.x * parallax,
                Math.random() * 6,
              );

        particleRotations.push(particleRotation);
      }

      let particlePosition = particlePositions[rotationIndex];

      if (particlePosition == null) {
        particlePosition = new THREE.Vector3(1, 1, 1);
        particlePositions.push(particlePosition);
      }


      const particles = (
        <points key={`pointBlock-${rotationIndex}`} rotation={particleRotation} position={particlePosition}>
          <geometry
            vertices={geometryVertices} // USE STATE OR OTHER
            dynamic
          />
          <pointsMaterial
            size={particleSize}
            map={particleSprite}
            blending={THREE.AdditiveBlending}
            depthTest={false}
            transparent
            color={particleColor}
          />
        </points>
            );
      tempParticleArray.push(particles);
    });

    this.setState({
      particleVertices: geometryVertices,
      particleRotations,
      particlePositions,
    });
    return tempParticleArray;
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    const particles = this.particleSystem.map(particle => particle);


    return (
      <div className="starfield-canvas">
        <React3
          mainCamera="camera" // points to the perspectiveCamera; name set to "camera" below
          width={width} height={height} onAnimate={this.onAnimate}
        >
          <scene fog={new THREE.Fog(0x000000, 0.0008)}>
            <perspectiveCamera
              name="camera"
              fov={70}
              aspect={width / height}
              near={1} far={1000}
              position={this.cameraPosition}
            />
            <directionalLight position={new THREE.Vector3(1, -1, 1)} />
            {particles}
          </scene>
        </React3>
      </div>
    );
  }
}
Starfield.propTypes = {
  onInteraction: React.PropTypes.func.isRequired,
};
