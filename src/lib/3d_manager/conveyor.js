import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';//for debug;remove on release

import { load_model, eventBus } from '.';
import { Object } from '.';

import { clamp } from 'three/src/math/MathUtils.js';

// ============ Create Model =================

var object = new Object('conveyor', document.querySelector('#Projects'));

(async () => {
  object.model = await load_model(object.model_path, object.scene); // requires load_model to return a Promise

  if(Error.isError(object.model)) {
    failedToLoad(object.model);
    return;
  }
    
    //const controls = new OrbitControls(object.camera, renderer.domElement); //for debug;remove on release
    object.setCameraParam(13, 1.85, 0, false);
})();

// ============ on Failed ====================

function failedToLoad(error) {
  alert("Failed to load model, check console for more details");
  console.error(object.model);
  console.error("reverting to static web page");//revert function here
}

// ============ Specific Functions ===========

const pointer = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

onmousemove = function (e) {
  if (!(object.model) && object.onScreen)
    return;

  const { left, right, top, bottom, width, height } = object.container.getBoundingClientRect();

  const mouse = new THREE.Vector2();
  mouse.x = clamp(e.clientX, left, right);
  mouse.y = clamp(e.clientY, top, bottom);
  
  pointer.x = ( (mouse.x - left) / width ) * 2 - 1; 
  pointer.y = - ( (mouse.y - top) / height ) * 2 + 1;  
  //console.log("pointer pos = ", pointer);

  raycaster.setFromCamera(pointer, object.camera);

  const intersects = raycaster.intersectObjects(object.scene.children, true);
  if (intersects.length > 0) {
    let INTERSECTED = intersects[0].object;
    console.log("found a target!", INTERSECTED);
    INTERSECTED.material.color = "#ffffff";

  }
}
