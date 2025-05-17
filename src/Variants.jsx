import Effect from "./Effect";

function Variants({
  clicked,
  firstGrid,
  secondGrid,
  firstGridNames,
  secondGridNames,
  handleClick,
  text = "",
  heading,
  effectText,
}) {
  return (
    <>
      {/* heading 3 */}
      {!clicked ? (
        <div className="grid mb-[1rem] mt-[5rem] grid-flow-col justify-items-stretch items-baseline justify-between">
          <h2 className=" text-[3rem] uppercase font-semibold tracking-[-3px] scale-y-150 ">
            <Effect
              initialText={effectText}
              finalText={heading}
              durationOnInitial={45}
              durationOnFinal={45}
              heading={heading}
            />
          </h2>
          <span className="text-[13px] font-bold mr-[1rem]">
            <Effect
              finalText={text}
              initialText={"INJOY 0" + text.charAt(text.length - 1)}
              durationOnInitial={40}
              durationOnFinal={40}
            />
          </span>
        </div>
      ) : (
        ""
      )}

      {/* grid 3*/}
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
    </>
  );
}

export default Variants;
