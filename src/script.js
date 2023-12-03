import * as THREE from "three";
import GUI from "lil-gui";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Canvas and Scene and Debug
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// Debug
const gui = new GUI({ width: 360 });
const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor");

/**
 * Test cube
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
scene.add(cube);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
scene.add(camera);

// Controls
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
// const clock = new THREE.Clock();
const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // Update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
