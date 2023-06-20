import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Size
const sizes = {
  width: 800,
  height: 600,
};

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  console.log(cursor.x, cursor.y);

  if (event.clientX >= 0 && event.clientX <= sizes.width) {
    cursor.x = event.clientX / sizes.width - 0.5; // -0.5 ~ 0.5
  }
  if (event.clientY >= 0 && event.clientY <= sizes.height) {
    cursor.y = -(event.clientY / sizes.height - 0.5); // -0.5 ~ 0.5
  }
});

// PerspectiveCamera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);

// OrthographicCamera
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

// position
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;

scene.add(camera);
camera.lookAt(mesh.position);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animation
const tick = () => {
  // Update camera by cursor
  // camera.position.x = cursor.x * 3;
  // camera.position.y = cursor.y * 3;
  // console.log("cursor.x", cursor.x * Math.PI * 2); // -3.14 ~ 3.14
  // console.log("sin:", Math.sin(cursor.x * Math.PI * 2)); // 0 → 1 → 0 → -1 → 0
  // console.log("cos:", Math.cos(cursor.x * Math.PI * 2)); // -1 → 0 → 1 → 0 → -1
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // Update controls
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
