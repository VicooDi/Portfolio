import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';//for debug;remove on release

import { load_model, eventBus } from '.';
import { Object } from '.';

// ============ Create Model =================

var object = new Object('{object_name}', document.querySelector('{#container_id}'));

(async () => {
  object.model = await load_model(object.model_path, object.scene); // requires load_model to return a Promise

  if(Error.isError(object.model)) {
    failedToLoad(object.model);
    return;
  }
    
    //const controls = new OrbitControls(object.camera, renderer.domElement); //for debug;remove on release
    // object.setCameraParam(13, 1.85, 0, false);
})();


// ============ on Failed ====================

function failedToLoad(error) {
  alert("Failed to load model, check console for more details");
  console.error(object.model);
  console.error("reverting to static web page");//revert function here
}



// ============ Specific Functions ===========

