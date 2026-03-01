import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { load_model } from '.';
import { model_loader, texture_loader, scene, camera, renderer } from '.';

alert("I AM BIRTHED!!");

// ============ link to hmtl container =======

const container = document.getElementById("me");

// ============ Set Paramaters ===============

renderer.setSize( container.clientWidth, container.clientHeight );
container.appendChild(renderer.domElement);

//most cameras would be facing X, so the X value represents scale rather then distance
//this is further cemented with the camera being perspective yet having a very low fov
camera.position.set(35, 0, 0);

// ============ Create Model =================

load_model('/3d_models/logo.glb');

function animate( time ) {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop( animate );

// ============ Specific Functions ===========

onmousemove = function(e){
  let posX = e.clientX;
  let posY = e.clientY;

//   console.log("mouse location:", posX, posY);
}
