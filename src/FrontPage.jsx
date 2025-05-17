import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GsapImageToggle from "./App";
import styles from "./Page.module.css";
import { ScrollTrigger } from "gsap/all";
function FrontPage() {
  const [content, setContent] = useState(false);
  const [clicked, setClicked] = useState(false);
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      delay: 1,
      duration: 2,
      rotate: 20,
      scale: 2,
      ease: "expo.inOut",
      transformOrigin: "78% 40%",
    }).to(".vi-mask-group", {
      duration: 2,
      rotate: 90,
      delay: -1.8,
      scale: 7,
      ease: "expo.inOut",
      transformOrigin: "78% 40%",
      opacity: 1,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          tl.fromTo(
            ".vi-mask-group",
            { opacity: 0.5, duration: 4 },
            { opacity: 0 }
          );
          gsap.to(".svg", {
            opacity: 1,
            duration: 1,
            onComplete: () => {
              gsap.set(".svg", { display: "none" });
              setContent(true);
            },
          });
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.set(".main", { opacity: 1 });
    tl.fromTo(
      ".bg-image",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power1.inOut" }
    );
  }, [content]);

  return (
    <>
      <div className="svg fixed bg-black top-0 left-0 z-[100] w-full h-screen overflow-hidden transition-opacity duration-500">
        <svg
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="200"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  иI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./her1.jpg"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax meet"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      <div className="main w-full h-full absolute top-0 left-0 opacity-0 z-50">
        {!clicked && (
          <div className="landing w-full overflow-hidden h-screen relative">
            <img
              className="absolute  left-0 w-full  object-center"
              src="./three.png"
              alt="background"
            />
          </div>
        )}
        {/* header */}
        {!clicked ? (
          <>
            <div className={styles.sliderContainer}>
              <div ref={slider} className={`${styles.slider}`}>
                <p ref={firstText} className="uppercase">
                  . Gosha Rubchinskiy . Ulyana Sergeenko
                </p>

                <p ref={secondText} className="uppercase">
                  . Gosha Rubchinskiy . Ulyana Sergeenko
                </p>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <GsapImageToggle clicked={clicked} setClicked={setClicked} />
      </div>
    </>
  );
}

export default FrontPage;
