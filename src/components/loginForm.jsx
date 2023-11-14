import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import ErrorMessage from "./ErrorMsg";
import PropTypes from "prop-types";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    }
  }, [errorMsg]);

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
      setErrorMsg(
        "Wrong credentials: incorrect username or password"
      );
    }
  };

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };

  return (
    <div>
      <ErrorMessage message={errorMsg} />
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
    </div>
  );
};

export default LoginForm;
