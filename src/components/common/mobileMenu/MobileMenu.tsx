import { useAppDispatch, useAppSelector, RootState } from "@/libs/store/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setMobileMenuOpen } from "@/slices/mobileMenuSlice";
import MobileNavigation from "@/components/common/mobileMenu/MobileNavigation";
import CloseMobileMenu from "@/components/common/mobileMenu/CloseMobileMenu";

export default function MobileMenu() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const mobileMenuOpen = selector((state: RootState) => state.mobileMenu.open); // updated
  const overlayActive = selector((state: RootState) => state.overlay.active); // updated
  const [mobileMenuClass, setMobileMenuClass] = useState("translate-x-full");

  const mobileMenuClassHandler = (stateSelector) => {
    // Change the transform class for the mobile menu based on the stateSelector passed
    if (stateSelector) {
      setMobileMenuClass("translate-x-0");
    } else {
      setMobileMenuClass("translate-x-full");
    }
  };

  // Hook when the mobile menu state is changed
  useEffect(() => {
    mobileMenuClassHandler(mobileMenuOpen);
  }, [mobileMenuOpen]);

  // Hook when the overlay state is changed
  useEffect(() => {
    mobileMenuClassHandler(overlayActive);
  }, [overlayActive]);

  // Hook when the route is changing
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      dispatch(setMobileMenuOpen(false));
    });
  }, [dispatch, router.events]);

  return (
    <header
      className={`fixed right-0 top-0 z-30 h-screen w-[300px] bg-mirage transition-all duration-200 ` + mobileMenuClass}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between border-b-2 border-bleached px-30px py-10px pb-5px">
          <div className="py-10px xl:py-20px">Logo Here</div>
          <CloseMobileMenu />
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}
