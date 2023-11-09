import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

export default { getBlogs, createBlog, setToken };
