import * as THREE from 'three';

export const RADIUS = 1;

export function createGlobe() {
  const texture = new THREE.TextureLoader().load('/textures/mars.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;

  return new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS, 64, 64),
    new THREE.MeshStandardMaterial({ map: texture })
  );
}