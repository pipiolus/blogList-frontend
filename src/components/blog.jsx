const Blog = ({ blog }) => {
  return (
    <div className="blog-container">
      <h3>Title: &quot;{blog.title}&quot;</h3>
      <h4>Author: {blog.author}</h4>
      <a href={blog.url}>{blog.url}</a>
      <h4>Likes: {blog.likes}</h4>
    </div>
  );
};

export default Blog;
