import React, { useEffect } from "react";
import { API_URL, doApiGet } from "../services/apiService";
import { useNavigate } from "react-router";

const AuthAdminComp = () => {
  const nav = useNavigate();
  useEffect(() => {
    doApi();
  }, []);
  const doApi = async () => {
    try {
      const url = API_URL + "/users/checkToken";
      const data = await doApiGet(url);
      if (data.role != "admin") {
        alert("You must be admin to be here");
        nav("/admin");
      }
    } catch (err) {
        alert("You must be loggin again");
        nav("/admin");
    }
  };
  return <React.Fragment></React.Fragment>;
};

export default AuthAdminComp;
