import React from "react";
import giphy from "../../assets/images/mastGify.png";
import giphy1 from "../../assets/images/giphy.gif";

const Navbar = ({
  searchValue,
  handleClick,
  handleInputChange,
  suggestion,
  getRandomGif,
}) => {
  return (
    <>
      <nav className="header">
        <div className="brand">
          <a href="/">
            <img src={giphy} alt="giphyJam" />
            <span>GJ</span>
          </a>
        </div>
        <div className="search">
          <input
            onKeyDown={(e) => {
              if (e.code === "Enter" || e.keyCode === 13) {
                console.log("chlaaa");
                handleClick(e);
              }
            }}
            value={searchValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Search all the GIFs here"
          />
          <button onClick={handleClick}>
            <i className="fa-2x fa fa-search " aria-hidden="true"></i>
          </button>
          {searchValue && suggestion.isVisible ? (
            <div className="suggestionContainer">
              {suggestion.list.length ? (
                suggestion.list
              ) : (
                <div className="no-result">No Result Found!</div>
              )}
            </div>
          ) : null}
        </div>

        <span data-text="Wanna see magic?" className="tooltip">
          <img
            onClick={getRandomGif}
            className="random-gif"
            src={giphy1}
            alt="magic"
          />
        </span>
      </nav>
    </>
  );
};

export default Navbar;
