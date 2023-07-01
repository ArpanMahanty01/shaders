import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from "../shaders/fragment.glsl"

const Scene = () => {
    const sceneRef = useRef();
    useEffect(()=>{
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75,window.innerWidth/ window.innerHeight, 0.1, 1000);

        // let initialPosition;
        // let initialRotation;
        // let mesh;

        // const loader = new GLTFLoader();
        // loader.load("src/assets/rhetorician/scene.gltf",(gltf)=>{
        //   mesh = gltf.scene;
        //   scene.add(gltf.scene);
        //   const box = new THREE.Box3().setFromObject(gltf.scene);
        //   const center = box.getCenter(new THREE.Vector3());
        //   gltf.scene.position.sub(center);
        //   initialPosition = gltf.scene.position.clone();
        //   initialRotation = gltf.scene.rotation.clone();
        //   animate(mesh);

        // },undefined,
        // (error)=>{
        //   console.error('ERROR LOADING GLTF',error)
        // });

        let currentTime = Date.now()*0.001;
        let pico = Math.random() * 10;


        const geometry = new THREE.BoxGeometry(1);
        const material = new THREE.ShaderMaterial({
          uniforms:{
            uTime:{value:0}
          },
          vertexShader:vertexShader,
          fragmentShader:fragmentShader
        });

        
        const ico = new THREE.Mesh(geometry,material);
        scene.add(ico);

        camera.position.set( 0, 0, 10 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        sceneRef.current.appendChild(renderer.domElement);
        
        const controls = new OrbitControls(camera, renderer.domElement);

        
        const animate = ()=>{
          // console.log(scene)
          controls.enableZoom = true;
          controls.autoRotate = true;
          controls.update();
          renderer.render(scene,camera);
          requestAnimationFrame(animate);
          material.uniforms.uTime.value++;
        };

        animate();
    },[])
  return (
    <div ref={sceneRef}></div>
  )
}

export default Scene