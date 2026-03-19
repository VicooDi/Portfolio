import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { load_model, eventBus } from '.';
import { Object } from '.';

import { getObjectAbsulotePos } from '/src/lib/utilities';

//TODO : notable variables here for quick debugging with UI (I probably will never do this)

// ============ Create Model =================

var object = new Object('logo', document.querySelector('#me'));
var eyes = undefined;
var origin_pos;

(async () => {
  object.model = await load_model(object.model_path, object.scene); // requires load_model to return a Promise
  console.log("object:", object);
  if (object.scene.isObject3D) {
    // alert("heyy");
    object.start();
    eyes = object.scene.getObjectByName("Circle");//change thhis!!  
  }
  else if(Error.isError(object.model)) {
    failedToLoad(object.model);
    return;
  }

  object.setCameraParam(0, 7, 43, true);
  object.setCameraParam(-2.5, 11.25, undefined, false);
  origin_pos = eyes.position.clone();

  const light = new THREE.HemisphereLight( 0xffffff, 0x888888, 2 );
  light.position.set( 0, 10, 0 );
  object.scene.add(light);
  
    object.animations.forEach(clip => {
      object.mixer.clipAction(clip).reset().play().fadeIn(.15).setLoop(THREE.LoopOnce).clampWhenFinished = true;
      });
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

  eyes.position.set(origin_pos.x + vec.x, origin_pos.y -vec.y, origin_pos.z);
  // console.log("origin location:", origin_pos);

  // console.log("mouse location:", m_pos.x, m_pos.y);
}
