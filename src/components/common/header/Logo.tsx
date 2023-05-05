import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-[4px] transition-colors duration-200 hover:text-pink">
      <Image src={"/images/demo/vercel.svg"} alt={"Logo of the Project"} width={22} height={22} />
      <span className="text-2xl font-light text-silver ">/</span>
      <h4 className={`font-primary text-lg font-semibold`}>Next WebGL Carousel</h4>
    </Link>
  );
}
