import * as THREE from 'three';

/** function to genrate a random color hex code */
export function generate_random_color () {
    const hex = "0123456879ABCDEFG";
    let color = "";
    for (let i = 0; i < 6; i++) {
        color += hex.charAt(Math.random() * hex.length - 1);
    }
    return '#' + color;
}

/** get the absolute position of `object`'s origin point
 * `object` : the object to get the pos of
 * `camera` : the scene camera
 * `rendererDom` : the canvas 
 * returns a `THREE.Vector3()` with z as 0;
 */
export function getObjectAbsulotePos(object, camera, rendererDom) {
  let pos = new THREE.Vector3();
  object.getWorldPosition(pos);
  pos.project(camera);

  const rect = rendererDom.getBoundingClientRect(); // CSS pixels
  const x = pos.x + (rect.width/2) + rect.left; //pass to vector directly to avoid pointless declarations.
  const y = -pos.y + (rect.height/2) + rect.top;
  return new THREE.Vector2(x, y, 0);
}