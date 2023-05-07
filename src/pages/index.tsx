import Layout from "@/components/layout/Layout";
import Head from "next/head";
import WebglCarousel from "@/components/three/WebglCarousel";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>NextJS: Webgl Carousel | Demo Project by Giannis Riganas</title>
        <meta name="description" content="A starter demo app built with Next.js" />
      </Head>
      <WebglCarousel />
    </Layout>
  );
}
