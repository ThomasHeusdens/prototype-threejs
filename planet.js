import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer, controls;
let currentModel;

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
const container = document.getElementById("viewer");
container.appendChild(renderer.domElement);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

window.addEventListener('resize', onWindowResize, false);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}  

document.getElementById("file-input").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && (file.name.endsWith(".glb") || file.name.endsWith(".gltf"))) {
        const url = URL.createObjectURL(file);
        const loader = new GLTFLoader();
    
        if (currentModel) {
            scene.remove(currentModel);
        }

        loader.load(url, function (gltf) {
                currentModel = gltf.scene;
                
                const box = new THREE.Box3().setFromObject(currentModel);
                const center = box.getCenter(new THREE.Vector3());
                currentModel.position.sub(center);
                
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 0) {
                    const scale = 2 / maxDim;
                    currentModel.scale.multiplyScalar(scale);
                }

                scene.add(currentModel);
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.error('An error occurred loading the model:', error);
            }
        );
    } else {
        alert("Please select a valid .glb or .gltf file");
    }
});

animate();