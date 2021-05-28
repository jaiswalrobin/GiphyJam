
const axios = require("axios")


axios
.get(
  `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=25&rating=g`
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