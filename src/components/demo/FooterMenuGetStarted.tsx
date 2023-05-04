import FooterMenu from "@/components/demo/FooterMenu";

export default function FooterMenuGetStarted() {
  const repository = "https://github.com/giannisrig/next-core-template";

  const list = [
    {
      name: "Read Article / Tutorial",
      url: "#",
    },
    {
      name: "View Repository",
      url: repository,
    },
    {
      name: "Live Demo",
      url: "#",
    },
    {
      name: "Generate Template",
      url: repository + "/generate",
    },
    {
      name: "Deploy on Vercel",
      url: "https://vercel.com/import/git?s=" + repository,
    },
  ];

  return (
    <div className="flex max-w-full flex-col gap-15px">
      <h3 className={`font-primary text-2xl font-semibold`}>Get started</h3>
      <FooterMenu list={list} />
    </div>
  );
}
