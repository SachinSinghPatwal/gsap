import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./index.css";
import img1 from "./assets/img1.webp";
import img2 from "./assets/img2.webp";
import img3 from "./assets/img3.webp";
import img4 from "./assets/img4.webp";
import img5 from "./assets/img5.webp";
import img6 from "./assets/img6.webp";
import img7 from "./assets/img7.webp";
import img8 from "./assets/img8.webp";
import img9 from "./assets/img9.webp";
import img10 from "./assets/img10.webp";
import img11 from "./assets/img11.webp";
import img12 from "./assets/img12.webp";
import img13 from "./assets/img13.webp";
import img14 from "./assets/img14.webp";
import img15 from "./assets/img15.webp";
import img16 from "./assets/img16.webp";

const totalDivs = 10;

const GsapImageToggle = () => {
  const holderRefs = useRef([]);
  const imgRefs = useRef([]);
  const tl = useRef(null);
  const backBtnRef = useRef(null);

  const [clicked, setClicked] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [timelineReady, setTimelineReady] = useState(false);

  const firstGrid = [img1, img2, img3, img4, img5, img6, img7, img8];
  const secondGrid = [img9, img10, img11, img12, img13, img14, img15, img16];

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
    <>
      {!clicked ? (
        <>
          <header className="grid grid-flow-col items-center mt-[.8rem] w-[75vw]">
            <h1 className="font-bold text-[13px]">
              repeating image transition
            </h1>
            <nav className="">
              <a
                className="font-bold text-[13px]"
                href="https://tympanus.net/codrops/?p=92571"
              >
                more info,
              </a>
              <a
                class="font-bold text-[13px]"
                href="https://github.com/codrops/RepeatingImageTransition/"
              >
                Code,
              </a>
              <a
                className="font-bold text-[13px]"
                href="https://tympanus.net/codrops/demos/"
              >
                all demos
              </a>
            </nav>
            <nav className="frame__tags">
              <a
                className="font-bold text-[13px]"
                href="https://tympanus.net/codrops/demos/?tag=page-transition"
              >
                page-transition,
              </a>
              <a
                className="font-bold text-[13px]"
                href="https://tympanus.net/codrops/demos/?tag=repetition"
              >
                repetition,
              </a>
              <a
                className="font-bold text-[13px]"
                href="https://tympanus.net/codrops/demos/?tag=grid"
              >
                grid
              </a>
            </nav>
          </header>
          <div className="grid mt-[6rem] mb-[1rem] grid-flow-col justify-items-stretch items-baseline justify-between">
            <h2 className=" text-[3rem] uppercase font-semibold tracking-[-3px] scale-y-150">
              Shane Weber
            </h2>
            <span className="text-[13px] ">
              effect 01: straight linear paths, smooth easing, clean timing,
              minimal rotation.
            </span>
          </div>
        </>
      ) : (
        ""
      )}
      <div style={{ position: "relative" }} className="grid place-items-center">
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

        {!clicked && (
          <div className="flex flex-col gap-4">
            {[firstGrid, secondGrid].map((grid, gridIndex) => (
              <div key={gridIndex} className="grid grid-cols-8 gap-[.5rem]">
                {grid.map((url, index) => {
                  const globalIndex = gridIndex * 8 + index;
                  const name =
                    gridIndex === 0
                      ? firstGridNames[index]
                      : secondGridNames[index];
                  return (
                    <div key={globalIndex} className="flex flex-col  text-end">
                      <img
                        src={url}
                        loading="lazy"
                        alt={`button-img-${globalIndex}`}
                        onClick={(e) => handleClick(url, globalIndex, e)}
                        style={{
                          cursor: "pointer",
                          minWidth: "10rem",
                          height: "12rem",
                          objectFit: "cover",
                          border: "2px solid #ccc",
                          userSelect: "none",
                        }}
                        draggable={false}
                      />
                      <p className="text-[11px] lowercase font-semibold mb-[2rem]">
                        {name}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

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
    </>
  );
};

export default GsapImageToggle;
