import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from 'gsap';
import Typewriter from 'typewriter-effect/dist/core';

document.addEventListener('DOMContentLoaded', () => {
    const explanationText = document.querySelector('.explanationOrion p');
    
    if (explanationText) {
        new Typewriter(explanationText, {
            loop: false,
            delay: 20,
        })
        .typeString("Orion's constellation is one of the most known constellations. Its distinctive shape, resembling a hunter, is easily recognizable in the night sky. Orion is home to some of the brightest stars, including Betelgeuse, a red supergiant, and Rigel, a blue supergiant. The constellation also contains the Orion Nebula, one of the most studied star-forming regions in the universe, visible even with the naked eye. Ancient civilizations revered Orion, linking it to mythology and navigation, and today, it remains a central figure in both astronomy and cultural lore. Its visibility across both hemispheres makes it one of the most important constellations for stargazers around the world. Don't forget to click on the star you want to discover!")
        .start();
    }
});

let camera, scene, renderer, controls;
let bellatrix, betegeuse, alnitak, alnilam, mintaka, rigel, saiph;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

const infoPanel = document.getElementById("infoPanel");
const planetName = document.getElementById("planetName");
const planetDescription = document.getElementById("planetDescription");

const planetInfo = {
    betegeuse: { name: "Betelgeuse (Alpha Orionis)", description: "Located at Orion's shoulder, Betelgeuse is a massive red supergiant nearing the end of its life and expected to go supernova within the next million years. It has a diameter around 1,000 times that of the Sun." },
    bellatrix: { name: "Bellatrix (Gamma Orionis)", description: "Often called the Amazon Star, Bellatrix is Orion's right shoulder. It's a massive, luminous star that’s about eight times the mass of the Sun, with a brightness around 6,000 times that of our Sun." },
    alnitak: { name: "Alnitak (Zeta Orionis)", description: "Alnitak is another star in Orion’s Belt. It is also part of a triple star system, where the primary star is 28 times the mass of the Sun and is very luminous, emitting around 100,000 times the Sun’s light." },
    alnilam: { name: "Alnilam (Epsilon Orionis)", description: "The central star of Orion's Belt, Alnilam is an extremely luminous blue supergiant, radiating about 375,000 times the light of the Sun. Due to its mass, Alnilam has a shorter life expectancy and is expected to end its life in a supernova." },
    mintaka: { name: "Mintaka (Delta Orionis)", description: "Mintaka is one of the three stars in Orion's Belt. It’s part of a complex star system and is around 90,000 times more luminous than the Sun. This star system includes two massive stars orbiting each other." },
    rigel: { name: "Rigel (Beta Orionis)", description: "Rigel marks Orion's left foot and is one of the brightest stars in the night sky. It is approximately 21 times as massive as the Sun and emits about 120,000 times more light. Rigel is part of a star system with smaller companion stars." },
    saiph: { name: "Saiph (Kappa Orionis)", description: "Located at Orion's right knee, Saiph is a blue supergiant that, despite being slightly less luminous than Rigel, is still 65,000 times more luminous than the Sun." }
};

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const container = document.getElementById("containerRoom3D");
container.appendChild(renderer.domElement);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.addEventListener('change', () => {
    console.log(`x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();

loader.load('assets/betegeuse.glb', function (gltf) {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            model.scale.multiplyScalar(0.5 / maxDim);
        }
        
        model.position.set(-1, 0.75, -0.25);
        scene.add(model);
        betegeuse = model;
    }
);

loader.load('assets/neptune.glb', function (gltf) {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            model.scale.multiplyScalar(0.25 / maxDim);
        }
        
        model.position.set(1, 0.5, 0);
        scene.add(model);
        bellatrix = model;
    }
);

loader.load('assets/neptune.glb', function (gltf) {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
        model.scale.multiplyScalar(0.25 / maxDim);
    }
    
    model.position.set(-0.5, -0.5, -0.40);
    scene.add(model);
    alnitak = model;
}
);

loader.load('assets/neptune.glb', function (gltf) {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
        model.scale.multiplyScalar(0.25 / maxDim);
    }
    
    model.position.set(0, -0.6, -0.90);
    scene.add(model);
    alnilam = model;
}
);

loader.load('assets/neptune.glb', function (gltf) {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
        model.scale.multiplyScalar(0.25 / maxDim);
    }
    
    model.position.set(0.3, -0.6, -0.65);
    scene.add(model);
    mintaka = model;
}
);

loader.load('assets/neptune.glb', function (gltf) {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
        model.scale.multiplyScalar(0.25 / maxDim);
    }
    
    model.position.set(0.5, -1.7, -0.50);
    scene.add(model);
    rigel = model;
}
);

loader.load('assets/neptune.glb', function (gltf) {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
        model.scale.multiplyScalar(0.25 / maxDim);
    }
    
    model.position.set(-0.8, -1.8, -0.15);
    scene.add(model);
    saiph = model;
}
);

window.addEventListener('mousemove', event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
}, false);

function showInfoPanel(planet) {
    const info = planetInfo[planet];
    planetName.textContent = info.name;
    planetDescription.textContent = info.description;
    infoPanel.style.display = "block";
}

function hideInfoPanel() {
    infoPanel.style.display = "none";
}

window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        let clickedObject = intersects[0].object;
        while (clickedObject.parent && clickedObject.parent !== scene) {
            clickedObject = clickedObject.parent;
        }

        if (clickedObject == betegeuse) {
            gsap.to(camera.position, {
                x: -1.2, y: 1.99, z: 1, 
                duration: 2,
            });
            showInfoPanel("betegeuse");
            document.getElementById("resetButton").style.display = "block";
        } else if (clickedObject == bellatrix) {
            gsap.to(camera.position, {
                x: 1.3, y: 0.96, z: 0.66, 
                duration: 2,
            });
            showInfoPanel("bellatrix");
            document.getElementById("resetButton").style.display = "block";
        } else if (clickedObject == alnitak) {
            gsap.to(camera.position, {
                x: -1.13, y: -0.95, z: 0.3, 
                duration: 2,
            });
            showInfoPanel("alnitak");
            document.getElementById("resetButton").style.display = "block";
        } else if (clickedObject == alnilam) {
            gsap.to(camera.position, {
                x: -1.13, y: -0.96, z: -1.16,
                duration: 2,
            });
            showInfoPanel("alnilam");
            document.getElementById("resetButton").style.display = "block";
        } else if (clickedObject == mintaka) {
            gsap.to(camera.position, {
                x: 1.2, y: -1, z: -0.60, 
                duration: 2,
            });
            showInfoPanel("mintaka");
            document.getElementById("resetButton").style.display = "block";
        } else if (clickedObject == rigel) {
            gsap.to(camera.position, {
                x: 0.4, y: -2.8, z: 0.3,
                duration: 2,
            });
            showInfoPanel("rigel");
            document.getElementById("resetButton").style.display = "block";
        } else if (clickedObject == saiph) {
            gsap.to(camera.position, {
                x: -0.76, y: -2.8, z: 0.7,
                duration: 2,
            });
            showInfoPanel("saiph");
            document.getElementById("resetButton").style.display = "block";
        } 
    } else {
        hideInfoPanel();
    }
}, false);

document.getElementById("resetButton").addEventListener("click", () => {
    gsap.to(camera.position, {
        x: 0, y: 0, z: 5,
        duration: 2,
    });
    hideInfoPanel(); 
    document.getElementById("resetButton").style.display = "none";
});

requestAnimationFrame(function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
});

document.querySelector('.closeButton').addEventListener('click', () => {
    document.querySelector('.explanationOrion').style.display = 'none';
})