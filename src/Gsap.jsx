import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import img1 from "./assets/img1.webp";
import img2 from "./assets/img2.webp";
import img3 from "./assets/img3.webp";
import img4 from "./assets/img4.webp";

function newApp() {
  const [clickedItem, setClickedItem] = useState(null);
  const [generatedDivs, setGeneratedDivs] = useState([]);
  const wrappersRef = useRef({}); // Store refs by index

  const imageData = [
    { src: img1, title: "drift — A04", model: "Amelia Hart", type: "left" },
    { src: img2, title: "veil — K18", model: "Irina Volkova", type: "left" },
    {
      src: img3,
      title: "ember — M45",
      model: "Charlotte Byrne",
      type: "right",
    },
    {
      src: img4,
      title: "Gleam — S12",
      model: "Anastasia Morozova",
      type: "right",
    },
  ];

  const handleClick = (index) => {
    if (clickedItem === index) return;

    setClickedItem(index);
    const newDivs = [];

    for (let i = 0; i < 6; i++) {
      newDivs.push({ id: i, offsetX: i * 2, offsetY: i * 0.2 });
    }

    setGeneratedDivs(newDivs);
  };

  useEffect(() => {
    if (clickedItem !== null) {
      const total = generatedDivs.length;

      generatedDivs.forEach((div, i) => {
        const wrapper = wrappersRef.current[`${clickedItem}-${i}`];
        if (!wrapper) return;

        // Set class for secondary animation selector
        wrapper.classList.add(`generated-div-${clickedItem}`);

        const holder = wrapper.querySelector(".holder");
        const img = wrapper.querySelector(".inner-img");

        // 1️⃣ Reveal animation
        const tl = gsap.timeline();
        tl.fromTo(
          holder,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.5, ease: "power2.out" }
        ).fromTo(
          img,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.5, ease: "power2.out" },
          "<"
        );
      });

      // 2️⃣ Opacity + scale + collapse animation
      const targets = gsap.utils.toArray(`.generated-div-${clickedItem}`);

      gsap.fromTo(
        targets,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: (i) => 1 + i * 0.1,
          stagger: 0.1,
          duration: 0.1,
          ease: "power2.out",
          onUpdate: function () {
            const progress = this.progress();
            if (progress > 0.05) {
              gsap.to(targets.slice(0, total - 1), {
                opacity: 0,
                duration: 0.1,
                stagger: 0.1,
                ease: "power2.inOut",
              });
            }
          },
          onComplete: () => {
            // gsap.to(targets, { opacity: 0});
          },
        }
      );
    }
  }, [clickedItem, generatedDivs]);

  return (
    <main className="w-full h-screen p-10 bg-gray-100">
      <div className="flex gap-5">
        {imageData.map((item, index) => (
          <div
            key={item.src}
            className="relative z-[1] cursor-pointer"
            onClick={() => handleClick(index)}
          >
            <img src={item.src} className="h-[12.5rem]" />
            <h3 className="text-end text-[13px] font-bold">{item.title}</h3>

            {clickedItem === index &&
              generatedDivs.map((div, i) => (
                <div
                  key={div.id}
                  ref={(el) => (wrappersRef.current[`${index}-${i}`] = el)}
                  className={`absolute top-0 left-0 w-[10rem] h-[12.5rem] z-[2] overflow-hidden`}
                  style={{
                    top: `${div.offsetY}rem`,
                    left:
                      item.type === "left"
                        ? `${div.offsetX}rem`
                        : `-${div.offsetX}rem`,
                  }}
                >
                  <div className="holder w-full h-full">
                    <div
                      className="inner-img w-full h-full"
                      style={{
                        backgroundImage: `url(${item.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </main>
  );
}

export default newApp;
