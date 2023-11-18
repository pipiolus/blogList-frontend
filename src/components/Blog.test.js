import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("renders title and author, but not url or likes by default", () => {
    const blog = {
      title: "Just for testing",
      author: "Giova",
      url: "anyurlthatuwant",
      likes: 5,
      user: { username: "Pipiolus" },
    };

    const userCreator = { username: "Pipiolus" };

    const { container } = render(
      <Blog blog={blog} user={userCreator} />
    );

    const title = container.querySelector(".blogTitle");
    const author = container.querySelector(".blogAuthor");
    const urlAndLikes = container.querySelector(".togglableContent");

    expect(title).not.toHaveStyle("display: none");
    expect(author).not.toHaveStyle("display: none");
    expect(urlAndLikes).toHaveStyle("display: none");
  });

  test("URL and likes are shown when details button is pressed", async () => {
    const blog = {
      title: "Just for testing",
      author: "Giova",
      url: "anyurlthatuwant",
      likes: 5,
      user: { username: "Pipiolus" },
    };

    const userCreator = { username: "Pipiolus" };

    const { container } = render(
      <Blog blog={blog} user={userCreator} />
    );
    const user = userEvent.setup();
    const button = screen.getByText("view");

    const urlAndLikes = container.querySelector(".togglableContent");

    await user.click(button);

    expect(urlAndLikes).not.toHaveStyle("display: none");
  });
  test("The event handler is called the same times that 'likes' button is pressed", async () => {
    const blog = {
      title: "Just for testing",
      author: "Giova",
      url: "anyurlthatuwant",
      likes: 5,
      user: { username: "Pipiolus" },
    };
    const userCreator = { username: "Pipiolus" };

    const mockHandler = jest.fn();

    render(
      <Blog blog={blog} user={userCreator} addLike={mockHandler} />
    );

    const user = userEvent.setup();
    const button = screen.getByText("👍");
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
