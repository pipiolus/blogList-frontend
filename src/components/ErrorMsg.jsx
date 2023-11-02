const ErrorMessage = ({ message }) => {
  if (message === null) return null;

  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
