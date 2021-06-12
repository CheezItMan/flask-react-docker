import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddUser from "./AddUser";

afterEach(cleanup);

const setup = () => {
  const submitMock = jest.fn();
  const utils = render(<AddUser handleSubmit={submitMock} />);

  return { ...utils, submitMock };
};

it("renders with default props", () => {
  // Arrange
  const { getByLabelText, getByText } = setup();

  // Assert things have rendered with given props
  const usernameInput = getByLabelText("Username");
  expect(usernameInput).toHaveAttribute("type", "text");
  expect(usernameInput).toHaveAttribute("required");
  expect(usernameInput).not.toHaveAttribute();

  const emailInput = getByLabelText("Email");
  expect(emailInput).toHaveAttribute("type", "email");
  expect(emailInput).toHaveAttribute("required");
  expect(emailInput).not.toHaveValue();

  const buttonInput = getByText("Submit");
  expect(buttonInput).toHaveValue("Submit");
});

it("Will respond to text input", () => {
  // Arrange
  const { getByLabelText } = setup();

  ["Username", "Email"].forEach((inputFieldText) => {
    const inputField = getByLabelText(inputFieldText);

    // Act
    userEvent.type(inputField, "a");

    // Assert
    expect(inputField.value).toBe("a");
  });
});

it("will call the callback function on submitting", () => {
  // Arrange
  const { getByText, submitMock } = setup();
  const submitButton = getByText("Submit");

  // Act
  fireEvent.click(submitButton);

  // Assert
  expect(submitMock).toHaveBeenCalled();
});

it("renders", () => {
  // Arrange
  const { asFragment } = setup();

  // Assert
  expect(asFragment()).toMatchSnapshot();
});
