import { useState } from "react";
export default function Effect({
  initialText = "one",
  finalText = initialText,
  durationOnInitial = 52,
  durationOnFinal = 26,
  heading,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonText, setButtonText] = useState(heading ?? initialText);
  const letters = "~#$&*()?\\}+><^{";
  let duration;
  function animateText(targetText) {
    let iterations = 0;
    const originalText = buttonText;
    const interval = setInterval(() => {
      if (iterations >= targetText.length) {
        clearInterval(interval);
        setButtonText(targetText);
      } else {
        setButtonText(() =>
          originalText
            .split("")
            .map((_, index) =>
              index < iterations
                ? targetText[index]
                : letters[Math.floor(Math.random() * letters.length)]
            )
            .join("")
        );
      }
      iterations++;
    }, duration);
  }
  return (
    <label
      className={`max-w-[10rem] font-semibold text-inherit`}
      onMouseEnter={() => {
        if (!isClicked) {
          duration = durationOnInitial;
          animateText(initialText, duration);
        }
      }}
      onMouseLeave={() => {
        if (!isClicked) {
          duration = durationOnFinal;
          animateText(finalText, duration);
        }
      }}
      onClick={(e) => {
        setIsClicked(true);
        e.currentTarget.children[1].style.text = "#2ea359";
      }}
    >
      <span className="tracking-wider">{buttonText}</span>
    </label>
  );
}
