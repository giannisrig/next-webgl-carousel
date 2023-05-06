import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";

export default function CustomCursor() {
  // The ref item for the circle follower of the cursor
  const cursorFollower = useRef(null);
  const [extraClass, setExtraClass] = useState("bg-white  text-black mix-blend-difference");
  // Dispatch store
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const hover = selector((state: RootState) => state.customCursor.hover);
  const text = selector((state: RootState) => state.customCursor.text);
  const activePlane = selector((state: RootState) => state.webglCarousel.activePlane);

  useEffect(() => {
    gsap.set(cursorFollower.current, { xPercent: -50, yPercent: -50 });

    const ball = cursorFollower.current;
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

  useEffect(() => {
    gsap.to(cursorFollower.current, {
      scale: hover ? 2 : 1,
    });

    setExtraClass(hover ? "bg-black text-white" : "bg-white  text-black mix-blend-difference");
  }, [hover]);

  useEffect(() => {
    gsap.to(cursorFollower.current, {
      opacity: activePlane ? 0 : 1,
    });
  }, [activePlane]);

  return (
    <div
      id={"cursorFollower"}
      ref={cursorFollower}
      className={`pointer-events-none fixed left-0 top-0 z-90 flex h-[70px] w-[70px] items-center justify-center rounded-full text-center ${extraClass}`}
    >
      {text}
    </div>
  );
}
