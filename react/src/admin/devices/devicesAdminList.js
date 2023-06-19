import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import PagesBtns from "../../components/general/pagesBtns";

const DevicesAdminList = () => {
  const nav = useNavigate();
  const [ar, setAr] = useState([]);
  const [query] = useSearchParams();

  useEffect(() => {
    doApi();
  }, [query]);

  const doApi = async () => {
    const page = query.get("page") || 1;
    const url = API_URL + "/devices?page=" + page;
    try {
      const data = await doApiGet(url);
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onDelClick = async (_delid) => {
    if (window.confirm("Delete device?")) {
      try {
        const url = API_URL + "/devices/" + _delid;
        const data = await doApiMethod(url, "DELETE");
        if (data.deletedCount) {
          doApi();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container">
      <h2>List of Devices</h2>
      <Link className="btn btn-dark my-3" to="/admin/devices/add">
        Add new device
      </Link>
      <div>
        <PagesBtns
          linkTo={"/admin/devices?page="}
          cssClass="btn btn-dark ms-2"
          apiUrl={API_URL + "/devices/count"}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Company ID</th>
            <th>Battery score</th>
            <th>Camera score</th>
            <th>Price</th>
            <th>Date</th>
            <th>Del/Edit</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            const page = query.get("page") || 1;
            return (
              <tr key={item.id}>
                <td>{(page - 1) * 10 + i + 1}</td>
                <td>{item.name}</td>
                <td>{item.company_id}</td>
                <td>{item.battery_score}</td>
                <td>{item.camera_score}</td>
                <td>{item.price}</td>
                <td>{item.date_created.substring(0, 10)}</td>
                <td>
                  <button
                    onClick={() => {
                      onDelClick(item._id);
                    }}
                    className="bg-danger"
                  >
                    X
                  </button>
                  <button
                    onClick={() => {
                      nav("/admin/devices/edit/" + item._id);
                    }}
                    className="bg-dark ms-2 text-light"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default DevicesAdminList;
