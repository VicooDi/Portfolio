import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//@ts-check
export const model_loader = new GLTFLoader();
export const texture_loader = new THREE.TextureLoader();

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(17, window.innerWidth / window.innerHeight, 0.1, 1000);

export const renderer = new THREE.WebGLRenderer({ alpha: true }); //TODO : test for failure

camera.position.set(35, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement); //TODO : remove on release

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

//exported functions
    /** function to load a 3D model, meant to be given minimal parameters
     * path : relativce path to model
     * material : model's material
      */
export function load_model(path, material) {
        model_loader.load(path, function (object) {
            //for debugging TODO : remove on release!!!
            material = new THREE.MeshPhongMaterial({color: generate_random_color()});
            object.scene.traverse(function(child) {
                if (child.isMesh) { child.material = material; }
            });

            //final
            scene.add(object.scene);
        
        }, function( xhr ){
                console.log( (xhr.loaded / xhr.total * 100) + "% loaded")
        }, undefined, function ( error ) {
            console.error("error loading model : " + error);
            alert("failed to load model\nplease check the console");
        });
}

function loop( time ) { // somhow make it so all who inherit this code shall go throught the loop
    renderer.render( scene, camera );
}


function next_function () {
    
}


//========= HOW TO USE : 
/*this script is supposed to be attached to any child script and used straight up, but s>certain js limitations 
made this process more difficult, I know this language favors composition rather then inheritance,
BUT STILL!! this is a lot more convuloted then any other language *even pythn!*
add this line : renderer.setAnimationLoop(loop);

*/