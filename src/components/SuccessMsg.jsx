const SuccessMessage = ({ message }) => {
  if (message === null) return null;
  return (
    <div className="success">
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;
