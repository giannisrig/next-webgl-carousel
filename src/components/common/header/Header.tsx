import MobileMenu from "@/components/common/mobileMenu/MobileMenu";
import HamburgerButton from "@/components/common/mobileMenu/HamburgerButton";
import Logo from "@/components/common/header/Logo";
import GithubLink from "@/components/common/header/GithubLink";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 z-10 w-full border-b border-basicGray py-6 text-sm backdrop-blur-lg">
        <div className="container">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-20px">
              <Logo />
              <div className="h-[20px] w-[1px] bg-silver" />
              <GithubLink />
            </div>

            <div className="flex items-center gap-20px">
              <HamburgerButton />
            </div>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
}
