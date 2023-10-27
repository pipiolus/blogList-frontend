import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blog from "./components/blog";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/addBlogForm";
import "./style.css";

function App() {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getBlogs();
      setBlogs(initialBlogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem("loggedBlogApp");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogApp");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h1>LogIn to App</h1>
        <LoginForm setUser={setUser} />
      </div>
    );
  }

  return (
    <>
      <h1 className="title">BlogList App</h1>
      <div className="logged-user">
        <p>Logged as user: &quot;{user.username}&quot; </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="blogs-container">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      <BlogForm blogs={blogs} setBlogs={setBlogs} />
    </>
  );
}

export default App;
