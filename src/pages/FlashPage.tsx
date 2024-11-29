import "./FlashPage.css";
import flashImages from "../components/FlashImages.tsx";
import MasonryBase from "../components/MasonryBase.tsx";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

const ThreeDViewer = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x202020);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const mtlLoader = new MTLLoader();
    mtlLoader.load("/assets/Arm_Right.mtl", (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        "/assets/Arm_Right.obj",
        (object) => {
          scene.add(object);
        },
        undefined,
        (error) => {
          console.error("Error loading OBJ:", error);
        }
      );
    });

    // // Load the OBJ model
    // const loader = new OBJLoader();
    // loader.load(
    //   "/assets/Arm_Right.obj",
    //   (object) => {
    //     console.log("Model loaded:", object);
    //     scene.add(object);
    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading model:", error);
    //   }
    // );

    // Add OrbitControls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement);

    // Set camera position
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // OrbitControls needs to be updated
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

const FlashPage = () => {
  return (
    <>
      {/* <MasonryBase images={flashImages} columnsDefault={4} columnsMobile={2}>
        <h1>Available Flash</h1>
      </MasonryBase> */}
      <ThreeDViewer />
    </>
  );
};

export default FlashPage;
