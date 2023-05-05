import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Carousel from "@/components/three/Carousel";
import { RootState, useAppSelector } from "@/libs/store/store";
import gsap from "gsap";

export default function Home() {
  const mainTitle = useRef();
  const activePlane = useAppSelector((state: RootState) => state.webglCarousel.activePlane);

  // This code will run once when the carousel component is rendered
  useEffect(() => {
    gsap.to(mainTitle.current, {
      opacity: activePlane === null ? 1 : 0,
      x: activePlane === null ? 0 : 100,
      duration: 0.4,
      delay: activePlane === null ? 0.5 : 0,
      ease: "power3.out",
    });
  }, [activePlane]);

  return (
    <Layout>
      <Head>
        <title>NextJS: Starter Template | Demo Project by Giannis Riganas</title>
        <meta name="description" content="A starter demo app built with Next.js" />
      </Head>
      <div className="relative h-screen">
        <h1
          className="absolute left-1/2 top-1/2 z-3 w-max translate-x-[-50%] translate-y-[-50%] text-8xl font-bold text-white mix-blend-difference"
          ref={mainTitle}
        >
          Redefine your Style
        </h1>
        {/*<h3 className="font-outline-2 w-max text-9xl font-bold text-transparent">Redefine your Style</h3>*/}
        <div />
        <div className="absolute top-120px flex w-full  items-center gap-10px px-15px">
          <h3 className="w-max text-4xl font-bold text-silver">NEW COLLECTION</h3>
          <div className="h-[1px] w-[40%] bg-silver" />
        </div>

        <Canvas>
          <Suspense fallback={null}>
            <Carousel />
          </Suspense>
        </Canvas>
      </div>
    </Layout>
  );
}
