import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createGlobe } from './globe.js';
import { setupPicking } from './picking.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(5, 3, 5);
scene.add(sun);

const globe = createGlobe();
scene.add(globe);

const controls = new OrbitControls(camera, renderer.domElement);

setupPicking({
  camera,
  canvas: renderer.domElement,
  globe,
  onPick: ({ lat, lon }) => {
    console.log(`Latitude: ${lat.toFixed(2)}°  Longitude: ${lon.toFixed(2)}°`);
  },
});

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});