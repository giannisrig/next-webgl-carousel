import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { RootState, useAppSelector } from "@/libs/store/store";
import { TypedUseSelectorHook } from "react-redux";

export default function CustomCursor() {
  // The ref item for the circle follower of the cursor
  const cursorFollower = useRef(null);

  // Component state for the css classes
  const [extraClass, setExtraClass] = useState("bg-white text-black mix-blend-difference");
  const [text, setText] = useState(null);

  // Redux state selector
  const selector: TypedUseSelectorHook<RootState> = useAppSelector;

  // Redux state
  const activePlane = selector((state: RootState) => state.webglCarousel.activePlane);
  const hoveredPlane = selector((state: RootState) => state.webglCarousel.hoveredPlane);
  const isInteracting = selector((state: RootState) => state.webglCarousel.interacting);

  useEffect(() => {
    gsap.set(cursorFollower.current, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;

      gsap.to(cursorFollower.current, {
        x: mouse.x,
        y: mouse.y,
      });
    });
  });

  const cursorHover = (hoverState) => {
    gsap.to(cursorFollower.current, {
      scale: hoverState ? 2 : 1,
    });
  };

  useEffect(() => {
    cursorHover(hoveredPlane);
    setText(hoveredPlane ? "VIEW" : "DRAG");
    setExtraClass(hoveredPlane ? "bg-white text-black" : "bg-black text-white");
  }, [hoveredPlane]);

  useEffect(() => {
    setText(isInteracting ? "DRAG" : null);
    setExtraClass(
      isInteracting ? "bg-black text-white" : "bg-transparent border border-black max-h-[20px] max-w-[20px]"
    );
  }, [isInteracting]);

  useEffect(() => {
    gsap.to(cursorFollower.current, {
      opacity: activePlane ? 0 : 1,
    });
  }, [activePlane]);

  return (
    <div
      id={"cursorFollower"}
      ref={cursorFollower}
      className={`pointer-events-none fixed left-0 top-0 z-90 flex h-[60px] w-[60px] items-center justify-center rounded-full text-center transition-colors duration-200 ${extraClass}`}
    >
      {text}
    </div>
  );
}
