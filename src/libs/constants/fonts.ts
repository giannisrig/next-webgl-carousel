import localFont from "next/font/local";
import { Noto_Sans_Mono } from "next/font/google";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

interface AppFonts {
  primary: NextFontWithVariable;
  secondary: NextFontWithVariable;
}

//load the Google fonts
const noto_sans_mono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-sans-mono",
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
  variable: "--font-grava",
});

//define the fonts object
const fonts: AppFonts = {
  primary: noto_sans_mono,
  secondary: grava,
};

export default fonts;
