import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL, TOKEN_KEY, doApiGet } from "../../services/apiService";
import AuthAdminComp from "../authAdminComp";

const UsersAdminList = () => {
  const [ar, setAr] = useState([]);
  useEffect(() => {
    doApi();
  }, []);
  const doApi = async () => {
    const url = API_URL + "/users/usersList";
    try {
      const data = await doApiGet(url);
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>List of users in the system</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>role</th>
            <th>del</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button>Del</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdminList;
