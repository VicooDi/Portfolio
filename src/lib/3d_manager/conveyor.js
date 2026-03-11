import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';//for debug;remove on release

import { load_model, eventBus } from '.';
import { Object } from '.';

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
  
  pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
  console.log("mouse pos = ", pointer);

  raycaster.setFromCamera(pointer, object.camera);

  //TODO : scrap the raycasting stuff or research ot more, it seems to not be entierly compatable with my approach
  //instead test the `getObjectAbsulotePos` methode with fixed positions, the downside is that the position is fixed.
  
  const intersects = raycaster.intersectObjects(object.scene.children, true);
  if (intersects.length > 0) {
    let INTERSECTED = intersects[0].object;
    console.log("found a target!",INTERSECTED);
  }
}
