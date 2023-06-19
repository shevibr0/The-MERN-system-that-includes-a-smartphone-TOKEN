import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { useNavigate } from "react-router";

const AddDeviceForm = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [select_ar, setSelect_ar] = useState([]);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {
      const url = API_URL + "/companies";
      const data = await doApiGet(url);
      setSelect_ar(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubForm = (_bodyData) => {
    doApiPost(_bodyData);
  };

  const doApiPost = async (_bodyData) => {
    try {
      const url = API_URL + "/devices";
      const data = await doApiMethod(url, "POST", _bodyData);
      if (data._id) {
        alert("device added");
        nav("/admin/devices");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2>Add new Device</h2>
      {select_ar.length > 0 ? (
        <form onSubmit={handleSubmit(onSubForm)} className="col-md-6">
          <label>name</label>
          <input
            {...register("name", { required: true, minLength: 2 })}
            className="form-control"
            type="text"
          />
          {errors.name && <div className="text-danger">* Enter valid name</div>}
          <label>company ID</label>
          <select
            {...register("company_id", { required: true, minLength: 1 })}
            className="form-select"
            type="select"
          >
            {select_ar.map((item) => {
              return (
                <option key={item._id} value={item.company_id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <label>battery score</label>
          <input
            defaultValue={70}
            {...register("battery_score", { required: true, min: 1, max: 100 })}
            className="form-control"
            type="number"
          />
          {errors.battery_score && (
            <div className="text-danger">* Enter valid battery score</div>
          )}
          <label>camera_score</label>
          <input
            defaultValue={70}
            {...register("camera_score", { required: true, min: 1, max: 100 })}
            className="form-control"
            type="number"
          />
          {errors.camera_score && (
            <div className="text-danger">* Enter valid camera score</div>
          )}
          <label>price</label>
          <input
            defaultValue={100}
            {...register("price", { required: true, min: 1, max: 9999 })}
            className="form-control"
            type="number"
          />
          {errors.price && (
            <div className="text-danger">* Enter valid price</div>
          )}
          <button className="btn btn-success">Add Device</button>
        </form>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default AddDeviceForm;
