import DevelopedBy from "@/components/demo/DevelopedBy";

export default function FooterProjectOverview() {
  return (
    <div className="flex w-full flex-col gap-25px">
      <div className="flex max-w-full flex-col gap-20px">
        <div className="flex max-w-full flex-col gap-5px">
          <h4 className={`font-primary text-2xl font-semibold`}>
            About the Project
          </h4>
          <p className="font-primary text-sm italic text-amethyst">
            Disclaimer: This a demo NextJS project for education and showcase.
          </p>
        </div>
        <p className="text-white">
          A simple weather application that fetches weather data from an API and
          displays it in a visually appealing way. Users can search for weather
          by location, view current weather conditions, and see a forecast for
          the upcoming days.
        </p>
      </div>
      <DevelopedBy />
    </div>
  );
}
