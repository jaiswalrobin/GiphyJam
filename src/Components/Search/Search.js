// import React, { useState } from "react";
// // import { library } from "@fortawesome/fontawesome-svg-core";
// // import { faSearch } from "@fortawesome/fontawesome-free";
// import axios from "axios";
// const Search = (props) => {
//   const [searchValue, setSearchValue] = useState("");
//   const [gifArr, setGifArr] = useState([]);
//   const handleInputChange = (e) => {
//     setSearchValue(e.target.value);
//   };
//   const handleClick = (e) => {
//     // setSearchValue(e.target.value);
//     // console.log(searchValue);
//     const query = searchValue;
//     axios
//       .get(
//         `https://api.giphy.com/v1/gifs/search?api_key=qmmFL8EYY3q5VxNh57djy8sJ2fCKwKOm&q=${query}&limit=25&offset=0&rating=g&lang=en`
//       )
//       .then((res) => {
//         // console.log(res.data);
//         const gifData = res.data.data;
//         console.log(gifData);
//         const data = gifData.map((gif) => {
//           return (
//             <div className="gifContainer">
//               <img src={gif.images.original.url} alt={gif.title} key={gif.id} />
//             </div>
//           );
//         });
//         setGifArr(data);
//       });
//     console.log(gifArr, "run");
//   };
//   // console.log(searchValue);
//   return (
//     <div className="search">
//       <input
//         value={searchValue}
//         onChange={handleInputChange}
//         type="text"
//         placeholder="Search all the GIFs here"
//       />
//       <button onClick={handleClick}>
//         <i className="fa-2x fa fa-search " aria-hidden="true"></i>
//       </button>
//     </div>
//   );
// };

// export default Search;
