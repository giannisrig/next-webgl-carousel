import { useEffect, useMemo, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Texture, Source, ShaderMaterial } from "three";
import { RootState, useAppSelector } from "@/libs/store/store";
import planeShaders from "@/libs/constants/planeShaders";

const ImagePlane = ({ texture, texture2, width, height, active, edge, hover, ...props }) => {
  // Define the ref element for the current Plane
  const planeMesh = useRef(null);

  const moving = useAppSelector((state: RootState) => state.webglCarousel.moving);

  // Set our Texture from the image passed in 'texture'
  const planeTexture: Texture | Texture[] = useTexture<string | string[]>(texture);

  //transparent image
  const transparentImg = "/images/carousel/21.jpg";

  // Get the viewport:Size from ThreeJs
  const { viewport } = useThree();

  //dispatch image to apply effect

  const disp = "/images/carousel/5.png";
  const [transparentTexture, dispTexture] = useTexture([transparentImg, disp]);

  useEffect(() => {
    // Make sure our current mesh is not null
    if (planeMesh.current) {
      // console.log(planeMesh.current);

      // Get the Shader Material of the current plane mesh
      const material: ShaderMaterial = planeMesh.current.material;

      //  Setting the 'uZoomScale' uniform in the 'Plane' component to resize the texture proportionally to the dimensions of the viewport.
      material.uniforms.uZoomScale.value.x = viewport.width / width;
      material.uniforms.uZoomScale.value.y = viewport.height / height;

      // Animate the uProgress value of the ShaderMaterial uniforms
      gsap.to(material.uniforms.uProgress, {
        value: active ? 1 : 0,
      });

      // Animate the uRes value of the ShaderMaterial uniforms
      gsap.to(material.uniforms.uRes.value, {
        x: active ? viewport.width : width,
        y: active ? viewport.height : height,
      });
    }
  }, [viewport, active, width, height]);

  // This code runs when the carousel item is on the edge of the screen
  useEffect(() => {
    // Make sure our current mesh is not null
    if (planeMesh.current) {
      // console.log(planeMesh.current);

      // Get the Shader Material of the current plane mesh
      const material: ShaderMaterial = planeMesh.current.material;

      // Change the dispatch factor to apply the distortion effect
      gsap.to(material.uniforms.dispFactor, {
        value: moving ? 1 : 0,
      });

      // console.log("Disp factor should change");
    }
  }, [moving]);

  // This code runs when the carousel item is on the edge of the screen
  useEffect(() => {
    // Make sure our current mesh is not null
    if (planeMesh.current) {
      // console.log(planeMesh.current);

      // Get the Shader Material of the current plane mesh
      const material: ShaderMaterial = planeMesh.current.material;

      console.log("Should do something for hover");

      // Change the effect Directions for the hover effect
      material.uniforms.effectX.value = hover ? 0 : 1;
      // material.uniforms.effectY.value = hover ? 1 : 0;

      // Change the dispatch factor to apply the distortion effect
      gsap.to(material.uniforms.dispFactor, {
        value: hover ? 1 : 0,
      });

      // console.log("Disp factor should change");
    }
  }, [hover]);

  const shaderArgs = useMemo(() => {
    // Cast the plane texture, it might be an array of Textures
    const texture: Texture = Array.isArray(planeTexture) ? planeTexture[0] : planeTexture;

    // Set the texture source
    const source: Source = texture.source;

    return {
      uniforms: {
        effectFactor: { value: 2.2 },
        effectX: { value: 1 },
        effectY: { value: 1 },
        dispFactor: { value: 0 },
        hover: { value: 0 },
        transparentTexture: { value: transparentTexture },
        mainTexture: { value: texture },
        dispTexture: { value: dispTexture },
        //
        uProgress: { value: 0 },
        uZoomScale: { value: { x: 1, y: 1 } },
        uRes: { value: { x: width, y: height } },
        uImageRes: {
          value: { x: source.data.width, y: source.data.height },
        },
      },
      vertexShader: planeShaders.vertexShader,
      fragmentShader: planeShaders.fragmentShader,
    };
  }, [dispTexture, height, planeTexture, transparentTexture, width]);

  return (
    <mesh ref={planeMesh} {...props}>
      <planeGeometry args={[width, height, 30, 30]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default ImagePlane;
