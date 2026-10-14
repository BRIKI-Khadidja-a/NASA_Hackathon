import * as THREE from 'three';

export function pointToLatLon(p) {
  const lat = Math.asin(p.y) * 180 / Math.PI;
  const lon = -Math.atan2(p.z, p.x) * 180 / Math.PI;
  return { lat, lon };
}

export function setupPicking({ camera, canvas, globe, onPick }) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObject(globe);
    if (hits.length === 0) return;

    const point = hits[0].point.clone().normalize();
    onPick({ ...pointToLatLon(point), point });
  });
}