import * as React from "react"
import { ImageBackground } from "react-native-web";
import "./Testimonials.css"
const PICS = ["https://i.insider.com/5f5a895be6ff30001d4e82b3?width=1000&format=jpeg&auto=webp",
 "https://legacy.travelnoire.com/wp-content/uploads/2018/06/greece-yellow-e1528928597794.jpg",
  "https://www.essence.com/wp-content/uploads/2019/09/Screen-Shot-2019-09-25-at-3.13.07-PM-1200x799.png"];
const DELAY = 2000;

export default function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === PICS.length - 1 ? 0 : prevIndex + 1
        ),
      DELAY
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {PICS.map((image, index) => (
          <div
            className="slide"
            key={index}
            // style={ImageBackground={"#000000"}}
          > <img src={image} width="700px" height="400"></img></div>
        ))}
      </div>

      <div className="slideshowDots">
        {PICS.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

