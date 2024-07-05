import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import "./App.css";

const App = () => {
  //Canvas Initialization
  const canvasRef = useRef();

  //Rotation Speeds Initialization
  const [rotationSpeeds, setRotationSpeeds] = useState({
    box: 0.01,
    torus: 0.01,
    dodecahedron: 0.01,
  });

  //Visibility constraints for models
  const [visibility, setVisibility] = useState({
    box: false,
    torus: false,
    dodecahedron: false,
  });

  useEffect(() => {
    //Scene
    const scene = new THREE.Scene();

    //View/Camera angle of viewer
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    //WebGL renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, 650);

    //Box Initialization
    const geometryBox = new THREE.BoxGeometry(6, 6, 6);
    const materialBox = new THREE.MeshBasicMaterial({ color: "#E2DFD2", transparent: true, opacity: visibility.box ? 1 : 0 });
    const box = new THREE.Mesh(geometryBox, materialBox);
    scene.add(box);

    //Torus Initialization
    const geometryTorus = new THREE.TorusGeometry(5, 2, 16, 100);
    const materialTorus = new THREE.MeshBasicMaterial({ color: "#E2DFD2", transparent: true, opacity: visibility.torus ? 1 : 0 });
    const torus = new THREE.Mesh(geometryTorus, materialTorus);
    scene.add(torus);

    //Dodecahedron Initialization
    const geometryDodecahedron = new THREE.DodecahedronGeometry();
    const materialDodecahedron = new THREE.MeshBasicMaterial({
      color: "#E2DFD2", transparent: true, opacity: visibility.dodecahedron ? 1 : 0
    });
    const dodecahedron = new THREE.Mesh(
      geometryDodecahedron,
      materialDodecahedron
    );
    dodecahedron.scale.set(5, 5, 5);
    scene.add(dodecahedron);

    //Models Position
    box.position.x = -18;
    torus.position.x = 0;
    dodecahedron.position.x = 18;

    camera.position.z = 20;

    //Rotation Animations
    const animate = () => {
      requestAnimationFrame(animate);

      if (visibility.box) box.rotation.y += rotationSpeeds.box;
      if (visibility.torus) torus.rotation.y += rotationSpeeds.torus;
      if (visibility.dodecahedron)
        dodecahedron.rotation.y += rotationSpeeds.dodecahedron;

      renderer.setClearColor(0x374954);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      scene.remove(box);
      scene.remove(torus);
      scene.remove(dodecahedron);
    };
  }, [rotationSpeeds, visibility]);

  const handleSpeedChange = (e, object) => {
    setRotationSpeeds({
      ...rotationSpeeds,
      [object]: parseFloat(e.target.value),
    });
  };

  const handleVisibilityToggle = (object) => {
    setVisibility({
      ...visibility,
      [object]: !visibility[object],
    });
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <div className="flexToggles">
        <div>
          <button class="btn btn-secondary" onClick={() => handleVisibilityToggle("box")}>
            Toggle Box
          </button>
          <label>Box Speed: </label>
          <input className="bar"
            type="range"
            min="0"
            max="0.1"
            step="0.01"
            value={rotationSpeeds.box}
            onChange={(e) => handleSpeedChange(e, "box")}
          />
          <input
            type="number"
            min="0"
            max="0.1"
            step="0.01"
            value={rotationSpeeds.box}
            onChange={(e) => handleSpeedChange(e, "box")}
          />
        </div>

        <div>
          <button class="btn btn-secondary" onClick={() => handleVisibilityToggle("torus")}>
            Toggle Torus
          </button>
          <label>Torus Speed: </label>
          <input className="bar"
            type="range"
            min="0"
            max="0.1"
            step="0.01"
            value={rotationSpeeds.torus}
            onChange={(e) => handleSpeedChange(e, "torus")}
          />
          <input
            type="number"
            min="0"
            max="0.1"
            step="0.01"
            value={rotationSpeeds.torus}
            onChange={(e) => handleSpeedChange(e, "torus")}
          />
        </div>

        <div>
          <button class="btn btn-secondary" onClick={() => handleVisibilityToggle("dodecahedron")}>
            Toggle Dodecahedron
          </button>
          <label>Dodecahedron Speed: </label>
          <input className="bar"
            type="range"
            min="0"
            max="0.1"
            step="0.01"
            value={rotationSpeeds.dodecahedron}
            onChange={(e) => handleSpeedChange(e, "dodecahedron")}
          />
          <input
            type="number"
            min="0"
            max="0.1"
            step="0.01"
            value={rotationSpeeds.dodecahedron}
            onChange={(e) => handleSpeedChange(e, "dodecahedron")}
          />
        </div>
      </div>
    </div>
  );
};

export default App;