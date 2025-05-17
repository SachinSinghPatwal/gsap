import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./index.css";
import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
} from "./index.js";
import Variants from "./Variants";

const totalDivs = 10;

const GsapImageToggle = ({ clicked, setClicked }) => {
  const holderRefs = useRef([]);
  const imgRefs = useRef([]);
  const tl = useRef(null);
  const backBtnRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [timelineReady, setTimelineReady] = useState(false);

  const firstGrid = [img1, img2, img3, img4, img5, img6, img7, img8];
  const secondGrid = [img9, img10, img11, img12, img13, img14, img15, img16];

  const thirdGird = [img17, img18, img19, img20, img21, img22, img23, img24];
  const fourtGrid = [img25, img26, img27, img28, img29, img30, img31, img32];

  const firstGridNames = [
    "Drift — A04",
    "Veil — K18",
    "Ember — M45",
    "Gleam — S12",
    "Bloom — J29",
    "Whisper — V87",
    "Trace — Z05",
    "Flicker — Q62",
  ];

  const secondGridNames = [
    "Grain — H71",
    "Pulse — B90",
    "Mist — L36",
    "Shard — Y22",
    "Vapor — X79",
    "Glow — F13",
    "Flux — N48",
    "Spire — C65",
  ];

  const thirdGridNames = [
    "Driftwood — W50",
    "Fold — T81",
    "Shroud — E26",
    "Ripple — P34",
    "Fray — U07",
    "Wane — R52",
    "Tide — S33",
    "Rift — G08",
  ];

  const fourthGridNames = [
    "Spool — H94",
    "Glitch — M70",
    "Slip — F02",
    "Husk — C15",
    "Blur — V86",
    "Fracture — A63",
    "Mote — Y39",
    "Aura — K21",
  ];

  const remToPx = (rem) => rem * 16;
  const getDivWidthPx = (i) => remToPx(10 + i * 2);
  const getDivHeightPx = (i) => remToPx(12 + i * 2);

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    const enterDuration = 0.3;
    const exitDuration = 0.1;
    const staggerDelay = 0.08;

    tl.current
      .fromTo(
        holderRefs.current,
        { yPercent: -100, opacity: 1, pointerEvents: "none" },
        {
          duration: enterDuration,
          yPercent: 0,
          opacity: 1,
          pointerEvents: "auto",
          stagger: staggerDelay,
          ease: "power2.out",
        }
      )
      .fromTo(
        imgRefs.current,
        { yPercent: 100, opacity: 0, display: "block" },
        {
          duration: enterDuration,
          yPercent: 0,
          opacity: 1,
          stagger: staggerDelay,
          ease: "power2.out",
        },
        "<"
      );

    const exitStartTime = staggerDelay * 3;
    const exitTl = gsap.timeline();

    for (let i = 0; i < totalDivs - 1; i++) {
      exitTl
        .to(imgRefs.current[i], {
          duration: exitDuration,
          yPercent: -100,
          opacity: 1,
          display: "block",
          ease: "power2.in",
        })
        .to(
          holderRefs.current[i],
          {
            duration: exitDuration,
            yPercent: 100,
            opacity: 0,
            display: "block",
            ease: "power2.in",
          },
          "<"
        );
    }

    tl.current.add(exitTl, exitStartTime);
    setTimelineReady(true);
  }, []);

  useEffect(() => {
    if (clicked && backBtnRef.current) {
      gsap.fromTo(
        backBtnRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [clicked]);

  const handleClick = (url, index, event) => {
    if (!timelineReady) return;

    const imgRect = event.currentTarget.getBoundingClientRect();
    const side = index % 8 < 4 ? "right" : "left";

    const name = index < 8 ? firstGridNames[index] : secondGridNames[index - 8];

    setActiveImage({ url, side, top: imgRect.top, left: imgRect.left, name });
    setClicked(true);

    if (tl.current) tl.current.play(0);
  };

  return (
    <div
      className="grid place-items-center"
      style={{
        fontFamily: "halyard-display, sans-serif",
      }}
    >
      {/* generated div */}
      <div style={{ position: "relative" }} className="">
        {[...Array(totalDivs)].map((_, i) => {
          if (!activeImage) {
            return (
              <div
                key={i}
                ref={(el) => (holderRefs.current[i] = el)}
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  width: `${10 + i * 2}rem`,
                  height: `${12 + i * 2}rem`,
                  opacity: 1,
                  pointerEvents: "none",
                }}
              >
                <img
                  ref={(el) => (imgRefs.current[i] = el)}
                  loading="lazy"
                  src={firstGrid[0]}
                  alt={`img-${i}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            );
          }

          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const firstLeft = activeImage.left;
          const screenPaddingX = 32;
          const lastLeft =
            activeImage.side === "left"
              ? screenPaddingX
              : viewportWidth - getDivWidthPx(totalDivs - 1) - screenPaddingX;

          const intervals = totalDivs - 1;
          const leftPos = firstLeft + ((lastLeft - firstLeft) / intervals) * i;
          const clampedLeft = Math.min(
            Math.max(leftPos, screenPaddingX),
            viewportWidth - getDivWidthPx(i) - screenPaddingX
          );

          const screenPaddingY = 130;
          const firstTop = activeImage.top;
          const lastTop =
            firstTop < viewportHeight / 2
              ? viewportHeight - getDivHeightPx(totalDivs - 1) - screenPaddingY
              : screenPaddingY;

          const topPos = firstTop + ((lastTop - firstTop) / intervals) * i;
          const clampedTop = Math.min(
            Math.max(topPos, screenPaddingY),
            viewportHeight - getDivHeightPx(i) - screenPaddingY
          );

          return (
            <div
              key={i}
              ref={(el) => (holderRefs.current[i] = el)}
              style={{
                position: "fixed",
                top: `${clampedTop}px`,
                left: `${clampedLeft}px`,
                overflow: "hidden",
                width: `${10 + i * 2}rem`,
                height: `${12 + i * 2.8}rem`,
                opacity: 1,
                pointerEvents: "none",
                zIndex: 1000,
              }}
            >
              <img
                ref={(el) => (imgRefs.current[i] = el)}
                src={activeImage.url}
                alt={`img-${i}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                draggable={false}
              />
            </div>
          );
        })}

        <Variants
          clicked={clicked}
          firstGrid={firstGrid}
          secondGrid={secondGrid}
          firstGridNames={firstGridNames}
          secondGridNames={secondGridNames}
          handleClick={handleClick}
          text="Effect 01"
          heading="Shane Weber"
          effectText={"re imagined"}
        />

        <Variants
          clicked={clicked}
          firstGrid={secondGrid}
          secondGrid={thirdGird}
          firstGridNames={secondGridNames}
          secondGridNames={thirdGridNames}
          handleClick={handleClick}
          text="Effect 02"
          heading="Manika Jorge"
          effectText={"reimaginers"}
        />

        <Variants
          clicked={clicked}
          firstGrid={thirdGird}
          secondGrid={fourtGrid}
          firstGridNames={thirdGridNames}
          secondGridNames={fourthGridNames}
          handleClick={handleClick}
          text="Effect 03"
          heading="Angela Wong"
          effectText={"replacement"}
        />
      </div>
      {/* button */}
      {clicked && (
        <div
          ref={backBtnRef}
          className="absolute bottom-0 m-4 p-2 grid justify-items-end z-[100000]"
          style={{
            left: activeImage.side === "right" ? "0" : "auto",
            right: activeImage.side === "left" ? "0" : "auto",
            minWidth: "6rem",
          }}
        >
          <p className="text-[13px] text-black font-semibold">
            {activeImage?.name}
          </p>
          <button
            className="text-red-600 text-[14px] w-fit cursor-pointer "
            onClick={() => {
              setClicked(false);
              setActiveImage(null);
              tl.current.seek(0).pause();
              holderRefs.current.forEach((ref) => {
                if (ref) ref.style.pointerEvents = "none";
              });
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default GsapImageToggle;
