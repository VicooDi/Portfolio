import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { load_model, eventBus } from '.';
import { model_loader, texture_loader, scene, camera, renderer } from '.';

// alert("I AM BIRTHED!!");


// ============ link to hmtl container =======

const container = document.getElementById("me");

// ============ Set Paramaters ===============

// camera = new THREE.PerspectiveCamera(15, container.innerWidth / container.innerHeight, 0.1, 1000);

renderer.setSize( container.clientWidth, container.clientHeight ); //these params are really messy FIX IT FUTURE ME!!
container.appendChild(renderer.domElement);

// ============ Fix CSS Spacing ==============

renderer.domElement.style.margin = 0;

//most cameras would be facing X, so the X value represents scale rather then distance
//this is further cemented with the camera being perspective yet having a very low fov
camera.position.set(55, 0, 0);
camera.lookAt(scene.position); //points at the scene origin, change to model origin upon any issue arizing.

// ============ Create Model =================

// renderer.domElement.focus({ preventScroll : true ,focusVisible : true});
load_model('/3d_models/logo.glb');

var logo;
var eyes;

eventBus.addEventListener('_onloaded', (e) => {
  console.log('model loaded:', e.detail);
  logo = e.detail.sceneObject;
  eyes = e.detail.sceneObject.getObjectByName("Circle");
});

// (async () => {
//   logo = await load_model('/3d_models/logo.glb'); // requires load_model to return a Promise
//   eyes = logo.getObjectByName("Circle");
// })();

// ============ Failed =======================

// if (!logo) {
//   alert("aaaaaaa");
//   container.innerHTML = "<h1>VicooDi</h1>"; //test more
//   return;
// }

// ============ Specific Functions ===========

// eventEmitter.emit('_onloaded', () => {
//   console.log('started');
// });

function getObjectPagePosition(object, camera, rendererDom) {
  let pos = new THREE.Vector3();
  object.getWorldPosition(pos);
  pos.project(camera);

  const rect = rendererDom.getBoundingClientRect(); // CSS pixels
  const x = pos.x + (rect.width/2) + rect.left; //pass to vector directly to avoid pointless declarations.
  const y = -pos.y + (rect.height/2) + rect.top;
  return new THREE.Vector3(x, y, 0);
}


var vec = new THREE.Vector3();
onmousemove = function (e) {
  if (!(logo && eyes))
    return;
  var m_pos = new THREE.Vector3(e.clientX, e.clientY);

  const pos = getObjectPagePosition(eyes, camera, renderer.domElement);
  
  vec = new THREE.Vector3(m_pos.x - pos.x, m_pos.y - pos.y);
  vec.normalize(); //might change it to clamp later to emulate a square effect.

  eyes.position.set(0, -vec.y, -vec.x);

  console.log("mouse location:", m_pos.x, m_pos.y);
}

//============= End ==========================

function animate( time ) {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);