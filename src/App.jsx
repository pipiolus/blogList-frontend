import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blog from "./components/blog";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/addBlogForm";
import SuccessMessage from "./components/SuccessMsg";
import "./style.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

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

  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    }
  }, [successMsg]);

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
      <SuccessMessage message={successMsg} />
      <div className="logged-user">
        <p>Logged as user: &quot;{user.username}&quot; </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="blogs-container">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        setSuccessMsg={setSuccessMsg}
      />
    </>
  );
}

export default App;
