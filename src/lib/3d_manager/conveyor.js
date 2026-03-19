import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';//for debug;remove on release

import { load_model, eventBus } from '.';
import { Object } from '.';

import { clamp } from 'three/src/math/MathUtils.js';
import { Tab } from 'three/examples/jsm/inspector/ui/Tab.js';

// ============ Create Model =================

var object = new Object('conveyor', document.querySelector('#Projects'));

(async () => {
  object.model = await load_model(object.model_path, object.scene); // requires load_model to return a Promise
  
  // if (object.isObject3D) {
    object.start();
  // }

  // alert("not first");
  // console.log("animations:", object._animations);
  // console.log("object.scene.animations:", object.scene.animations);
  // object.scene.traverse((child) => {
  //   if (child.animations && child.animations.length > 0) {
  //     console.log("Found animations on child:", child.name, child.animations);
  //   }
  // });

  if(Error.isError(object.model)) {
    failedToLoad(object.model);
    return;
  }
  
  // const gui = new GUI();
  //const controls = new OrbitControls(object.camera, renderer.domElement); //for debug;remove on release
  object.setCameraParam(13, 1.85, 0, false);

  const light = new THREE.HemisphereLight( 0xffffff, 0x888888, 3 );
  light.position.set( 0, 10, 0 );
  object.scene.add( light );
      
})();

// ============ on Failed ====================

function failedToLoad(error) {
  alert("Failed to load model, check console for more details");
  console.error(object.model);
  console.error("reverting to static web page");//revert function here
}

// ============ Specific Functions ===========

function bttn_pushed(bttn) {

  // object.model.faceVertexUvs[0].forEach(uv_vert => {
  //   uv_vert.position.y += .5;
  // });
  console.log("object : ", object);
  // console.log("model : ", object.model);
  object.model.scene.texture.offset.y += 0.5;
  
  if (bttn == "bttn_left") {//it's named left but it's actually on the right
    object.mixer.timeScale = 1;

    object.animations.forEach(clip => {
    const action = object.mixer.clipAction(clip);

    action.setEffectiveTimeScale(1);
    action.setLoop(THREE.LoopOnce);
    action.reset().play().fadeIn(.15).clampWhenFinished = true;
    });
  }
  else {;
    // object.mixer.timeScale = -1;
    // object.mixer.setTime(object.animations[0].duration);

    object.animations.forEach(clip => {
      // clip.blendMode = THREE.AdditiveAnimationBlendMode;
      const action = object.mixer.clipAction(clip);
      //action.setTime(action.getClip().duration);
      action.setEffectiveTimeScale(-1);
      action.setLoop(THREE.LoopRepeat, 0);
      action.reset().play().clampWhenFinished = true;
      action.time = object.animations[0].duration;
  });
  }
}

const pointer = new THREE.Vector2();
let raycaster = new THREE.Raycaster();


object.container.onclick = function (e) {
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
    console.log("clicked on!", intersects[0].object);
    if (intersects[0].object.name.slice(0, 4) == "bttn")
      bttn_pushed(intersects[0].object.name);
  }
}

