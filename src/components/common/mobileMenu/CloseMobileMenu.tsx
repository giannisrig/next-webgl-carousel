import Image from "next/image";
import { useAppDispatch } from "@/libs/store/store";
import { setMobileMenuOpen } from "@/slices/mobileMenuSlice";
import { setOverlayActive } from "@/slices/overlaySlice";

export default function CloseMobileMenu() {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const closeMobileMenu = (event) => {
    event.preventDefault();
    dispatch(setMobileMenuOpen(false));
    dispatch(setOverlayActive(false));
  };

  return (
    <>
      <a
        className="flex items-center gap-5px transition-colors duration-200 hover:text-pink"
        href="#"
        onClick={(e) => closeMobileMenu(e)}
      >
        <div className="flex items-center justify-center rounded-full bg-bleached p-2">
          <Image src="/images/close.svg" alt="Close menu icon" width={10} height={10} />
        </div>
        <span className="text-sm">Close</span>
      </a>
    </>
  );
}
