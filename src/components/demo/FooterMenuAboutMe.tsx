import FooterMenu from "@/components/demo/FooterMenu";

export default function FooterMenuAboutMe() {
  const list = [
    {
      name: "Website",
      url: "https://giannisriganas.gr",
    },
    {
      name: "Github",
      url: "https://github.com/giannisrig",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/giannis-riganas/",
    },
    {
      name: "UpWork",
      url: "https://www.upwork.com/fl/giannisriganas",
    },
    {
      name: "Code Playground",
      url: "https://playground.giannisriganas.gr",
    },
  ];

  return (
    <div className="flex max-w-full flex-col gap-15px">
      <h3 className={`font-primary text-2xl font-semibold`}>About me</h3>
      <FooterMenu list={list} />
    </div>
  );
}
