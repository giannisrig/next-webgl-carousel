import Head from "next/head";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
import { ReactNodeWrapper } from "@/types/index";
import CustomCursor from "@/components/common/customCursor/CustomCursor";

export default function Layout({ children }: ReactNodeWrapper) {
  return (
    <>
      <Head>
        <title>NextJS: Weather App</title>
        <meta name="description" content="A weather app built with Next.js" />
      </Head>
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
