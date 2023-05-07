import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import ImagePlane from "./ImagePlane";
import { Object3D, Texture } from "three";
import { useAppDispatch, useAppSelector, RootState } from "@/libs/store/store";
import { setHoveredPlane, setWebglCarouselActivePlane } from "@/slices/webglCarouselSlice";
import { TypedUseSelectorHook } from "react-redux";
const CarouselItem = ({
  index,
  image,
  transparentTexture,
  distortedTexture,
}: {
  index: number;
  image: string;
  transparentTexture: Texture | Texture[];
  distortedTexture: Texture | Texture[];
}) => {
  // Get the ThreeJS viewport
  const { viewport } = useThree();

  // Ref for the current carousel Item
  const carouselItem = useRef(null);

  // Our redux store Selector and Dispatch
  const selector: TypedUseSelectorHook<RootState> = useAppSelector;
  const dispatch = useAppDispatch();

  // Get Redux state for the carousel
  const activePlane = useAppSelector((state: RootState) => state.webglCarousel.activePlane);
  const planesEdges = selector((state: RootState) => state.webglCarousel.planesEdges);
  const initialized = selector((state: RootState) => state.webglCarousel.initialized);
  const moving = selector((state: RootState) => state.webglCarousel.moving);

  // Component state
  const [hover, setHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [onTheEdge, setOnTheEdge] = useState(false);
  const [isCloseActive, setCloseActive] = useState(false);

  useEffect(() => {
    if (planesEdges === null) {
      return;
    }
    setOnTheEdge(planesEdges.includes(index));
  }, [planesEdges, index]);

  useEffect(() => {
    if (initialized && activePlane === index) {
      setIsActive(activePlane === index);
      setCloseActive(true);
    } else {
      setIsActive(null);
    }
  }, [initialized, activePlane, index]);

  useEffect(() => {
    if (carouselItem.current) {
      const current: Object3D = carouselItem.current;
      gsap.killTweensOf(current.position);
      gsap.to(current.position, {
        z: isActive ? 0 : -0.01,
        duration: 0.5,
        ease: "power3.out",
        delay: isActive ? 0 : 0.5,
      });
    }
  }, [isActive]);

  /*------------------------------
  Hover effect
  ------------------------------*/
  useEffect(() => {
    if (isActive) {
      return;
    }

    dispatch(setHoveredPlane(hover));

    // Set the hover scale
    const hoverScale = hover ? 1.1 : 1;

    // Apply the animation with gsap
    gsap.to(carouselItem.current.scale, {
      x: hoverScale,
      y: hoverScale,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [dispatch, hover, isActive]);

  const handleClose = (e) => {
    e.stopPropagation();
    if (!isActive) return;
    dispatch(setWebglCarouselActivePlane(null));
    setHover(false);
    setTimeout(() => {
      setCloseActive(false);
    }, 500); // The duration of this timer depends on the duration of the plane's closing animation.
  };

  const handleMouseEnter = () => {
    if (isActive) {
      return;
    }
    setHover(true);
  };

  const handleMouseLeave = () => {
    if (isActive) {
      return;
    }
    setHover(false);
  };

  return (
    <group
      ref={carouselItem}
      onClick={() => {
        dispatch(setWebglCarouselActivePlane(index));
      }}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      <ImagePlane
        image={image}
        transparentTexture={transparentTexture}
        distortedTexture={distortedTexture}
        active={isActive}
        edge={onTheEdge}
        hover={hover}
        moving={moving}
      />

      {isCloseActive ? (
        <mesh position={[0, 0, 0.01]} onClick={handleClose}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent={true} opacity={0} color={"red"} lightMapIntensity={0.5} />
        </mesh>
      ) : null}
    </group>
  );
};

export default CarouselItem;
