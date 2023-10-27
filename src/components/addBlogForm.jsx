import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    const newBlog = await blogService.createBlog(blogObject);
    setBlogs(blogs.concat(newBlog));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="blog-form-container">
      <h3>Add a new blog</h3>
      <form className="blog-form" onSubmit={addBlog}>
        title
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
        author
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          required
        />
        url
        <input
          type="url"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          required
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
