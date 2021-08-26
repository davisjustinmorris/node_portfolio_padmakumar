import { OBJLoader } from './OBJLoader.js';

$(document).ready(function () {
    let scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({antialias:true});
    let loader = new OBJLoader();
    let camera = new THREE.PerspectiveCamera(40,local_window.innerWidth/local_window.innerHeight,1,5000)
    let local_window = document.getElementById("obj_3d_view_container");

    renderer.setSize(local_window.innerWidth, local_window.innerHeight);
    local_window.innerHTML = renderer.domElement;

    loader.load(
      '/3d/solenoid_valve_12v_dc-1.obj',

        function ( object ) {
            scene.add( object.scene );
            renderer.render(scene, camera);
        },

        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },

        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
});
