import React from "react";

const Container = ({ data, searchKey, loader, msg }) => {
  // console.log(props);
  return (
    <>
      {data.length > 0 ? (
        <div className="container">
          {searchKey ? <p>Results for "{searchKey}"</p> : <p>{msg}</p>}

          <div className={`gifsContainer ${data.length === 1 ? "center" : ""}`}>
            {data}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", margin: "50px" }}>{msg}</p>
      )}
      {loader ? (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Container;
