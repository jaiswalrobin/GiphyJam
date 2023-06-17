import axios from "axios";
export const getTrendingGifs = async () => {
  const result = await axios.get(
    `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=25&rating=g`
  );
  return result.data.data;
};

export const fetchSearchQuery = async (query) => {
  const response = await axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${query}&limit=15&offset=0&rating=g&lang=en`
  );
  return response?.data.data;
};
