import { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem(
        "loggedBlogApp",
        JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      username:
      <input
        className="login-input"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        required
      />
      password:
      <input
        className="login-input"
        type="password"
        name="Password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        required
      />
      <button className="login-btn" type="submit">
        LogIn
      </button>
    </form>
  );
};

export default LoginForm;
