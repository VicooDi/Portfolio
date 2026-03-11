import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { load_model, eventBus } from '.';
import { Object } from '.';

import { getObjectAbsulotePos } from '/src/lib/utilities';

//TODO : notable variables here for quick debugging with UI (I probably will never do this)

// ============ Create Model =================

var object = new Object('logo', document.querySelector('#me'));
var eyes = undefined;

(async () => {
  object.model = await load_model(object.model_path, object.scene); // requires load_model to return a Promise
  if (object.model.isObject3D) {
    eyes = object.model.getObjectByName("Circle");//change thhis!!
  }
  else if(Error.isError(object.model)) {
    failedToLoad(object.model);
    return;
  }
      
})();

// ============ on Failed ====================

function failedToLoad(error) {
  alert("Failed to load model, check console for more details");
  console.error(object.model);
  console.error("reverting to static web page");//revert function here
}

// ============ Specific Functions ===========

var vec = new THREE.Vector2();
onmousemove = function (e) {
  if (!(object.model && eyes))
    return;
  var m_pos = new THREE.Vector2(e.clientX, e.clientY);

  const pos = getObjectAbsulotePos(eyes, object.camera, object.container);
  
  vec = new THREE.Vector2(m_pos.x - pos.x, m_pos.y - pos.y);
  vec.normalize(); //might change it to clamp later to emulate a square effect.

  eyes.position.set(0, -vec.y, -vec.x);

  // console.log("mouse location:", m_pos.x, m_pos.y);
}
