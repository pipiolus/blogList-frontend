import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    author: "Giova",
    title: "Just for testing",
    url: "anyurlthatuwant",
    likes: 5,
  };

  const { container } = render(<Blog blog={blog} />);

  const element = screen.getByText("Giova");
  expect(element).toBeDefined();
});
