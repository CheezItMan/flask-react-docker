import React from "react";
import { render, cleanup } from "@testing-library/react";

import UsersList from "./UsersList";

afterEach(cleanup);

const users = [
  {
    email: "bob@bob.com",
    id: 1,
    username: "Bob",
  },
  {
    email: "charles@ada.com",
    id: 2,
    username: "charlie",
  },
];

it("renders a username", () => {
  const { getByText } = render(<UsersList users={users} />);
  expect(getByText("Bob")).toHaveClass("username");
  expect(getByText("charlie")).toHaveClass("username");
});
