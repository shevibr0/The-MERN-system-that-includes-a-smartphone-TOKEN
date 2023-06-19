import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../services/apiService";

export default function HeaderAdmin() {
  const nav = useNavigate();
  return (
    <header className="container-fluid bg-light p-2 shadow">
      <div className="container">
        <div className="row align-items-center">
          <div className="logo col-auto">
            <h2>Admin</h2>
          </div>
          <div className="row col d-flex justify-content-between align-items-center">
            <div className="col-auto">
              {localStorage[TOKEN_KEY] ? (
                <ul>
                  <li>
                    <Link to="/admin/users">Users</Link>
                  </li>
                  <li>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/devices">Devices</Link>
                  </li>
                </ul>
              ) : (
                <li>
                  <Link to="/">Home Page</Link>
                </li>
              )}
            </div>
            <div className="col-auto">
              {!localStorage[TOKEN_KEY] ? (
                <ul>
                  <li>
                    <Link to="/admin/">Login</Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem(TOKEN_KEY);
                        nav("/admin");
                      }}
                      className="btn btn-danger"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
