import FooterDocumentations from "@/components/demo/FooterDocumentations";
import FooterProjectOverview from "@/components/demo/FooterProjectOverview";
import FooterMenuAboutMe from "@/components/demo/FooterMenuAboutMe";
import FooterMenuGetStarted from "@/components/demo/FooterMenuGetStarted";
import ProjectCommand from "@/components/demo/ProjectCommand";

export default function MainFooter() {
  return (
    <div className="py-50px font-secondary lg:py-80px">
      <div className="container">
        <div className="flex w-full flex-col gap-50px mdl:gap-70px">
          <div className="grid w-full grid-cols-1 gap-50px sm:grid-cols-4 md:grid-cols-3 mdl:grid-cols-4">
            <div className="pr-20px sm:col-span-4 md:col-span-3 mdl:col-span-2">
              <FooterProjectOverview />
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <FooterMenuGetStarted />
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <FooterMenuAboutMe />
            </div>
          </div>
          <div className="flex max-w-full flex-col gap-20px">
            <h4 className={`font-primary text-2xl font-semibold`}>Create your NextJs app</h4>
            <ProjectCommand />
          </div>
          <FooterDocumentations />
        </div>
      </div>
    </div>
  );
}
