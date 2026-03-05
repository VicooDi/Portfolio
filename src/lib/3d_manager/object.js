import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { generate_random_color, getObjectAbsulotePos } from '/src/lib/utilities';

export const model_loader = new GLTFLoader();
export const texture_loader = new THREE.TextureLoader();

//const renderer_container = document.querySelector('#c');

export let renderer = null;
let renderer_container = null;
/** *only called once.* returns a promise of the ``renderer`` or ``null`` on error or a second call */
export function init_renderer() {
    return new Promise((resolve) => {
        if (render != null)
            resolve(renderer);
        renderer = new THREE.WebGLRenderer({alpha: true }); //TODO : test for failure
        renderer_container = renderer.domElement;
        document.body.appendChild( renderer_container );
        renderer.setSize(window.clientWidth, window.clientHeight);
        resolve(renderer);
        //start the loop once the renderer is ready.
        requestAnimationFrame(render);
    });
}

// camera.position.set(35, 0, 0);

// const controls = new OrbitControls(camera, renderer.domElement); //TODO : remove on release

// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild(renderer.domElement);*

//========= Emitters ============

export const eventBus = new EventTarget();

//========= Export Functions ====

/** function to load a 3D model, meant to be given minimal parameters
 * path : relativce path to model
 * (optional) material : model's material {THREE.MeshPhongMaterial} or {THREE.MeshBasicMaterial}
 * not providong a material result in random coloring.*/
export function load_model(path, objectScene, material = null) {
    return new Promise((resolve, reject) => { //this function promises to return either resolve or reject upon completion.
        model_loader.load(path, function (object) {
            //for debugging TODO : remove on release!!!
            if (material == null) {
                object.scene.traverse(function (child) {
                    if (child.isMesh) {
                        // material = new THREE.MeshPhongMaterial({color: generate_random_color()});
                        material = new THREE.MeshBasicMaterial({ color: generate_random_color() });
                        child.material = material;
                        // child.frustumCulled = false;
                    }
                });
            }
            else {
                material = new THREE.MeshBasicMaterial({ color: generate_random_color() });
                object.scene.material = material;
            }

            //final
            objectScene.add(object.scene);
            resolve(object.scene);
            // eventBus.dispatchEvent(new CustomEvent('_onloaded', { detail: { sceneObject: object.scene } }));

        }, function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + "% loaded")
        }, undefined, function (error) {
            console.error("error loading model : " + error);
            alert("failed to load model\nplease check the console");
            reject(error);
        });
    });
}

function renderSceneInfo(scene, camera, container) {

    // get the viewport relative position of this element
    const { left, right, top, bottom, width, height } = container.getBoundingClientRect();

    // const isOffscreen =
    //     bottom < 0 ||
    //     top > renderer.domElement.clientHeight ||
    //     right < 0 ||
    //     left > renderer.domElement.clientWidth;

    // if (isOffscreen)
    //     return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const positiveYUpBottom = renderer_container.clientHeight - bottom;
    renderer.setScissor( left, positiveYUpBottom, width, height );
    renderer.setViewport( left, positiveYUpBottom, width, height );
    
    console.log(left + ", " + positiveYUpBottom + ", " + width + ", " + height);

    renderer.render(scene, camera);
}

function resizeRendererToDisplaySize( renderer ) {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {

        renderer.setSize( width, height, false );

    }

    return needResize;

}

function render(time) {
    time *= 0.001;
    
    resizeRendererToDisplaySize(renderer);
    
    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);
 
    objects.forEach(child => {
        renderSceneInfo(child.scene, child.camera, child.container);
    });
 
  requestAnimationFrame(render);
}

//=========> HOW TO USE :
/*this script is supposed to be attached to any child script and used straight up, but s>certain js limitations 
made this process more difficult, I know this language favors composition rather then inheritance,
BUT STILL!! this is a lot more convuloted then any other language *even python!*
add this line : renderer.setAnimationLoop(loop);

*/

function makeScene(container, size = 55) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(15, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(size, 0, 0);
  camera.lookAt(0, 0, 0);
 
  { // just keep it for now ig
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
 
  return {scene, camera};
}

/**a class to create and preserve 3D models with all necessary data and functions.

 * `name` : 3D model's name

 * `container` : containing HTML element

 * `material` : *optional* material to be used (defaults to basic material with random color)

 * **NOTE :** this implementation relyes on the fact that the model and js file share the same name,
 * and that they are both placed in '/3d_models/' and '/src/lib/3d_manager/' respectevly.
 */

var objects = [];
export class Object {
    constructor(name, container, material = null) {
        this.model = null;
        this.material = material;
        this.container = container;
        this.model_path = '/3d_models/' + name + '.glb';
        this.js_path = '/src/lib/3d_manager/' + name + '.js';
        console.log(this.model_path + ', '+ this.js_path);
        
        // const { scene, camera } = makeScene(container);
        // this.scene = scene;
        // this.camera = camera;
        this.start();
    }
    
    start() {
        const { scene, camera } = makeScene(this.container);
        this.scene = scene;
        this.camera = camera;
        objects.push(this);
        // console.log(objects);
    }


    setCameraParam() { //setter for camera
        
    }
}