import { motion, useTransform } from "framer-motion";
import { useScroll } from "framer-motion";

export default function UseScrollBasic() {
  //scrollXYProgress is a value between 0 and 1 that represents the current scroll position of the page.
  const { scrollYProgress, scrollXProgress } = useScroll();
  const { scrollY, scrollX } = useScroll(); // these are absolute values
  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //     console.log("ScrollYProgress: ", latest)
  // })
  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["red", "red", "white"]
  );

  return (
    <>
      <div>
        <motion.div
          style={{ scaleX: scrollYProgress, x: "-50%", background }}
          className="fixed left-1/2 bottom-0 h-1 w-screen bg-sky-500"
        ></motion.div>
      </div>
      <div></div>
    </>
  );
}
