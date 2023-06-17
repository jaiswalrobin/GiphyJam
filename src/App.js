import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Components/Layout/Layout";
import Navbar from "./Components/Navbar/Navbar";
import axios from "axios";
import { debounce } from "./utils/utils";
import Container from "./containers/Container";
import Gif from "./Components/Giph/Giph";
import { getTrendingGifs, fetchSearchQuery } from "./services/service";

const App = () => {
  const [msg, setMsg] = useState({
    value: "",
    searchKey: "",
  });

  const [searchValue, setSearchValue] = useState("");

  const [suggestion, setSuggestion] = useState({
    list: [],
    isVisible: false,
  });
  const [gifArr, setGifArr] = useState({
    isLoading: false,
    data: [],
  });

  const getAllTrendingGifs = async () => {
    try {
      setGifArr((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const gifData = await getTrendingGifs();
      const data = gifData.map((gif) => {
        return <Gif id={gif.id} title={gif.title} gif={gif} key={gif.id} />;
      });
      setGifArr({
        isLoading: false,
        data,
      });
      setMsg({
        searchKey: "",
        value:
          data.length > 0
            ? "Some trending GIFs for you ;)"
            : "Nothing is trending ;p",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTrendingGifs();
  }, []);

  const getSearchQuery = async (query) => {
    try {
      const gifData = await fetchSearchQuery(query);
      let data = gifData.filter((gif) => {
        return gif.title.trim().length > 0;
      });
      console.log(data, "data");

      const suggestionsForSearch = data.map((item, index) => {
        return index <= 4 ? (
          <p className="suggestion" key={index}>
            {item.title}
          </p>
        ) : null;
      });

      setSuggestion({
        isVisible: true,
        list: suggestionsForSearch,
      });
    } catch (error) {}
  };
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchQuery = useCallback(debounce(getSearchQuery, 500), []);

  useEffect(() => {
    console.log("searchValue", searchValue);
    if (searchValue.trim().length) fetchQuery(searchValue);
    else if (!searchValue) {
      // getAllTrendingGifs();
      setSuggestion({
        list: [],
        isVisible: false,
      });
    }
  }, [searchValue]);

  const handleClick = () => {
    setSuggestion((prev) => ({
      ...prev,
      list: [],
      isVisible: false,
    }));

    setGifArr((prev) => ({
      ...prev,
      isLoading: true,
    }));
    setMsg({
      value: "",
      searchKey: searchValue,
    });
    const query = searchValue;
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${query}&limit=15&offset=0&rating=g&lang=en`
      )
      .then((res) => {
        // console.log(res.data);
        const gifData = res.data.data;
        // console.log(gifData)
        let data = gifData.map((gif) => {
          return <Gif id={gif.id} title={gif.title} gif={gif} key={gif.id} />;
        });
        setGifArr({
          isLoading: false,
          data,
        });
        if (data.length === 0) {
          setMsg((prev) => ({
            ...prev,
            value: "Nothing found , please try different keyword.",
          }));
        }
      });
  };

  const getRandomGif = () => {
    setSearchValue("");

    setGifArr({
      isLoading: true,
      data: gifArr.data,
    });
    setMsg((prev) => ({
      ...prev,
      value: "Hold On!",
    }));

    axios
      .get(
        `https://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_API_KEY}&tag=&rating=g`
      )
      .then((res) => {
        const gifData = res.data.data;
        let data = [
          <div key={gifData.id} className="gifContainer">
            <img src={gifData.images.original.url} alt={gifData.title} />
          </div>,
        ];

        setGifArr({
          isLoading: false,
          data,
        });
        setTimeout(() => {
          setMsg((prev) => ({
            ...prev,
            value:
              data.length === 0
                ? "No Random GIF for now ;("
                : "Don't like it?, click magic man again!",
          }));
        }, 300);
      });
  };
  return (
    <Layout>
      <Navbar
        handleInputChange={handleInputChange}
        searchValue={searchValue}
        handleClick={handleClick}
        suggestion={suggestion}
        getRandomGif={getRandomGif}
      />
      <Container
        msg={msg.value}
        loader={gifArr.isLoading}
        searchKey={msg.searchKey}
        data={gifArr.data}
      />
    </Layout>
  );
};

export default App;
