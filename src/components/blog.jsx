import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  return (
    <div className="blog-container">
      <h3>{blog.title}</h3>
      <Togglable buttonLabel="view" closeButtonLabel="hide">
        <h4>By {blog.author}</h4>
        <a href={blog.url}>{blog.url}</a>
        <div className="likes">
          <h4>Likes: {blog.likes}</h4>
          <button>👍</button>
        </div>
        <p>created by {blog.user.username}</p>
      </Togglable>
    </div>
  );
};

export default Blog;
