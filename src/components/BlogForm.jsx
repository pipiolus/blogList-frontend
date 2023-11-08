import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="blog-form-container">
      <h3>Add a new blog</h3>
      <form className="blog-form" onSubmit={addBlog}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          required
        />
        <label htmlFor="url">URL</label>
        <input
          id="url"
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
