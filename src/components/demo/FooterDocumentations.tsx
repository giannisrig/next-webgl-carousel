import TechStack from "@/components/demo/TechStack";

export default function FooterDocumentations() {
  return (
    <div className="flex flex-col gap-25px">
      <h4 className={`font-primary text-2xl font-semibold`}>Tech stack of the project</h4>
      <div className="grid w-full grid-cols-1 gap-30px sm:grid-cols-2 mdl:grid-cols-4 lg:gap-50px">
        <TechStack
          url="https://nextjs.org/docs"
          name="NextJS"
          img="/images/demo/nextjs.svg"
          alt="NextJS icon"
          desc="Find in-depth information about Next.js features and API."
        />
        <TechStack
          url="https://tailwindcss.com/docs/installation"
          name="Tailwind"
          img="/images/demo/tailwind.svg"
          alt="Tailwind icon"
          desc="Utility-first CSS framework to build any design, directly in your
            markup."
        />
        <TechStack
          url="https://redux.js.org/introduction/getting-started"
          name="Redux"
          img="/images/demo/redux.svg"
          alt="Redux icon"
          desc="A predictable, flexible and centralized State Container for JS Apps."
        />
        <TechStack
          url="https://vercel.com/new"
          name="Vercel"
          img="/images/demo/vercel.svg"
          alt="Vercel icon"
          desc="Instantly deploy your Next.js site to a shareable URL with Vercel."
        />
      </div>
    </div>
  );
}
