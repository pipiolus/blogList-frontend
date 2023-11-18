import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
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

    const form = screen.getByTestId("New-Blog-Form");

    await user.type(titleInput, "Blog Title");
    await user.type(authorInput, "Blog Author");
    await user.type(urlInput, "Blog url");
    await user.click(button);
    console.log(createBlog.mock.calls);

    fireEvent.submit(form);

    expect(createBlog).toHaveBeenCalled();
  });
});
