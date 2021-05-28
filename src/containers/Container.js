import React from "react"

const Container = (props) => {
  // console.log(props);
  return props.loader ? (
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <>
      {props.data.length > 0 ? (
        <div className="container">
          {props.searchKey ? (
            <p>Results for "{props.searchKey}"</p>
          ) : (
            <p>{props.msg}</p>
          )}

          <div className="gifsContainer">{props.data}</div>
        </div>
      ) : (
        <p style={{ textAlign: "center", margin: "50px" }}>{props.msg}</p>
      )}
    </>
  )
}

export default Container
