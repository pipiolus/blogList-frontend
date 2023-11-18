import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    console.log(">>>>>>>>>>>>> ADD BLOG");
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
      <form
        className="blog-form"
        onSubmit={addBlog}
        data-testid="New-Blog-Form"
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="How to kill more orcs"
          required
          data-testid="Title-Input"
        />
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Frodo Baggins"
          required
          data-testid="Author-Input"
        />
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="url"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="https://yourblogdomain.com/yourblogpath"
          required
          data-testid="URL-Input"
        />
        <button type="submit" data-testid="Create-Button">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
