import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls.js'
import Stats from '/jsm/libs/stats.module.js'
import { GUI } from '/jsm/libs/dat.gui.module.js'

import { OBJLoader } from '/jsm/loaders/OBJLoader.js'


$(document).ready(function () {
    const scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({antialias:true});
    let local_window = document.getElementById("obj_3d_view_container");
    let camera = new THREE.PerspectiveCamera(40,local_window.innerWidth/local_window.innerHeight,1,5000)
    
    renderer.setSize(local_window.innerWidth, local_window.innerHeight);
    renderer.setClearColor("#ffffbb");
        
    
    document.body.appendChild(renderer.domElement)
    
    let loader = new OBJLoader();
    console.log('three man ready to load');
    loader.load(
    '/3d/solenoid_valve_12v_dc-1.obj',

        function ( object ) {
            scene.add( object );
            window.requestAnimationFrame( render );
            renderer.render(scene, camera);
            window.requestAnimationFrame( render );
        
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

    function render() {
        window.requestAnimationFrame( render );
        renderer.render( scene, camera );
    }

    var ambient = new THREE.AmbientLight( 0x444444 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );
    
    render();
});
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
// camera.position.z = 2

// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)

// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

// window.addEventListener(
//     'resize',
//     () => {
//         camera.aspect = window.innerWidth / window.innerHeight
//         camera.updateProjectionMatrix()
//         renderer.setSize(window.innerWidth, window.innerHeight)
//         render()
//     },
//     false
// )

// const stats = Stats()
// document.body.appendChild(stats.dom)

// const gui = new GUI()
// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(cube.scale, 'x', -5, 5)
// cubeFolder.add(cube.scale, 'y', -5, 5)
// cubeFolder.add(cube.scale, 'z', -5, 5)
// cubeFolder.open()
// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(camera.position, 'z', 0, 10)
// cameraFolder.open()

// function animate() {
//     requestAnimationFrame(animate)
//     cube.rotation.x += 0.01
//     cube.rotation.y += 0.01
//     controls.update()
//     render()
//     stats.update()
// }

// function render() {
//     renderer.render(scene, camera)
// }

// animate()
//    