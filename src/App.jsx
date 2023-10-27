import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/blog";
import LoginForm from "./components/loginForm";
import "./style.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getBlogs();
      setBlogs(initialBlogs);
    };

    fetchBlogs();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>LogIn to App</h1>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </div>
    );
  }

  return (
    <>
      <h1>BlogList App</h1>
      <p>Logged as user: &quot;{user.username}&quot;</p>
      <div className="blogs-container">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}

export default App;
