const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
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
