import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import gsap from "gsap";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

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
// const color = textureLoader.load("/textures/door/color.jpg");
// const alpha = textureLoader.load("/textures/door/alpha.jpg");
// const height = textureLoader.load("/textures/door/height.jpg");
// const normal = textureLoader.load("/textures/door/normal.jpg");
// const ambientOcclusion = textureLoader.load(
//   "/textures/door/ambientOcclusion.jpg"
// );
// const metalness = textureLoader.load("/textures/door/metalness.jpg");
// const roughness = textureLoader.load("/textures/door/roughness.jpg");
// const checker1 = textureLoader.load("/textures/checkerboard-1024x1024.png");
// const checker2 = textureLoader.load("/textures/checkerboard-8x8.png");
// const minecraft = textureLoader.load("/textures/minecraft.png");
//
const matcap = textureLoader.load("/textures/matcaps/1.png");
const matcap2 = textureLoader.load("/textures/matcaps/2.png");
const matcap3 = textureLoader.load("/textures/matcaps/3.png");
const matcap8 = textureLoader.load("/textures/matcaps/8.png");
// const gradient = textureLoader.load("/textures/gradients/3.jpg");
// const gradient5 = textureLoader.load("/textures/gradients/5.jpg");
// gradient.minFilter = THREE.NearestFilter;
// gradient.magFilter = THREE.NearestFilter;
// gradient.generateMipmaps = false;
//
// const cubeTextureLoader = new THREE.CubeTextureLoader()
// const envMapTexture = cubeTextureLoader.load([
//   "/textures/environmentMaps/0/px.jpg",
//   "/textures/environmentMaps/0/nx.jpg",
//   "/textures/environmentMaps/0/py.jpg",
//   "/textures/environmentMaps/0/ny.jpg",
//   "/textures/environmentMaps/0/pz.jpg",
//   "/textures/environmentMaps/0/nz.jpg",
// ]);
//
// const selected = minecraft;

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

// selected.minFilter = THREE.NearestFilter;
// selected.magFilter = THREE.NearestFilter;

// Debug
const gui = new dat.GUI();

// Scene
const scene = new THREE.Scene();

// Helper
const axisHelper = new THREE.AxesHelper();
// scene.add(axisHelper);

// Font
// const fontLoader = new FontLoader();
// fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
//   console.log("font loaded");
//   const textGeometry = new TextGeometry("Hello World", {
//     font: font,
//     size: 0.5,
//     height: 0.2,
//     curveSegments: 5,
//     bevelEnabled: true,
//     bevelThickness: 0.03,
//     bevelSize: 0.02,
//     bevelOffset: 0,
//     bevelSegments: 4,
//   });
//   //   textGeometry.computeBoundingBox()
//   //   textGeometry.translate(
//   //     - textGeometry.boundingBox.max.x * 0.5,
//   //     - textGeometry.boundingBox.max.y * 0.5,
//   //     - textGeometry.boundingBox.max.z * 0.5
//   // )
//   textGeometry.center();
//
//   const material = new THREE.MeshMatcapMaterial({ matcap: matcap8 });
//   // material.wireframe = true;
//   const text = new THREE.Mesh(textGeometry, material);
//   scene.add(text);
//
//   const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcap2 });
//   const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
//   for (let i = 0; i < 100; i++) {
//     const donut = new THREE.Mesh(donutGeometry, donutMaterial);
//
//     donut.position.x = (Math.random() - 0.5) * 100;
//     donut.position.y = (Math.random() - 0.5) * 100;
//     donut.position.z = (Math.random() - 0.5) * 100;
//     donut.rotation.x = Math.random() * Math.PI;
//     donut.rotation.y = Math.random() * Math.PI;
//     const scale = Math.random();
//     donut.scale.set(scale, scale, scale);
//
//     scene.add(donut);
//   }
//
//   const sphereMaterial = new THREE.MeshMatcapMaterial({ matcap: matcap3 });
//   const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
//   for (let i = 0; i < 100; i++) {
//     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//
//     sphere.position.x = (Math.random() - 0.5) * 100;
//     sphere.position.y = (Math.random() - 0.5) * 100;
//     sphere.position.z = (Math.random() - 0.5) * 100;
//     sphere.rotation.x = Math.random() * Math.PI;
//     sphere.rotation.y = Math.random() * Math.PI;
//     const scale = Math.random();
//     sphere.scale.set(scale, scale, scale);
//
//     scene.add(sphere);
//   }
//
//   const octahedronMaterial = new THREE.MeshMatcapMaterial({ matcap: matcap8 });
//   const octahedronGeometry = new THREE.OctahedronGeometry();
//   for (let i = 0; i < 100; i++) {
//     const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
//
//     octahedron.position.x = (Math.random() - 0.5) * 100;
//     octahedron.position.y = (Math.random() - 0.5) * 100;
//     octahedron.position.z = (Math.random() - 0.5) * 100;
//     octahedron.rotation.x = Math.random() * Math.PI;
//     octahedron.rotation.y = Math.random() * Math.PI;
//     const scale = Math.random();
//     octahedron.scale.set(scale, scale, scale);
//
//     scene.add(octahedron);
//   }
// });

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// console.log(geometry.attributes.uv);
// const material = new THREE.MeshBasicMaterial({ map: selected });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// Object 2
// const material2 = new THREE.MeshBasicMaterial({ color: "white" });
// material2.map = color;
// material2.color.set("blue");
// material2.color = new THREE.Color("pink");
// material2.wireframe = true;
// material2.opacity = 0.5;
// material2.transparent = true;
// material2.alphaMap = alpha;
// material2.side = THREE.DoubleSide;

// const material2 = new THREE.MeshNormalMaterial();
// material2.flatShading = true;

// const material2 = new THREE.MeshMatcapMaterial();
// material2.matcap = matcap8;

// const material2 = new THREE.MeshDepthMaterial();
// const material2 = new THREE.MeshLambertMaterial();

// const material2 = new THREE.MeshPhongMaterial();
// material2.shininess = 1000;
// material2.specular = new THREE.Color(0X1188ff);

// const material2 = new THREE.MeshToonMaterial();
// material2.gradientMap = gradient;

// const material2 = new THREE.MeshStandardMaterial();
// material2.metalness = 0;
// material2.roughness = 0;
// material2.map = color;
// material2.aoMap = ambientOcclusion;
// material2.aoMapIntensity = 10;
// material2.displacementMap = height;
// material2.displacementScale = 0.05;
// material2.metalnessMap = metalness;
// material2.roughnessMap = roughness;
// material2.normalMap = normal;
// material2.normalScale.set(1.5, 1.5);
// material2.transparent = true;
// material2.alphaMap = alpha;

// material2.metalness = 1;
// material2.envMap = envMapTexture;

// gui.add(material2, "metalness").min(0).max(1).step(0.0001);
// gui.add(material2, "roughness").min(0).max(1).step(0.0001);
// gui.add(material2, "aoMapIntensity").min(0).max(10).step(0.0001);
// gui.add(material2, "displacementScale").min(0).max(1).step(0.0001);

// const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
// const sphere = new THREE.Mesh(sphereGeometry, material2);
// sphere.position.x = -1.5;
//
// const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
// const plane = new THREE.Mesh(planeGeometry, material2);
//
// const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32);
// const torus = new THREE.Mesh(torusGeometry, material2);
// torus.position.x = 1.5;
// scene.add(sphere, plane, torus);

// Object 3
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

// Lights 1
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// Lights 2
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
gui
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("Ambient Light intensity");
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
gui
  .add(directionalLight.position, "x")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("Directional Light x");
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(1.5, -0, -1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

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

// const parameters = {
//   spin: () => {
//     gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
//   },
// };

// Debug
// gui.add(mesh.position, "x", -3, 3, 0.01);
// gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "z", -3, 3, 0.01);
// gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("X");
// gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Y");
// gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name("Z");
// gui.add(mesh, "visible");
// gui.add(material, "wireframe");
// gui.addColor(material, "color");
// gui.add(parameters, "spin");

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

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
camera.position.z = 10;

scene.add(camera);
// camera.lookAt(mesh.position);

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

// const clock = new THREE.Clock();

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

  // Update Object
  // const elapsedTime = clock.getElapsedTime();
  // sphere.rotation.y = 0.2 * elapsedTime;
  // plane.rotation.y = 0.2 * elapsedTime;
  // torus.rotation.y = 0.2 * elapsedTime;
  // sphere.rotation.x = 0.2 * elapsedTime;
  // plane.rotation.x = 0.2 * elapsedTime;
  // torus.rotation.x = 0.2 * elapsedTime;

  // Update controls
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
