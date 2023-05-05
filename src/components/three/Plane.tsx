import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import planeShaders from "@/libs/constants/planeShaders";
import { Texture, ShaderMaterial, Source } from "three";

const Plane = ({ texture, width, height, active, ...props }) => {
  // Define the ref element for the current Plane
  const planeMesh = useRef(null);

  // Get the viewport:Size from ThreeJs
  const { viewport } = useThree();

  // Set our Texture from the image passed in 'texture'
  const planeTexture: Texture | Texture[] = useTexture<string | string[]>(texture);

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

  const shaderArgs = useMemo(() => {
    // Cast the plane texture, it might be an array of Textures
    const texture: Texture = Array.isArray(planeTexture) ? planeTexture[0] : planeTexture;

    // Set the texture source
    const source: Source = texture.source;

    return {
      uniforms: {
        uProgress: { value: 0 },
        uZoomScale: { value: { x: 1, y: 1 } },
        uTex: { value: planeTexture },
        uRes: { value: { x: 1, y: 1 } },
        uImageRes: {
          value: { x: source.data.width, y: source.data.height },
        },
      },
      vertexShader: planeShaders.vertexShader,
      fragmentShader: planeShaders.fragmentShader,
    };
  }, [planeTexture]);

  return (
    <mesh ref={planeMesh} {...props}>
      <planeGeometry args={[width, height, 30, 30]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default Plane;
