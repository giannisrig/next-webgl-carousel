import Image from "next/image";

export default function GithubLink() {
  return (
    <a
      href="https://github.com/giannisrig/next-core-template"
      target="_blank"
      className="flex items-center gap-5px rounded-full border border-silver bg-white px-10px py-7px text-black transition-colors duration-200 hover:border-black"
    >
      <Image src="/github.svg" alt="Github Logo" width={18} height={18} priority />
      <span className="hidden font-secondary text-sm mdl:block">View on github</span>
    </a>
  );
}
