import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/apiService";

const CompaniesAdminList = () => {
  const [ar, setAr] = useState([]);
  useEffect(() => {
    doApi();
  }, []);
  const doApi = async () => {
    const url = API_URL + "/companies";
    try {
      const data = await doApiGet(url);
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2>List of Companies</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Company ID</th>
            <th>Del/Edit</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.company_id}</td>
                <td>
                  <button className="bg-danger">X</button>
                  <button className="bg-dark ms-2 text-light">Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesAdminList;
