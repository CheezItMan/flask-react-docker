import React from "react";
import PropTypes from "prop-types";

const UsersList = ({ users }) => {
  return users.map((user) => {
    return (
      <p key={user.id} className="box title is-4 username">
        {user.username}
      </p>
    );
  });
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
    })
  ),
};

export default UsersList;
