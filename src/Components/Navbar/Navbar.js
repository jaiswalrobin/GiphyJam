import React, { useState, useEffect } from "react"
import giphy from "../../assets/images/mastGify.png"
import giphy1 from "../../assets/images/giphy.gif"
// import Search from "../Search/Search";
import axios from "axios"
import Container from "../../containers/Container"

require("dotenv").config()

if (process.env.NODE_ENV === "development") {
  var apiKey = "qmmFL8EYY3q5VxNh57djy8sJ2fCKwKOm"
}

const Navbar = (props) => {
  const [loader, setLoader] = useState(false)

  const [msg, setMsg] = useState("")
  useEffect(() => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${
          apiKey ? apiKey : process.env.REACT_APP_API_KEY
        }&limit=25&rating=g`
      )
      .then((res) => {
        // console.log(res.data);
        const gifData = res.data.data
        // console.log(gifData)
        let data = gifData.map((gif) => {
          return (
            <div key={gif.id} className="gifContainer">
              <img src={gif.images.preview_gif.url} alt={gif.title} />
            </div>
          )
        })
        setGifArr(data)
        if (data.length > 0) {
          setMsg("Some trending GIFs for you ;)")
        } else {
          setMsg("")
        }
        setLoader(false)
        // GiphyArr = data;
      })
  }, [])

  const [searchValue, setSearchValue] = useState("")

  const [suggestion, setSuggestion] = useState([])
  const [gifArr, setGifArr] = useState([])
  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
    setSuggestion([])
    const query = searchValue
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${
          apiKey ? apiKey : process.env.REACT_APP_API_KEY
        }&q=${query}&limit=15&offset=0&rating=g&lang=en`
      )
      .then((res) => {
        // console.log(res.data);
        const gifData = res.data.data
        // console.log(gifData)
        let data = gifData.map((gif) => {
          return gif.title
        })
        // console.log(data, "data")
        // const newRegex = new Regex()
        const suggestionsForSearch = data.map((item, index) => {
          // console.log(/^[a-zA-Z]+$/.test(item), item)
          return searchValue.matchAll(/item/gi) && index <= 4 ? (
            <p className="suggestion" key={index}>
              {item}
            </p>
          ) : null
          // if (searchValue.matchAll(/item/gi) && index <= 4) {
          //   console.log("go")
          //   return (
          //     <p className="suggestion" key={index}>
          //       {item}
          //     </p>
          //   )
          // }
        })
        // console.log(data)
        setSuggestion(suggestionsForSearch)
        // console.log(suggestionsForSearch, "sugg")
      })
  }
  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      setLoader(true)
      setMsg(false)
      const query = searchValue
      axios
        .get(
          `https://api.giphy.com/v1/gifs/search?api_key=${
            apiKey ? apiKey : process.env.REACT_APP_API_KEY
          }&q=${query}&limit=15&offset=0&rating=g&lang=en`
        )
        .then((res) => {
          // console.log(res.data);
          const gifData = res.data.data
          // console.log(gifData)
          let data = gifData.map((gif) => {
            return (
              <div key={gif.id} className="gifContainer">
                <img src={gif.images.preview_gif.url} alt={gif.title} />
              </div>
            )
          })
          setGifArr(data)
          if (data.length === 0) {
            setMsg("Nothing found. Please try with a different keyword")
          }
          setLoader(false)
          // GiphyArr = data;
        })
    }
  }
  const handleClick = (e) => {
    // setSearchValue(e.target.value);
    // console.log(searchValue);
    setLoader(true)
    setMsg(false)
    const query = searchValue
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${
          apiKey ? apiKey : process.env.REACT_APP_API_KEY
        }&q=${query}&limit=15&offset=0&rating=g&lang=en`
      )
      .then((res) => {
        // console.log(res.data);
        const gifData = res.data.data
        // console.log(gifData)
        let data = gifData.map((gif) => {
          return (
            <div key={gif.id} className="gifContainer">
              <img src={gif.images.preview_gif.url} alt={gif.title} />
            </div>
          )
        })
        setGifArr(data)
        if (data.length === 0) {
          setMsg("Nothing found , please try different keyword.")
        }
        setLoader(false)
        // GiphyArr = data;
      })
    // console.log(gifArr, "run");
    // console.log(GiphyArr, "giphy");
  }
  // console.log(searchValue);
  const getRandomGif = (e) => {
    setSearchValue("")
    setLoader(true)
    setMsg("Hold On!")
    const query = searchValue
    axios
      .get(
        `https://api.giphy.com/v1/gifs/random?api_key=${
          apiKey ? apiKey : process.env.REACT_APP_API_KEY
        }&tag=&rating=g`
      )
      .then((res) => {
        // console.log(res.data)
        const gifData = res.data.data
        // console.log(gifData)
        let data = [
          <div key={gifData.id} className="gifContainer">
            <img src={gifData.images.original.url} alt={gifData.title} />
          </div>
        ]

        setGifArr(data)
        setTimeout(() => {
          if (data.length === 0) {
            setMsg("Something went wrong")
          } else {
            setMsg("Didn't liked it?, click magic man again!")
          }
        }, 300)

        setLoader(false)
        // GiphyArr = data;
      })
  }

  return (
    <>
      <nav className="header">
        <div className="brand">
          <a href="/">
            <img src={giphy} alt="giphyJam" />
          </a>
        </div>
        <div className="search">
          <input
            onKeyDown={handleEnterKey}
            value={searchValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Search all the GIFs here"
          />
          <button onClick={handleClick}>
            <i className="fa-2x fa fa-search " aria-hidden="true"></i>
          </button>
          {searchValue ? (
            <div
              className="suggestionContainer"
              style={{
                borderRadius: "10px",
                width: "45%",
                position: "absolute",
                zIndex: 200,
                /* right: 51%; */
                left: "27.5%",
                top: "10%",
                background: "transparent",
                margin: "7px auto",
                padding: 0
              }}
            >
              {suggestion}
            </div>
          ) : null}
        </div>

        <div>About</div>
      </nav>

      <span data-text="Wanna see magic?" className="tooltip">
        <img
          onClick={getRandomGif}
          className="random-gif"
          src={giphy1}
          alt="magic"
        />
      </span>
      <Container
        msg={msg}
        loader={loader}
        searchKey={searchValue}
        data={gifArr}
      />
    </>
  )
}

export default Navbar
