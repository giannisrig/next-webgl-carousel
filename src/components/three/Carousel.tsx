import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import CarouselItem from "@/components/three/CarouselItem";
import { lerp, getPyramidIndex } from "@/libs/utils/carouselHelper";
import images from "@/libs/constants/images";
import { Object3D, Texture } from "three";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { setWebglCarouselActivePlane, setPlanesEdges, setMoving, setInitialized } from "@/slices/webglCarouselSlice";
import { useTexture } from "@react-three/drei";
import planeSettings from "@/libs/constants/planeSettings";
import { TypedUseSelectorHook } from "react-redux";

const Carousel = () => {
  // Get the viewport from ThreeJS
  const { viewport } = useThree();

  // Refs for the carousel and the mesh
  const carousel = useRef();
  const mesh = useRef(null);

  // Dispatch for the Redux state
  const dispatch = useAppDispatch();
  const selector: TypedUseSelectorHook<RootState> = useAppSelector;

  // Set state vars
  const activePlane = selector((state: RootState) => state.webglCarousel.activePlane);
  const initialized = selector((state: RootState) => state.webglCarousel.initialized);

  // Define refs for the vars needed for the functionality
  // Note that is not recommended to use state vars in the useFrame() hook
  // That's why refs are used instead of state vars
  const direction = useRef("left");
  const startX = useRef(0);
  const isDown = useRef(false);
  const progress = useRef(0);
  const oldProgress = useRef(0);

  // Load our global Textures that will be used in all carousel items
  const transparentTexture: Texture | Texture[] = useTexture<string | string[]>(planeSettings.transparentImage);
  const distortedTexture: Texture | Texture[] = useTexture<string | string[]>(planeSettings.distortedImage);

  const displayItems = (item: Object3D, index: number, active: number) => {
    // If the current ref item is empty return
    if (!carousel.current) {
      return;
    }

    // Define our ThreeJs Carousel
    const threeCarousel: Object3D = carousel.current;

    // Get the indexes of the carousel items in pyramid sorting
    const pyramidIndex: number = getPyramidIndex(threeCarousel.children, active)[index];

    // Get the amount we are going to rotate carousel items based on the mouse/dragged direction
    const directionRotate: number = direction.current === "left" ? pyramidIndex * -0.01 : pyramidIndex * 0.01;

    // If we are moving the carousel rotate otherwise set back to 0 for default
    const rotate: number = isDown.current ? directionRotate : 0;

    // Apply and animate the rotation to the item with GSAP
    gsap.to(item.rotation, {
      x: 0,
      y: 0,
      z: rotate,
      duration: 1.5,
      ease: "power3.out",
    });

    // Animate the position of the carousel item with GSAP
    gsap.to(item.position, {
      x: (index - active) * (planeSettings.width + planeSettings.gap),
      y: threeCarousel.children.length * -0.1 + pyramidIndex * 0.1,
      duration: 1.5,
      ease: "power3.out",
    });
  };

  /*--------------------
  RAF
  --------------------*/
  useFrame(() => {
    // If the current ref item is empty return
    if (!carousel.current) {
      return;
    }

    // Define our ThreeJs Carousel
    const threeCarousel: Object3D = carousel.current;

    // Calculate the progress
    progress.current = Math.max(0, Math.min(progress.current, 100));
    oldProgress.current = progress.current;

    // Set the active carousel item
    const active = Math.floor((progress.current / 100) * (threeCarousel.children.length - 1));

    // Render the Carousel Items on each frame
    threeCarousel.children.forEach((item, index) => displayItems(item, index, active));

    // Set the old progress
    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1);
  });

  /*--------------------
  Handle Down
  --------------------*/
  const handleDown = (e) => {
    if (activePlane !== null) return;
    isDown.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dispatch(setMoving(true));
  };

  /*--------------------
  Handle Up
  --------------------*/
  const handleUp = () => {
    isDown.current = false;

    const threeCarousel: Object3D = carousel.current;

    const pyramidIndex: number = getPyramidIndex(
      threeCarousel.children,
      Math.floor((progress.current / 100) * (threeCarousel.children.length - 1))
    );

    const data: number[] = [];
    threeCarousel.children.forEach((item, index) => {
      // console.log("Item: " + index, item.position.x);
      if (Math.abs(pyramidIndex[index] - threeCarousel.children.length) > 2) {
        data.push(index);
      }
    });
    dispatch(setPlanesEdges(data));
    dispatch(setMoving(false));
  };

  /*--------------------
  Handle Move
  --------------------*/
  const handleMove = (e) => {
    if (activePlane !== null || !isDown.current) return;

    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX.current) * planeSettings.speedDrag;
    progress.current = progress.current + mouseProgress;
    direction.current = x > startX.current ? "left" : "right";
    // console.log(progress.current);
    startX.current = x;
  };

  // This hook runs every time the activePlane is updated
  useEffect(() => {
    // If the current ref item is empty return and there's no active plane, then return
    if (!carousel.current || activePlane === null) {
      return;
    }

    // Define our ThreeJs Carousel
    const threeCarousel: Object3D = carousel.current;

    // Calculate the progress.current based on activePlane
    progress.current = (activePlane / (threeCarousel.children.length - 1)) * 100;
  }, [activePlane]);

  // This code will run once when the carousel component is rendered
  useEffect(() => {
    // If the current ref item is empty or initialized true, return
    if (!carousel.current || initialized) {
      return;
    }

    // Define our ThreeJs Carousel
    const threeCarousel: Object3D = carousel.current;

    // Set the active plane as the middle carousel item
    dispatch(setWebglCarouselActivePlane(threeCarousel.children.length / 2));

    // After 300 ms
    setTimeout(() => {
      // Set the active plane to null
      dispatch(setWebglCarouselActivePlane(null));

      // Se the initialized state to true
      dispatch(setInitialized(true));
    }, 300);
  }, [dispatch, initialized]);

  return (
    <group>
      <mesh
        ref={mesh}
        position={[0, 0, -0.01]}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerLeave={handleUp}
        onPointerCancel={handleUp}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh>
      <group ref={carousel}>
        {images.map((item, i) => (
          <CarouselItem
            key={i}
            transparentTexture={transparentTexture}
            distortedTexture={distortedTexture}
            image={item.image}
            index={i}
          />
        ))}
      </group>
    </group>
  );
};

export default Carousel;
