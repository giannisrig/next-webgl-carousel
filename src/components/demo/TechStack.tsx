import Image from "next/image";

interface TechStack {
  img: string;
  alt: string;
  name: string;
  desc: string;
  url: string;
}

export default function TechStack({ img, alt, name, desc, url }: TechStack) {
  return (
    <a
      href={url}
      className="flex flex-col gap-15px text-white transition-colors duration-200 hover:text-pink"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex items-center gap-7px">
        <Image src={img} alt={alt} width={25} height={25} />
        <h4 className={`font-primary text-xl font-semibold text-white`}>{name}</h4>
      </span>
      <p className={`m-0 max-w-full text-sm text-amethyst md:max-w-[30ch]`}>{desc}</p>
      <p className={`max-w-full font-primary text-sm md:max-w-[30ch]`}>Read more</p>
    </a>
  );
}
