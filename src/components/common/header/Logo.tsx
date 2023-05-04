import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-[3px] transition-colors duration-200 hover:text-pink">
      <Image src={"/images/demo/vercel.svg"} alt={"Logo of the Project"} width={25} height={25} />
      <span className="text-2xl font-light text-amethyst">/</span>
      <h4 className={`font-primary text-lg font-semibold`}>Starter App</h4>
    </Link>
  );
}
