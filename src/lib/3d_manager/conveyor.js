import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';//for debug;remove on release

import { load_model, eventBus } from '.';
import { model_loader, texture_loader, renderer, Object } from '.';

import { getObjectAbsulotePos } from '/src/lib/utilities';

// alert("I AM BIRTHED!!");

var object = new Object('conveyor', document.querySelector('#Projects'));

// ============ Create Model =================


(async () => {
  object.model = await load_model(object.model_path, object.scene); // requires load_model to return a Promise
//   if (object.model.isObject3D) {
//     eyes = object.model.getObjectByName("Circle");//change thhis!!
//   }
  
  // object.camera.position.set(55, 0, 0);
  // object.camera.lookAt(object.scene.position); //points at the scene origin, change to model origin upon any issue arizing.
  // object.camera.aspect = 3;
    // object.camera.updateProjectionMatrix();
    
    //const controls = new OrbitControls(object.camera, renderer.domElement); //for debug;remove on release
    object.setCameraParam(13, 1.85, 0, false);
})();

// ============ Setup renderer & camera ======



// ============ Specific Functions ===========



//============= End ==========================

// function animate( time ) {
//   renderer.render(scene, camera);
// }
// renderer.setAnimationLoop(animate);