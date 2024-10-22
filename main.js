import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(
	10,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let astronaut;
let mixer;
const loader = new GLTFLoader();
loader.load('/astronaut_swimming.glb',
	function (gltf) {
		astronaut = gltf.scene;
		astronaut.position.y = -3.5;
		astronaut.position.x = 4; 
		astronaut.position.z = -28;
		astronaut.rotation.y = -0.4;
		scene.add(astronaut);

		mixer = new THREE.AnimationMixer(astronaut)
		mixer.clipAction(gltf.animations[0]).play();
		console.log(gltf.animations)
	},
	function (xhr) {},
	function (error) {}
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const reRender3D = () => {
	requestAnimationFrame(reRender3D);
	renderer.render(scene, camera);
	if(mixer) mixer.update(0.02);
};
reRender3D();
