import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { useWindowWidth } from "@react-hook/window-size";

export default function PizzaSkeleton(props) {
  const [windowWidth, setWindowWidth] = useState({ width: 0, height: 0 });
  const width = useWindowWidth();

  useEffect(() => {
    if (width < 749) {
      console.log(width);
      setWindowWidth({
        width: 140,
        height: 285,
      });
    } else {
      setWindowWidth({
        width: 280,
        height: 465,
      });
    }
  }, [width]);

  //w 140 h 285 - mobile
  //w 280 h 465 - pc
  return (
    <ContentLoader
      speed={2}
      width={windowWidth.width}
      height={windowWidth.height}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="134" cy="134" r="125" />
      <rect x="0" y="279" rx="10" ry="10" width="280" height="23" />
      <rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="436" rx="10" ry="10" width="95" height="30" />
      <rect x="125" y="427" rx="24" ry="24" width="152" height="45" />
    </ContentLoader>
  );
}
