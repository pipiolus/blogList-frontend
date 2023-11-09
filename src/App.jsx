import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Blog from "./components/blog";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import SuccessMessage from "./components/SuccessMsg";
import ErrorMessage from "./components/ErrorMsg";
import "./style.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getBlogs();
      setBlogs(initialBlogs);
    };
    fetchBlogs();
  }, []);
  if (blogs.length !== 0) {
    console.log(blogs);
  }

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
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    }
  }, [successMsg, errorMsg]);

  const blogFormRef = useRef();

  const addBlog = async ({ title, author, url }) => {
    try {
      const blogObject = {
        title,
        author,
        url,
        user: user.name,
      };
      const newBlog = await blogService.createBlog(blogObject);
      setBlogs(blogs.concat(newBlog));
      setSuccessMsg("The new blog has been successfully added");
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      setErrorMsg(
        "Error: Unable to create blog, try login session again",
        error
      );
    }
  };

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
    <div className="content">
      <h1 className="title">BlogList App</h1>
      <ErrorMessage message={errorMsg} />
      <SuccessMessage message={successMsg} />
      <div className="logged-user">
        <p>Logged as user: &quot;{user.username}&quot; </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable
        buttonLabel="new blog"
        closeButtonLabel="cancel"
        ref={blogFormRef}
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div className="blogs-container">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
