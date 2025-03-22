import React from "react";
import useWindowSize from "@rooks/use-window-size";
import ParticleImage, { forces, Vector } from "react-particle-image";
// import img from '../../assets/logo.png'
let img = 'https://cdn-icons-png.flaticon.com/512/11396/11396189.png'
const round = (n, step = 20) => Math.ceil(n / step) * step;
const STEP = 30;

const particleOptions = {
  filter: ({ x, y, image }) => {
    const pixel = image.get(x, y);
    const magnitude = (pixel.r + pixel.g + pixel.b) / 3;
    return magnitude < 200;
  },
  color: ({ x, y, image }) => {
    const pixel = image.get(x, y);
    return `rgba(
      ${round(pixel.r, STEP)}, 
      ${round(pixel.g, STEP)}, 
      ${round(pixel.b, STEP)}, 
      ${round(pixel.a, STEP) / 255}
    )`;
  },
  radius: ({ x, y, image }) => {
    const pixel = image.get(x, y);
    const magnitude = (pixel.r + pixel.g + pixel.b) / 3;
    return 3 - (magnitude / 255) * 1.5;
  },
  mass: () => 40,
  friction: () => 0.15,
  initialPosition: ({ canvasDimensions }) => {
    return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  }
};

const motionForce = (x, y) => {
  return forces.disturbance(x, y, 7);
};

const App = () => {
  const { innerWidth, innerHeight } = useWindowSize();

  return (
    <div className="container">
      <ParticleImage
        src={img}
        width={Math.min(innerWidth, 480)}  
        height={Math.min(innerHeight, 450)}  
        scale={0.9}
        entropy={1}
        maxParticles={15000}
        particleOptions={particleOptions}
        mouseMoveForce={motionForce}
        touchMoveForce={motionForce}
        backgroundColor="transparent"  // Set background color to transparent
        style={{ borderRadius: '15px',
        //  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            marginBottom : 100
         }}
      />
    </div>
  );
};

export default App;