import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { load_model, eventBus } from '.';
import { model_loader, texture_loader, scene, camera, renderer } from '.';

import { getObjectAbsulotePos } from '/src/lib/utilities';

// alert("I AM BIRTHED!!");

//TODO : notable variables here for quick debugging with UI (I probably will never do this)

// ============ link to hmtl container =======

const container = document.getElementById("Projects");

// ============ Setup renderer & camera ======

renderer.setSize( container.clientWidth, container.clientHeight ); //these params are really messy FIX IT FUTURE ME!!
container.appendChild(renderer.domElement);

/*most cameras would be facing X, so the X value represents scale rather then distance
this is further cemented with the camera being perspective yet having a very low fov*/
camera.position.set(55, 0, 0);
camera.lookAt(scene.position); //points at the scene origin, change to model origin upon any issue arizing.
// camera.aspect = 3;
// camera.updateProjectionMatrix();

// ============ Create Model =================

var model = undefined; //set necessary variables to store the model's pieces.

// eventBus.addEventListener('_onloaded', (e) => {
//   console.log('model loaded:', e.detail);
//   logo = e.detail.sceneObject;
//   eyes = e.detail.sceneObject.getObjectByName("Circle");
// });

(async () => {
    alert("?");
    modle = await load_model('/3d_models/conveyor.glb'); // requires load_model to return a Promise
    if (model.isObject3D) {
        console.log("model loaded succesfully succesfully succesfully");
    }
      
})();

// ============ on Failed ====================

function failedToLoad(error) {
    //do the countermeasures here    
}

// if (!model) {
//   alert("aaaaaaa");
//   container.innerHTML = "<h1>VicooDi</h1>"; //test more
//   return;
// }

// ============ Specific Functions ===========
 
// we'll have the animation side from the conveyor moveement script here, rest will be in main

//============= End ==========================

function animate( time ) {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);