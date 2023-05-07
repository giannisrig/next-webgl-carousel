import { useEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Texture, Source, ShaderMaterial } from "three";
import gsap from "gsap";
import planeShaders from "@/libs/constants/planeShaders";
import planeSettings from "@/libs/constants/planeSettings";
const ImagePlane = ({
  image,
  active,
  hover,
  moving,
  transparentTexture,
  distortedTexture,
  ...props
}: {
  image: string;
  active: boolean;
  hover: boolean;
  edge: boolean;
  moving: boolean;
  transparentTexture: Texture | Texture[];
  distortedTexture: Texture | Texture[];
}) => {
  // Get the viewport:Size from ThreeJs
  const { viewport } = useThree();

  // Define the ref element for the current Plane
  const planeMesh = useRef(null);

  // Set our Texture from the image passed in 'texture'
  const planeTexture: Texture | Texture[] = useTexture<string | string[]>(image);

  useEffect(() => {
    // Make sure our current mesh is not null
    if (planeMesh.current) {
      // Get the Shader Material of the current plane mesh
      const material: ShaderMaterial = planeMesh.current.material;

      // Setting the 'uZoomScale' uniform in the 'Plane' component to resize the texture proportionally to the dimensions of the viewport.
      material.uniforms.uZoomScale.value.x = viewport.width / planeSettings.width;
      material.uniforms.uZoomScale.value.y = viewport.height / planeSettings.height;

      // Animate the uProgress value of the ShaderMaterial uniforms
      gsap.to(material.uniforms.uProgress, {
        value: active ? 1 : 0,
      });

      // Animate the uRes value of the ShaderMaterial uniforms
      gsap.to(material.uniforms.uRes.value, {
        x: active ? viewport.width : planeSettings.width,
        y: active ? viewport.height : planeSettings.height,
      });
    }
  }, [viewport, active]);

  // This code runs when the carousel item is on the edge of the screen
  useEffect(() => {
    // Make sure our current mesh is not null
    if (planeMesh.current) {
      // Get the Shader Material of the current plane mesh
      const material: ShaderMaterial = planeMesh.current.material;

      // Change the dispatch factor to apply the distortion effect
      gsap.to(material.uniforms.dispFactor, {
        value: moving ? 1 : 0,
      });
    }
  }, [moving]);

  // This code runs when the carousel item is on the edge of the screen
  useEffect(() => {
    // Make sure our current mesh is not null
    if (planeMesh.current) {
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
    }
  }, [hover]);

  // Return the Shader Materials Args
  const shaderArgs = useMemo(() => {
    // Cast the plane texture, it might be an array of Textures
    const imageTexture: Texture = Array.isArray(planeTexture) ? planeTexture[0] : planeTexture;

    // Set the texture source
    const source: Source = imageTexture.source;

    // The uniforms are used to apply animations to the fragmentShader
    return {
      uniforms: {
        effectFactor: { value: 2.2 },
        effectX: { value: 1 },
        effectY: { value: 1 },
        dispFactor: { value: 0 },
        hover: { value: 0 },
        mainTexture: { value: imageTexture },
        transparentTexture: { value: transparentTexture },
        dispTexture: { value: distortedTexture },
        //
        uProgress: { value: 0 },
        uZoomScale: { value: { x: 1, y: 1 } },
        uRes: { value: { x: planeSettings.width, y: planeSettings.height } },
        uImageRes: {
          value: { x: source.data.width, y: source.data.height },
        },
      },
      vertexShader: planeShaders.vertexShader,
      fragmentShader: planeShaders.fragmentShader,
    };
  }, [distortedTexture, planeTexture, transparentTexture]);

  return (
    <mesh ref={planeMesh} {...props}>
      <planeGeometry args={[planeSettings.width, planeSettings.height, 30, 30]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default ImagePlane;
