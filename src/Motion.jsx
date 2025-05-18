import { useRef } from "react";
import imgHero from "../public/Hero.png";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { ReactLenis } from "lenis/dist/lenis-react";

import { img8, img10, img12, img14, img16 } from "./index.js";
const redCat = imgHero;

const Parallax = () => {
  return (
    <>
      <div className="min-h-screen h-fit w-full scroll-smooth bg-neutral-950">
        <ReactLenis root>
          <Hero className="bg-neutral-950">
            <CenterImage />
          </Hero>
          <div className="h-full bg-neutral-950"></div>
        </ReactLenis>
      </div>
    </>
  );
};

export default Parallax;

const Hero = () => {
  const targetRef = useRef(null); // Create a ref to track the scroll position
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["100vh end ", "end start"],
  }); // Use the ref to track scroll position

  return (
    <div
      ref={targetRef}
      className="relative w-full bg-neutral-950"
      style={{ height: `calc(200vh)` }}
    >
      <CenterImage scrollYProgress={scrollYProgress} />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-neutral-950/0 to-neutral-950"></div>
    </div>
  );
};

const CenterImage = ({ scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]); // Transform scroll position to opacity
  const backgroundSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["150%", "100%"]
  ); // Transform scroll position to scale

  const clip1 = useTransform(scrollYProgress, [0, 0.5], [25, 0]);
  const clip2 = useTransform(scrollYProgress, [0, 0.5], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}% , ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  return (
    <>
      <motion.div
        className="sticky top-[2rem] h-[100vh] w-full mx-auto"
        style={{
          opacity,
          backgroundSize: "100%",
          clipPath,
          backgroundImage: `url(${redCat})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      ></motion.div>
    </>
  );
};

const ParallaxImages = () => {
  return (
    <>
      <div className="mx-auto min-h-screen  max-w-7xl px-4  relative z-5">
        <ParallaxImage
          bg={img8}
          className={`w-50 absolute left-[-2rem] top-10 aspect-square`}
          start={-100}
          end={200}
        />
        <ParallaxImage
          bg={img10}
          className={`size-50 absolute left-50 top-[20rem] aspect-square`}
          start={0}
          end={-100}
        />
        <ParallaxImage
          bg={img12}
          className={`w-48 absolute inset-x-0 mx-auto bottom-5 aspect-square`}
          start={100}
          end={-300}
        />
        <ParallaxImage
          bg={img14}
          className={`w-50 absolute right-5 top-5  aspect-square`}
          start={200}
          end={200}
        />
        <ParallaxImage
          bg={img16}
          className={`w-50 absolute right-[15rem] bottom-10 aspect-square`}
          start={0}
          end={-200}
        />
      </div>
    </>
  );
};

function ParallaxImage({ bg, className, start, end }) {
  const ref = useRef(null); // Create a ref to track the scroll position

  // const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });
  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]); // Transform scroll position to opacity
  const y = useTransform(scrollYProgress, [0, 1], [start, end]); // Transform scroll position to opacity
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.8]); // Transform scroll position to opacity
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;
  // useMotionValueEvent(scrollYProgress, "change", (latest) => {console.log(latest) })

  return (
    <motion.div
      style={{ opacity, transform, backgroundImage: `url(${bg})` }}
      ref={ref}
      className={`rounded-tl-[10px] rounded-br-[10px] border bg-cover bg-top shadow ${className} `}
    ></motion.div>
  );
}
