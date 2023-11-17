import Togglable from "./Togglable";

const Blog = ({ blog, user, addLike, removeBlog }) => {
  return (
    <div className="blog-container">
      <h3>{blog.title}</h3>
      <h4>By {blog.author}</h4>
      <Togglable buttonLabel="view" closeButtonLabel="hide">
        <a className="blog-url" href={blog.url}>
          {blog.url}
        </a>
        <div className="likes">
          <h4>Likes: {blog.likes}</h4>
          <button onClick={addLike}>👍</button>
        </div>
        <div className="created-by">
          <p>created by {blog.user.username}</p>
          {blog.user.username !== user.username ? null : (
            <button onClick={removeBlog}>delete</button>
          )}
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;