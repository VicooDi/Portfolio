import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const loader = new GLTFLoader();
const texture_loader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(17, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(35, 0, 0);

try {
  const renderer = new THREE.WebGLRenderer({ alpha: true });
}
catch(error) {
  alert(error);
}

const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);


/*light, gui and environment tests

const planeSize = 40;
 
const texture = texture_loader.load('/checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
scene.add(mesh);

{
  const cubeSize = 4;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
  const mesh = new THREE.Mesh(cubeGeo, cubeMat);
  mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
  scene.add(mesh);
}
{
  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
  const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
  const mesh = new THREE.Mesh(sphereGeo, sphereMat);
  mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
  scene.add(mesh);
}

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return '#' + this.object[this.prop].getHexString();
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 5, 0.01);

*///actual model : ===========

//lighting
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

//loading the model
loader.load('/logo.glb', function ( object ) {
    //object.scene.scale.set(75, 75, 75); // remebere to scale this in blender when you get a perfect value to avoid optimization issues
    let material = new THREE.MeshPhongMaterial({color: '#8AC'});
    //object.scene.material = material;
    object.scene.traverse(function(child) {
        if (child.isMesh) { child.material = material; }
    });
    scene.add(object.scene);

}, function( xhr ){
        console.log( (xhr.loaded / xhr.total * 100) + "% loaded")
}, undefined, function ( error ) {
    console.error("error loading model : " + error);
    alert("failed to load model\nplease check the console");
});


onmousemove = function(e){
  let posX = e.clientX;
  let posY = e.clientY;

  console.log("mouse location:", posX, posY);
}


//render loop
function animate( time ) {
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );