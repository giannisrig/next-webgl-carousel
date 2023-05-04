import Image from "next/image";

export default function DevelopedBy() {
  return (
    <div className="flex items-center gap-10px">
      <Image
        className="rounded-full"
        src="/images/demo/giannis-riganas.jpg"
        alt={`Giannis Riganas Full Stack Developer Photo`}
        width={30}
        height={30}
      />
      <div className="font-primary text-sm">
        <span>Developed & designed by&nbsp;</span>
        <a
          href="#"
          className="text-pink transition-colors duration-200 hover:text-green"
        >
          Giannis Riganas
        </a>
      </div>
    </div>
  );
}
