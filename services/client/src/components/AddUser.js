import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const AddUser = ({ handleSubmit }) => {
  const [userData, setUserData] = useState({
    username: "justatest",
    email: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("onSubmitting");

    handleSubmit(userData);

    setUserData({
      username: "",
      email: "",
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    console.log("changing");

    const newUserData = {
      ...userData,
    };
    newUserData[event.target.name] = event.target.value;

    setUserData(newUserData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label is-large" htmlFor="input-username">
          Username
        </label>
        <input
          name="username"
          id="input-username"
          className="input is-large"
          type="text"
          placeholder="Enter a username"
          onChange={handleChange}
          value={userData.username}
          required
        />
      </div>
      <div className="field">
        <label className="label is-large" htmlFor="input-email">
          Email
        </label>
        <input
          name="email"
          id="input-email"
          className="input is-large"
          type="email"
          placeholder="Enter an email address"
          onChange={handleChange}
          value={userData.email}
          required
        />
      </div>
      <button
        type="submit"
        className="button is-primary is-large is-fullwidth"
        value="Submit"
      >
        Submit
      </button>
    </form>
  );
};

AddUser.propTypes = {
  handleSubmit: PropTypes.func,
};

export default AddUser;
