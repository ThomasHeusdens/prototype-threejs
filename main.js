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

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

let astronaut, mercury, venus, earth, mars, jupiter, saturn, uranus, neptunus, solarSystem;
let mixerAstronaut, mixerMercury, mixerVenus, mixerEarth, mixerMars, mixerJupiter, mixerSaturn, mixerUranus, mixerNeptunus, mixerSolarSystem;
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
    if (mixerSolarSystem) mixerSolarSystem.update(0.001);
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
    },
    {
        id: 'firstFlip',
        position: { x: -5, y: -3.7, z: -30 },
        rotation: { x: 0, y: 7, z: 0 }
    },
    {
        id: 'secondFlip',
        position: { x: -5, y: -3.7, z: -30 },
        rotation: { x: 0, y: 0.8, z: 0 }
    },
    {
        id: 'thirdFlip',
        position: { x: -5, y: -3.7, z: -30 },
        rotation: { x: 0, y: 7, z: 0 }
    },
    {
        id: 'questionsDone',
        position: { x: 4.5, y: -2.5, z: -30 },
        rotation: { x: 0, y: 5.8, z: 0 }
    },
    {
        id: 'floatAway',
        position: { x: 0, y: -3.5, z: -600 },
        rotation: { x: 25, y: 2, z: 0 }
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
        if (planet.value.trim().toLowerCase() == correctPlanetName.toLowerCase()) {
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
    document.querySelector('.numberQuestion').style.display = "flex";
    document.querySelector('.firstQuestion').style.display = "flex";
})

const modelFourthMove = () => {
    let findId = arrPositionModel.findIndex((val) => val.id == 'firstFlip');
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

document.querySelector('.confirmFirstQuestion').addEventListener('click', () => {
    const answerFirstQuestion = document.getElementById('questionFirstInput');
    if(answerFirstQuestion.value.trim().toLowerCase() == answerFirstQuestion.getAttribute('name').toLowerCase()){
        document.querySelector('.firstQuestion').style.display = "none";
        document.querySelector('.secondQuestion').style.display = "flex";
        modelFourthMove();
    } else {
        answerFirstQuestion.style.borderBottom = "1px solid red";
    }
});

const modelFifthMove = () => {
    let findId = arrPositionModel.findIndex((val) => val.id == 'secondFlip');
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

document.querySelector('.confirmSecondQuestion').addEventListener('click', () => {
    const answerSecondQuestion = document.getElementById('questionSecondInput');
    if(answerSecondQuestion.value.trim().toLowerCase() == answerSecondQuestion.getAttribute('name').toLowerCase()){
        document.querySelector('.secondQuestion').style.display = "none";
        document.querySelector('.thirdQuestion').style.display = "flex";
        modelFifthMove();
    } else {
        answerSecondQuestion.style.borderBottom = "1px solid red";
    }
});

const modelSixthMove = () => {
    let findId = arrPositionModel.findIndex((val) => val.id == 'thirdFlip');
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

document.querySelector('.confirmThirdQuestion').addEventListener('click', () => {
    const answerThirdQuestion = document.getElementById('questionThirdInput');
    if(answerThirdQuestion.value.trim().toLowerCase() == answerThirdQuestion.getAttribute('name').toLowerCase()){
        document.querySelector('.thirdQuestion').style.display = "none";
        document.querySelector('.fourthQuestion').style.display = "flex";
        modelSixthMove();
    } else {
        answerThirdQuestion.style.borderBottom = "1px solid red";
    }
});

const modelSeventhMove = () => {
    let findId = arrPositionModel.findIndex((val) => val.id == 'questionsDone');
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

const solarSystemGroup = new THREE.Group();
scene.add(solarSystemGroup);

const starSketch = (p) => {
  const numStars = 500;
  let stars = [];
  let isAnimating = true;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.stroke(255);
    p.strokeWeight(2);
    
    for(let i = 0; i < numStars; i++) {
      stars.push(new Star(p.random(p.width), p.random(p.height)));
    }

    setTimeout(() => {
        loader.load('assets/solar_system.glb', function (gltf) {
            solarSystem = gltf.scene;
            solarSystem.position.set(0, -100, -500);
            solarSystemGroup.add(solarSystem);

            mixerSolarSystem = new THREE.AnimationMixer(solarSystem);
            if (gltf.animations.length > 0) {
                console.log(gltf.animations);
                mixerSolarSystem.clipAction(gltf.animations[0]).play();
            }

            const solarSystemControls = new OrbitControls(camera, renderer.domElement);
            solarSystemControls.enableDamping = true;
            solarSystemControls.dampingFactor = 0.05;
            solarSystemControls.enableZoom = true;
            solarSystemControls.zoomSpeed = 1.5;
            solarSystemControls.autoRotate = false;
            solarSystemControls.target.set(solarSystem.position.x, solarSystem.position.y, solarSystem.position.z);
            solarSystemControls.update();

            const updateSolarSystemControls = () => {
                requestAnimationFrame(updateSolarSystemControls);
                solarSystemControls.update();
            };
            updateSolarSystemControls();
        });

        document.getElementById('p5-canvas-container').style.display = 'none';
        document.querySelector('#container3D').style.pointerEvents = "all";
    }, 10500);
    setTimeout(() => {
        astronaut.visible = false;
    }, 10000);
  }

  p.draw = function() {
    if (!isAnimating) {
      p.noLoop();
      return;
    }
    
    p.background(0, 50);
    
    const acc = p.map(p.mouseX, 0, p.width, 0.005, 0.2);
    
    stars = stars.filter(star => {
      star.draw();
      star.update(acc);
      return star.isActive();
    });
    
    while(stars.length < numStars) {
      stars.push(new Star(p.random(p.width), p.random(p.height)));
    }
  }

  class Star {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.prevPos = p.createVector(x, y);
      this.vel = p.createVector(0, 0);
      this.ang = p.atan2(y - (p.height / 2), x - (p.width / 2));
    }
  
    isActive() {
      return onScreen(this.prevPos.x, this.prevPos.y);
    }
  
    update(acc) {
      this.vel.x += p.cos(this.ang) * acc;
      this.vel.y += p.sin(this.ang) * acc;
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  
    draw() {
      const alpha = p.map(this.vel.mag(), 0, 3, 0, 255);
      p.stroke(255, alpha);
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }
  }

  function onScreen(x, y) {
    return x >= 0 && x <= p.width && y >= 0 && y <= p.height;
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
};

document.querySelector('.confirmFourthQuestion').addEventListener('click', () => {
    const answerThirdQuestion = document.getElementById('questionFourthInput');
    if(answerThirdQuestion.value.trim().toLowerCase() == answerThirdQuestion.getAttribute('name').toLowerCase()){
        document.querySelector('.fourthQuestion').style.display = "none";
        document.querySelector('.numberQuestion').style.display = "none";
        modelSeventhMove();
        document.querySelector('.wellDone').style.display = "flex";
    } else {
        answerThirdQuestion.style.borderBottom = "1px solid red";
    }
});

const modelEighthMove = () => {
    let findId = arrPositionModel.findIndex((val) => val.id == 'floatAway');
    let newCoordinates = arrPositionModel[findId];
    gsap.to(astronaut.position, {
        x: newCoordinates.position.x,
        y: newCoordinates.position.y,
        z: newCoordinates.position.z,
        duration: 10,
        ease: 'power2.in'
    });
    gsap.to(astronaut.rotation, {
        x: newCoordinates.rotation.x,
        y: newCoordinates.rotation.y,
        z: newCoordinates.rotation.z,
        duration: 10,
        ease: 'power2.in'
    });
};

document.querySelector('.buttonLetsGo').addEventListener('click', () => {
    document.querySelector('.wellDone').style.display = "none";
    document.getElementById('p5-canvas-container').style.display = 'block';
    new p5(starSketch, document.getElementById('p5-canvas-container'));
    modelEighthMove();
})