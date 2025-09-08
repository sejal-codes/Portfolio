
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

// Scene + camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bgCanvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 3;

// Lights
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 1.5));

// Load Cloud GLB
const loader = new GLTFLoader();
let cloudModel;
loader.load('cloud.glb', function(gltf){
    cloudModel = gltf.scene;
    cloudModel.scale.set(1.5, 1.5, 1.5); // adjust size
    scene.add(cloudModel);
}, undefined, function(error){ console.error(error); });

// Animate
function animate(){
    requestAnimationFrame(animate);
    if(cloudModel){
        cloudModel.rotation.y += 0.005; // slow rotation
        cloudModel.rotation.x += 0.002;
    }
    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});