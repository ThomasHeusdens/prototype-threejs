import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from 'gsap';

let camera, scene, renderer, controls;
let venus, mercury;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

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

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();

loader.load(
    'assets/mercury.glb',
    function (gltf) {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            model.scale.multiplyScalar(2 / maxDim);
        }
        
        model.position.set(-2, 0, 0);
        scene.add(model);
        mercury = model;
    }
);

loader.load(
    'assets/venus.glb',
    function (gltf) {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            model.scale.multiplyScalar(2 / maxDim);
        }
        
        model.position.set(2, 0, 0);
        scene.add(model);
        venus = model;
    }
);

window.addEventListener('mousemove', event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
}, false);

window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        let clickedObject = intersects[0].object;
        while (clickedObject.parent && clickedObject.parent !== scene) {
            clickedObject = clickedObject.parent;
        }

        if (clickedObject == mercury) {
            gsap.to(camera.position, {
                x: -2, y: 1, z: 2,
                duration: 2,
            });
            document.getElementById("resetButton").style.display = "block";
        } else if (clickedObject == venus) {
            gsap.to(camera.position, {
                x: 2, y: 1, z: 2,
                duration: 2,
            });
            document.getElementById("resetButton").style.display = "block";
        }
    }
}, false);

document.getElementById("resetButton").addEventListener("click", () => {
    gsap.to(camera.position, {
        x: 0, y: 0, z: 5,
        duration: 2,
    });
    document.getElementById("resetButton").style.display = "none";
});

requestAnimationFrame(function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
});