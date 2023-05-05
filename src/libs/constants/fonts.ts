import localFont from "next/font/local";
import { Unna } from "next/font/google";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

interface AppFonts {
  primary: NextFontWithVariable;
  secondary: NextFontWithVariable;
}

//load the Google fonts
const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-primary",
});

//load the local fonts
const grava = localFont({
  src: [
    {
      path: "../../../public/fonts/Grava Display Normal.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Grava Display Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Grava Display Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-secondary",
});

//define the fonts object
const fonts: AppFonts = {
  primary: unna,
  secondary: grava,
};

export default fonts;
