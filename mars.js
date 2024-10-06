import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const marsGroup = new THREE.Group();
scene.add(marsGroup);
new OrbitControls(camera, renderer.domElement);

const detail = 12;
const Loader = new THREE.TextureLoader();

// Mars geometry and material
const geo = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: Loader.load("./8k_mars.jpg"),  // Mars surface texture
});

const marsMesh = new THREE.Mesh(geo, material);
marsGroup.add(marsMesh);

// Adding light to illuminate Mars
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

function animate(t = 0) {
  requestAnimationFrame(animate);
  marsMesh.rotation.y += 0.002;  // Slow rotation of Mars
  renderer.render(scene, camera);
}

animate();
renderer.render(scene, camera);

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
