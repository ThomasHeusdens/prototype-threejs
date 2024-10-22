import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { gsap } from 'gsap';

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

loader.load('/astronaut_swimming.glb', function (gltf) {
	astronaut = gltf.scene;
	astronaut.position.y = -3.5;
	astronaut.position.x = 4; 
	astronaut.position.z = -28;
	astronaut.rotation.y = -0.5;
	scene.add(astronaut);

	mixer = new THREE.AnimationMixer(astronaut);
	mixer.clipAction(gltf.animations[0]).play();
	console.log(gltf.animations);
});

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
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
	if (mixer) mixer.update(0.02);
};
reRender3D();

let arrPositionModel = [
	{
		id: 'orderPlanets',
		position: { x: -6, y: -2.5, z: -30 },
		rotation: { x: 0, y: 0.8, z: 0 }
	}
];

const modelFirstMove = () => {
	let findId = arrPositionModel.findIndex((val) => val.id == 'orderPlanets');
	let newCoordinates = arrPositionModel[findId];
	gsap.to(astronaut.position, {
		x: newCoordinates.position.x,
		y: newCoordinates.position.y,
		z: newCoordinates.position.z,
		duration: 2,
		ease: 'power1.out'
	});
	gsap.to(astronaut.rotation, {
		x: newCoordinates.rotation.x,
		y: newCoordinates.rotation.y,
		z: newCoordinates.rotation.z,
		duration: 2,
		ease: 'power1.out'
	});
};

document.querySelector('.buttonStart').addEventListener('click', () => {
	if (astronaut) {
		document.querySelector('.home').style.display = 'none';
		document.querySelector('.orderPlanets').style.display = 'flex';

		modelFirstMove();
		let mercury;
		loader.load('/mercury.glb', function (gltf) {
			mercury = gltf.scene;
			mercury.position.y = -3.5;
			mercury.position.x = 4;
			mercury.position.z = -160;
			mercury.rotation.y = -0.5;

			scene.add(mercury);
			// const controls = new OrbitControls(camera, renderer.domElement);
			// controls.target.set(mercury.position.x, mercury.position.y, mercury.position.z);
			// controls.update();
		});
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('containerPlanets').appendChild(renderer.domElement);

		const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
		scene.add(ambientLight);

		const topLight = new THREE.DirectionalLight(0xffffff, 1);
		topLight.position.set(500, 500, 500);
		scene.add(topLight);
	}
});
