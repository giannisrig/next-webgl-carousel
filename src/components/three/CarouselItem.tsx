import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import ImagePlane from "./ImagePlane";
import { Object3D } from "three";
import { useAppDispatch, useAppSelector, RootState } from "@/libs/store/store";
import { setWebglCarouselActivePlane } from "@/slices/webglCarouselSlice";
import { setCustomCursorHover, setCustomCursorText } from "@/slices/customCursorSlice";

const CarouselItem = ({ index, width, height, activePlane, item, initialized }) => {
  const selector = useAppSelector;
  const planesEdges = selector((state: RootState) => state.webglCarousel.planesEdges);
  const dispatch = useAppDispatch();
  const carouselItem = useRef(null);
  const [hover, setHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [onTheEdge, setOnTheEdge] = useState(false);
  const [isCloseActive, setCloseActive] = useState(false);
  const { viewport } = useThree();
  const carouselActivePlane = initialized ? activePlane : false;

  useEffect(() => {
    if (planesEdges === null) {
      return;
    }
    setOnTheEdge(planesEdges.includes(index));
  }, [planesEdges, index]);

  useEffect(() => {
    if (carouselActivePlane === index) {
      setIsActive(carouselActivePlane === index);
      setCloseActive(true);
    } else {
      setIsActive(null);
    }
  }, [carouselActivePlane, index]);

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
    // Update the state for the custom cursor hover
    dispatch(setCustomCursorHover(hover));

    // Update the state for the Custom Cursor Text
    dispatch(setCustomCursorText(hover ? "View" : "Drag"));

    // Set the hover scale
    const hoverScale = hover && !isActive ? 1.1 : 1;

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

  return (
    <group
      ref={carouselItem}
      onClick={() => {
        dispatch(setWebglCarouselActivePlane(index));
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <ImagePlane
        width={width}
        height={height}
        texture={item.image}
        texture2={item.image2}
        active={isActive}
        edge={onTheEdge}
        hover={hover}
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
