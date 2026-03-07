import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { load_model, eventBus } from '.';
import { model_loader, texture_loader, renderer, Object } from '.';

import { getObjectAbsulotePos } from '/src/lib/utilities';

// alert("I AM BIRTHED!!");

var object = new Object('logo', document.querySelector('#me'));

//TODO : notable variables here for quick debugging with UI (I probably will never do this)

// ============ link to hmtl container =======

// const container = ;


// ============ Create Model =================

// load_model('/3d_models/logo.glb');

// var object = undefined; //set necessary variables to store the model's pieces.
var eyes = undefined;

// eventBus.addEventListener('_onloaded', (e) => {
//   console.log('model loaded:', e.detail);
//   logo = e.detail.sceneObject;
//   eyes = e.detail.sceneObject.getObjectByName("Circle");
// });

(async () => {
  object.model = await load_model(object.model_path, object.scene); // requires load_model to return a Promise
  if (object.model.isObject3D) {
    eyes = object.model.getObjectByName("Circle");//change thhis!!
  }
  else if(Error.isError(object.model)) {
    alert("Failed to load model, check console for more details");
    console.error(object.model);
    return;
  }
  
  // object.camera.position.set(55, 0, 0);
  // object.camera.lookAt(object.scene.position); //points at the scene origin, change to model origin upon any issue arizing.
  // object.camera.aspect = 3;
  // object.camera.updateProjectionMatrix();
      
})();

// ============ Setup renderer & camera ======

// container.appendChild(renderer.domElement);

/*most cameras would be facing X, so the X value represents scale rather then distance
this is further cemented with the camera being perspective yet having a very low fov*/


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



var vec = new THREE.Vector3();
onmousemove = function (e) {
  if (!(object.model && eyes))
    return;
  var m_pos = new THREE.Vector3(e.clientX, e.clientY);

  const pos = getObjectAbsulotePos(eyes, object.camera, object.container);
  
  vec = new THREE.Vector3(m_pos.x - pos.x, m_pos.y - pos.y);
  vec.normalize(); //might change it to clamp later to emulate a square effect.

  eyes.position.set(0, -vec.y, -vec.x);

  // console.log("mouse location:", m_pos.x, m_pos.y);
}

//============= End ==========================

// function animate( time ) {
//   renderer.render(scene, camera);
// }
// renderer.setAnimationLoop(animate);