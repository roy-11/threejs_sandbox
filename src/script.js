import * as THREE from "three";
import gsap from "gsap";

console.log(THREE);

// Scene
const scene = new THREE.Scene();

// Objects
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 1.5;
group.add(cube3);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);

// Rotation
// mesh.rotation.x = Math.PI;
// mesh.rotation.x = Math.PI * 0.5;
// mesh.rotation.x = Math.PI / 2;
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// Others
// console.log("length:", mesh.position.length());
// console.log("distance:", mesh.position.distanceTo(new THREE.Vector3(0, 1, 2)));
// mesh.position.normalize();

// Axes helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Size
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
camera.lookAt(mesh.position);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

/**
 * Animate
 */

// let time = Date.now();
const clock = new THREE.Clock();

// Update objects By gsap
// gsap.to(mesh.position, { duration: 100, delay: 1, x: 200 });

const tick = () => {
  // Update objects By Frame
  // mesh.rotation.y += 0.01;

  // Update objects By Time
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;
  // mesh.rotation.y += 0.001 * deltaTime;

  // Update objects By Clock
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime;
  mesh.position.x = Math.cos(elapsedTime);
  mesh.position.y = Math.sin(elapsedTime);

  // Update camera By Clock
  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);
  camera.lookAt(mesh.position);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
