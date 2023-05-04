import Image from "next/image";
import { useAppDispatch } from "@/libs/store/store";
import { setMobileMenuOpen } from "@/slices/mobileMenuSlice";
import { setOverlayActive } from "@/slices/overlaySlice";

export default function HamburgerButton() {
  const dispatch = useAppDispatch();

  function openMobileMenu(e) {
    e.preventDefault();
    dispatch(setMobileMenuOpen(true));
    dispatch(setOverlayActive(true));
  }

  return (
    <a
      href="#"
      className="flex items-center gap-7px transition-colors duration-200  hover:text-green"
      onClick={(e) => openMobileMenu(e)}
    >
      <Image src="/images/hamburger.svg" alt="Menu Icon" width={20} height={20} />
      <span className="text-sm">Menu</span>
    </a>
  );
}
