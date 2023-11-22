import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("It calls the event handler with right details when creating a blog", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByTestId("Title-Input");
    const authorInput = screen.getByTestId("Author-Input");
    const urlInput = screen.getByTestId("URL-Input");
    const button = screen.getByTestId("Create-Button");

    await user.type(titleInput, "Blog Title");
    await user.type(authorInput, "Blog Author");
    await user.type(urlInput, "https://www.testexample.com/");
    await user.click(button);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("Blog Title");
    expect(createBlog.mock.calls[0][0].author).toBe("Blog Author");
  });
});
