import { setOverlayActive } from "@/slices/overlaySlice";
import { setMobileMenuOpen } from "@/slices/mobileMenuSlice";
import { useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";

export default function Overlay() {
  const [overlayClass, setOverlayClass] = useState("hidden");

  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const overlayActive = selector((state: RootState) => state.overlay.active);
  const overlayElement = useRef(null);

  useEffect(() => {
    if (overlayActive) {
      setOverlayClass("block");
    } else {
      setOverlayClass("hidden");
    }
  }, [overlayActive]);

  const overlayClickHandler = (event) => {
    event.preventDefault();
    dispatch(setOverlayActive(false));
    dispatch(setMobileMenuOpen(false));
    setOverlayClass("hidden");
  };

  return (
    <div
      className={`fixed left-0 top-0 z-20 h-screen w-screen backdrop-blur-lg ` + overlayClass}
      onClick={(e) => overlayClickHandler(e)}
      ref={overlayElement}
    />
  );
}
