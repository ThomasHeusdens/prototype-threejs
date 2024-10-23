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

let astronaut, mercury, venus, earth, mars, jupiter, saturn, uranus, neptunus;
let mixerAstronaut, mixerMercury, mixerVenus, mixerEarth, mixerMars, mixerJupiter, mixerSaturn, mixerUranus, mixerNeptunus;
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
    if (mixerMars) mixerMars.update(0.006);
    if (mixerJupiter) mixerJupiter.update(0.1);
    if (mixerSaturn) mixerSaturn.update(0.01);
    if (mixerUranus) mixerUranus.update(0.001);
    if (mixerNeptunus) mixerNeptunus.update(0.001);
};
reRender3D();

let arrPositionModel = [
    {
        id: 'orderPlanets',
        position: { x: -6, y: -2.5, z: -30 },
        rotation: { x: 0, y: 0.8, z: 0 }
    },
    {
        id: 'orderPlanetsGood',
        position: { x: 4, y: -2.5, z: -30 },
        rotation: { x: 0, y: -0.3, z: 0 }
    },
    {
        id: 'startTest',
        position: { x: -5, y: -3.7, z: -30 },
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
        loader.load('assets/earth.glb', function (gltf) {
            earth = gltf.scene;
            earth.position.y = -2;
            earth.position.x = 6.8;
            earth.position.z = -300;
            earth.rotation.y = -0.5;
            scene.add(earth);

            mixerEarth = new THREE.AnimationMixer(earth);
            if (gltf.animations.length > 0) {
				console.log(gltf.animations)
                mixerEarth.clipAction(gltf.animations[0]).play();
            }
        });
        loader.load('assets/mars.glb', function (gltf) {
            mars = gltf.scene;
            mars.position.y = -1;
            mars.position.x = 10.2;
            mars.position.z = -140;
            mars.rotation.y = -0.5;
            scene.add(mars);

            mixerMars = new THREE.AnimationMixer(mars);
            if (gltf.animations.length > 0) {
				console.log(gltf.animations)
                mixerMars.clipAction(gltf.animations[0]).play();
            }
        });
        loader.load('assets/jupiter.glb', function (gltf) {
            jupiter = gltf.scene;
            jupiter.position.y = -6;
            jupiter.position.x = -8;
            jupiter.position.z = -105;
            jupiter.rotation.y = -0.5;
            jupiter.rotation.x = 0.3;
            jupiter.rotation.z = 0.3;
            scene.add(jupiter);

            mixerJupiter = new THREE.AnimationMixer(jupiter);
            if (gltf.animations.length > 0) {
				console.log(gltf.animations)
                mixerJupiter.clipAction(gltf.animations[0]).play();
            }
        });
        loader.load('assets/saturn.glb', function (gltf) {
            saturn = gltf.scene;
            saturn.position.y = -4;
            saturn.position.x = -1.75;
            saturn.position.z = -65;
            saturn.rotation.y = -0.5;
            saturn.rotation.z = -0.5;
            scene.add(saturn);

            mixerSaturn = new THREE.AnimationMixer(saturn);
            if (gltf.animations.length > 0) {
				console.log(gltf.animations)
                mixerSaturn.clipAction(gltf.animations[0]).play();
            }
        });
        loader.load('assets/uranus.glb', function (gltf) {
            uranus = gltf.scene;
            uranus.position.y = -2.27;
            uranus.position.x = 1;
            uranus.position.z = -31;
            uranus.scale.set(6.8, 6.8, 6.8);
            scene.add(uranus);

            mixerUranus = new THREE.AnimationMixer(uranus);
            if (gltf.animations.length > 0) {
				console.log(gltf.animations)
                mixerUranus.clipAction(gltf.animations[0]).play();
            }
        });
        loader.load('assets/neptune.glb', function (gltf) {
            neptunus = gltf.scene;
            neptunus.position.y = -32;
            neptunus.position.x = 42;
            neptunus.position.z = -610;
            neptunus.rotation.z = 0.1;
            scene.add(neptunus);

            mixerNeptunus = new THREE.AnimationMixer(neptunus);
            if (gltf.animations.length > 0) {
				console.log(gltf.animations)
                mixerNeptunus.clipAction(gltf.animations[0]).play();
            }
        });
    }
});

const planetsInput = document.querySelectorAll('.planet');
const planetsDiv = document.querySelector('.orderPlanets');

function checkAllCorrect() {
    let allCorrect = true;
    planetsInput.forEach(planet => {
        const correctPlanetName = planet.getAttribute('name');
        if (planet.value.trim().toLowerCase() !== correctPlanetName.toLowerCase()) {
            allCorrect = false;
        }
    });
    return allCorrect;
}

const modelSecondMove = () => {
    let findId = arrPositionModel.findIndex((val) => val.id == 'orderPlanetsGood');
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
    
planetsInput.forEach(planet => {
    planet.addEventListener('input', function() {
        const correctPlanetName = planet.getAttribute('name');
        if (planet.value.trim().toLowerCase() === correctPlanetName.toLowerCase()) {
            planet.style.borderBottom = "1px solid green";
        }

        if(checkAllCorrect()){
            planetsDiv.style.display = "none";
            mercury.visible = false;
            venus.visible = false;
            earth.visible = false;
            mars.visible = false;
            jupiter.visible = false;
            saturn.visible = false;
            uranus.visible = false;
            neptunus.visible = false;
            modelSecondMove();
            document.querySelector('.explanationMessage').style.display = "flex";
        }
    });
});

const modelThirdMove = () => {
    let findId = arrPositionModel.findIndex((val) => val.id == 'startTest');
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

document.querySelector('.buttonOk').addEventListener('click', () => {
    document.querySelector('.explanationMessage').style.display = "none";
    modelThirdMove();
    document.querySelector('.numberQuestion').style.display = "block";
    document.querySelector('.firstQuestion').style.display = "flex";
})

document.querySelector('.confirmFirstQuestion').addEventListener('click', () => {
    
})

