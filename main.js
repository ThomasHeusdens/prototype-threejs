import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';

import { gsap } from 'gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

let astronaut;
let mixerAstronaut, mixerMercury, mixerVenus, mixerEarth;
const loader = new GLTFLoader();

loader.load('assets/astronaut_swimming.glb', function (gltf) {
    astronaut = gltf.scene;
    astronaut.position.y = -3.5;
    astronaut.position.x = 4;
    astronaut.position.z = -28;
    astronaut.rotation.y = -0.5;
    scene.add(astronaut);

    mixerAstronaut = new THREE.AnimationMixer(astronaut);
    mixerAstronaut.clipAction(gltf.animations[0]).play();
});

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    
    if (mixerAstronaut) mixerAstronaut.update(0.02);
    if (mixerMercury) mixerMercury.update(0.05);
	if (mixerVenus) mixerVenus.update(0.05);
	if (mixerEarth) mixerEarth.update(0.006);
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
        loader.load('assets/mercury.glb', function (gltf) {
            mercury = gltf.scene;
            mercury.position.y = -3.5;
            mercury.position.x = -35;
            mercury.position.z = -500;
            mercury.rotation.y = -0.5;

            scene.add(mercury);

            mixerMercury = new THREE.AnimationMixer(mercury);
            if (gltf.animations.length > 0) {
                mixerMercury.clipAction(gltf.animations[0]).play();
            }
        });
		let venus;
        loader.load('assets/venus.glb', function (gltf) {
            venus = gltf.scene;
            venus.position.y = -0.3;
            venus.position.x = -1;
            venus.position.z = -31;
            venus.rotation.y = -0.5;
			venus.scale.set(0.011, 0.011, 0.011);
            scene.add(venus);

            mixerVenus = new THREE.AnimationMixer(venus);
            if (gltf.animations.length > 0) {
				console.log(gltf.animations)
                mixerVenus.clipAction(gltf.animations[0]).play();
            }
        });
		let earth;
        loader.load('assets/earth.glb', function (gltf) {
            earth = gltf.scene;
            earth.position.y = -2;
            earth.position.x = 7.5;
            earth.position.z = -300;
            earth.rotation.y = -0.5;
            scene.add(earth);

            mixerEarth = new THREE.AnimationMixer(earth);
            if (gltf.animations.length > 0) {
				console.log(gltf.animations)
                mixerEarth.clipAction(gltf.animations[0]).play();
            }
        });
    }
});
