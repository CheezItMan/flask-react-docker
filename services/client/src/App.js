import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import UsersList from "./components/UsersList.js";
import AddUser from "./components/AddUser";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_SERVICE_URL}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addUser = (user) => {
    const data = {
      username: user.username,
      email: user.email,
    };

    console.log("Making a request");
    console.log(`${process.env.REACT_APP_API_SERVICE_URL}/users`, data);
    axios
      .post(`${process.env.REACT_APP_API_SERVICE_URL}/users`, data)
      .then((res) => {
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <br />
            <h1 className="title is-1 is-1">Users</h1>
            <hr />
            <br />
            <AddUser handleSubmit={addUser} />
            <br />
            <br />
            <UsersList users={users} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
