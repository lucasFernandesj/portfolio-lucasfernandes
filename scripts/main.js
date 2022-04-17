import '/style.css';



// import * as THREE from 'three';
// import { AmbientLight } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { AmbientLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js';



const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(10)
renderer.render(scene, camera)

const brunoTexture = new THREE.TextureLoader().load('https://bruno-simon.com/prismic/matcaps/8.png')

const geometry = new THREE.TorusGeometry(15, 3, 16, 110)
const material = new THREE.MeshMatcapMaterial({ matcap:brunoTexture })
const torus = new THREE.Mesh(geometry, material)

torus.position.z = 30
torus.position.setX(10)


const pointLight = new THREE.PointLight(0xffffff) 
pointLight.position.set(5, 5, 5)
const ambientLight = new AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}
Array(250).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('/space2.png')
scene.background = spaceTexture



const lucasTexture = new THREE.TextureLoader().load('/face2.png')
const cube = new THREE.BoxGeometry(3, 3, 3)
const cubeMaterial = new THREE.MeshBasicMaterial({ map: lucasTexture })
const lucas = new THREE.Mesh(cube , cubeMaterial)

// const lucas = new THREE.Mesh(
//   new THREE.BoxGeometry(3, 3, 3),
//   new THREE.MeshBasicMaterial({ map: lucasTexture })
// )


lucas.position.z =30
scene.add(lucas)
lucas.add(torus)

const moonTexture = new THREE.TextureLoader().load('media/moon2.png')
const normalTexture = new THREE.TextureLoader().load('media/normal2.png')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
)


scene.add(moon)
moon.position.z = 8
moon.position.setX(-10)



function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  moon.rotation.y += 0.095
  lucas.rotation.y += 0.04
  camera.position.z = t * -0.08
  camera.position.x = t * -0.0009
  camera.position.y = t * -0.0009
}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  controls.update()

 





  renderer.render(scene, camera)
}
animate()



