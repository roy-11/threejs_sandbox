import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";

// import imagaeSource from "../static/textures/door/normal.jpg";
// console.log(imagaeSource);

// Textures
// const image = new Image();
// const texture = new THREE.Texture(image);
// texture.needsUpdate = true;
// image.onload = () => {
//   texture.needsUpdate = false;
//   console.log(texture);
// };
//
// image.src = "/textures/door/color.jpg";

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("loading started");
};
loadingManager.onLoad = () => {
  console.log("loading finished");
};
loadingManager.onProgress = () => {
  console.log("loading progressing");
};
loadingManager.onError = () => {
  console.log("loading error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const color = textureLoader.load("/textures/door/color.jpg");
const alpha = textureLoader.load("/textures/door/alpha.jpg");
const height = textureLoader.load("/textures/door/height.jpg");
const normal = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusion = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalness = textureLoader.load("/textures/door/metalness.jpg");
const roughness = textureLoader.load("/textures/door/roughness.jpg");
const checker1 = textureLoader.load("/textures/checkerboard-1024x1024.png");
const checker2 = textureLoader.load("/textures/checkerboard-8x8.png");
const minecraft = textureLoader.load("/textures/minecraft.png");
const selected = minecraft;

// selected.repeat.x = 2;
// selected.repeat.y = 3;
// selected.wrapS = THREE.RepeatWrapping;
// selected.wrapT = THREE.RepeatWrapping;
// selected.wrapS = THREE.MirroredRepeatWrapping;
// selected.wrapT = THREE.MirroredRepeatWrapping;

// selected.offset.x = 0.5;
// selected.offset.y = 0.5;
// selected.rotation = Math.PI * 0.25;
// selected.center.x = 0.5;
// selected.center.y = 0.5;

selected.minFilter = THREE.NearestFilter;
selected.magFilter = THREE.NearestFilter;

// Debug
const gui = new dat.GUI();

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: selected });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// const positionsArray = new Float32Array(9);
// positionsArray[0] = 0;
// positionsArray[1] = 0;
// positionsArray[2] = 0;
// positionsArray[3] = 0;
// positionsArray[4] = 1;
// positionsArray[5] = 0;
// positionsArray[6] = 1;
// positionsArray[7] = 0;
// positionsArray[8] = 0;

// const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", positionsAttribute);
//
// const count = 50;
// const positionsArray = new Float32Array(count * 3 * 3);
//
// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = Math.random() - 0.5;
// }
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute("position", positionsAttribute);
//
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });
//
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const parameters = {
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
  },
};

// Debug
// gui.add(mesh.position, "x", -3, 3, 0.01);
// gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "z", -3, 3, 0.01);
gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("X");
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Y");
gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name("Z");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(material, "color");
gui.add(parameters, "spin");

// Size
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

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
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
// controls.enabled = false;
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Cursor
// const cursor = {
//   x: 0,
//   y: 0,
// };
//
// window.addEventListener("mousemove", (event) => {
//   console.log(cursor.x, cursor.y);
//
//   if (event.clientX >= 0 && event.clientX <= sizes.width) {
//     cursor.x = event.clientX / sizes.width - 0.5; // -0.5 ~ 0.5
//   }
//   if (event.clientY >= 0 && event.clientY <= sizes.height) {
//     cursor.y = -(event.clientY / sizes.height - 0.5); // -0.5 ~ 0.5
//   }
// });

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
