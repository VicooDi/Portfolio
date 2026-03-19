import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { generate_random_color, getObjectAbsulotePos } from '/src/lib/utilities';
import { clamp } from 'three/src/math/MathUtils.js';

export const model_loader = new GLTFLoader();
export const texture_loader = new THREE.TextureLoader();

export let renderer = null;
let renderer_container = null;
/** *only called once.* returns a promise of the ``renderer`` or ``null`` on error or a second call */
export function init_renderer() {
    return new Promise((resolve) => {
        if (render != null)
            resolve(renderer);
        try {
            // renderer = new THREE.WebGPURenderer({ alpha: true }); //WebGPURenderer makes the client rely more on the GPU if the browser allows it, if not it falls back to WebGLRenderer.
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        }
        catch (error) {
            alert(error + ", please visit : https://get.webgl.org/ to double check");
            alert(error.type);
            //might use https://www.jsdelivr.com/package/npm/sweetalert2 here instead
            // reject(error);
        }
        renderer_container = renderer.domElement;
        document.body.appendChild( renderer_container );
        renderer.setSize(window.clientWidth, window.clientHeight);
        //start the loop once the renderer is ready.
        requestAnimationFrame(render);
        resolve(renderer);
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
            if (material == null && false) {
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
                material = new THREE.MeshBasicMaterial({ map: object.texture });
                object.scene.material = material;
            }

            //final
            objectScene.add(object.scene);
            resolve(object);
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

let headerBtm = null;
document.addEventListener('DOMContentLoaded', () => {headerBtm = document.querySelector('header').getBoundingClientRect().bottom });

function renderSceneInfo(object) {

    // get the viewport relative position of this element
    const { left, right, top, bottom, width, height } = object.container.getBoundingClientRect();

    object.onScreen =
        bottom < 0 ||
        top > renderer.domElement.clientHeight ||
        right < 0 ||
        left > renderer.domElement.clientWidth;

    
    if (object.onScreen)
        return;

    let clampHeader = height;
    if (top < headerBtm && object.container.id != "me") {
        // alert("aaa 7amma!!" + top + ", " + headerBtm + object.container.id);
        clampHeader = clamp(height, 0, bottom - headerBtm);
    }
        
    object.camera.aspect = width / height;
    object.camera.updateProjectionMatrix();

    const positiveYUpBottom = renderer_container.clientHeight - bottom;
    renderer.setScissor( left, positiveYUpBottom, width, clampHeader );
    renderer.setViewport( left, positiveYUpBottom, width, height);
    
    // console.log(renderer.domElement.clientHeight + ", " + (renderer.domElement.clientHeight - document.querySelector('header').clientHeight));

    renderer.render(object.scene, object.camera);
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

var timer = new THREE.Timer();
timer.connect(document);

function render(time) {
    timer.update();
    
    resizeRendererToDisplaySize(renderer);
    
    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);

    objects.forEach(child => {
        renderSceneInfo(child);
        if (child.mixer) child.mixer.update(timer.getDelta());
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
  camera.position.set(size, 10, 0);
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

var objects = [];
/**a class to create and preserve 3D models with all necessary data and functions.

 * `name` : 3D model's name

 * `container` : containing HTML element

 * `material` : *optional* material to be used (defaults to basic material with random color)

 * **NOTE :** this implementation relyes on the fact that the model and js file share the same name,
 * and that they are both placed in '/3d_models/' and '/src/lib/3d_manager/' respectevly.
 */
export class Object {
    constructor(name, container, material = null) {
        this.model = null;
        this.material = material;
        this.container = container;
        this.model_path = '/3d_models/' + name + '.glb';
        this.js_path = '/src/lib/3d_manager/' + name + '.js';
        console.log(this.model_path + ', ' + this.js_path);

        this.texture = await texture_loader.loadAsync('/misc/main_texture.png');
        
        
        // const { scene, camera } = makeScene(container);
        // this.scene = scene;
        // this.camera = camera;
        const { scene, camera } = makeScene(this.container);
        this.scene = scene;
        this.camera = camera;
        objects.push(this);
        // console.log(objects);
        this.onScreen = false;
        // this.start();
    }
    
    start() {

        // animations :
        this.mixer = new THREE.AnimationMixer(this.scene);
        this.animations = this.model.animations; //no clue
        // alert("first");
    }


    setCameraParam(x=this.camera.position.x, y=this.camera.position.y, z=this.camera.position.z, look = true) { //setter for camera
        this.camera.position.set(x, y, z);
        if(look)
            this.camera.lookAt(0, 0, 0);
        // console.log("camera position set to : ", this.camera.position);
    }
}