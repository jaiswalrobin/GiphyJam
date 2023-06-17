import React, { useState } from "react";
import { getRandomColor } from "../../utils/utils";

const Gif = ({ id, title, gif }) => {
  const [isGifLoading, setIsGIfLoading] = useState(true);
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(gif.images.preview_webp.url);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };
  console.log("isGifLoading", isGifLoading);
  return (
    <div key={id} className="gifContainer">
      <>
        {isGifLoading ? (
          <div
            className="gif-shimmer"
            style={{
              background: ` radial-gradient(circle at center,  ${getRandomColor()} 0%,  ${getRandomColor()} 20%, ${getRandomColor()}  40%, #f6f7f8 100%) 100% 100% / 200% 200%`,
            }}
          ></div>
        ) : null}
        <img
          src={gif.images.original.url}
          alt={title}
          onLoad={() => {
            setIsGIfLoading(false);
          }}
          style={{ display: isGifLoading ? "none" : "block" }}
        />
        <span className={`copy-link ${copy ? "show" : ""}`}>Link Copied!</span>
      </>

      {isGifLoading ? null : (
        <i onClick={handleCopy} className="fa fa-2x fa-link share"></i>
      )}
    </div>
  );
};

export default Gif;
