import * as THREE from 'three';
import {GLTFLoader} from "gltf";
import {OrbitControls} from 'orbit';

window.addEventListener('load', function () {
  init();
});
//랜더러
async function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha:true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;//1.그림자를 사용하겠다
  document.body.appendChild(renderer.domElement);
//scene
  const scene = new THREE.Scene();
//camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );

  camera.position.set(-10,2,3)
 
//오브젝트 가져오기
const gltfLoader = new GLTFLoader();

const gltf = await gltfLoader.loadAsync('./models/unused_blue_vans_shoe/scene.gltf')
const shoes = gltf.scene;
// shoes.rotation.y = -50;
// shoes.rotation.x = 50;
//2.오브젝트 그림자 넣기
// shoes.castShadow = true;

// shoes.traverse(object => {
//   if(object.inMesh){<----오타
//     object.castShadow=true;
//   }
// })//gltf파일 사용시 적어줌
shoes.castShadow = true;
// shoes.receiveShadow = true;
shoes.traverse(object => {
  if (object.isMesh) {
    object.castShadow = true;
  }
});

shoes.scale.set(2,2,2)
scene.add(shoes)

//조명
const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1 );
const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.8 );
directionalLight1.castShadow = true;
directionalLight1.shadow.mapSize.width = 1024;
directionalLight1.shadow.mapSize.height = 1024;
directionalLight1.shadow.radius = 20;
directionalLight1.position.y = 3;
directionalLight2.castShadow = true;



scene.add( directionalLight1,directionalLight2)


//OrbitControls 카메라 추가
const controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
controls.enableZoom=true

 


// //그림자 받을 바닥
const geometry = new THREE.PlaneGeometry( 15,15,32,32 );
const material = new THREE.MeshPhongMaterial( {color: '#c2e9fb',
  transparent:true,
  opacity:0.1
} );
const plane = new THREE.Mesh( geometry, material );

plane.rotation.x = -Math.PI /2
plane.position.y = -0.5
plane.receiveShadow = true;//그림자를 받음


scene.add( plane );


  //반응형
  render();

  function render() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', handleResize);
}