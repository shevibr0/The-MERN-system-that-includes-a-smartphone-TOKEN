import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { useNavigate, useParams } from "react-router";

const EditDeviceForm = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const [select_ar, setSelectAr] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {
      const url = API_URL + "/companies";
      const data = await doApiGet(url);
      setSelectAr(data);
      const urlDevice = API_URL + "/devices/single/" + params["id"];
      const dataDevice = await doApiGet(urlDevice);
      setFormData(dataDevice);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubForm = (_bodyData) => {
    doApiEdit(_bodyData);
  };

  const doApiEdit = async (_bodyData) => {
    try {
      const url = API_URL + "/devices/" + params["id"];
      const data = await doApiMethod(url, "PUT", _bodyData);
      if (data.modifiedCount) {
        alert("device updated");
        nav(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2>Edit Device</h2>
      {select_ar.length > 0 && formData.name ? (
        <form onSubmit={handleSubmit(onSubForm)} className="col-md-6">
          <label>name</label>
          <input
            defaultValue={formData.name}
            {...register("name", { required: true, minLength: 2 })}
            className="form-control"
            type="text"
          />
          {errors.name && <div className="text-danger">* Enter valid name</div>}
          <label>company ID</label>
          <select
            defaultValue={formData.company_id}
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
            defaultValue={formData.battery_score}
            {...register("battery_score", { required: true, min: 1, max: 100 })}
            className="form-control"
            type="number"
          />
          {errors.battery_score && (
            <div className="text-danger">* Enter valid battery score</div>
          )}
          <label>camera_score</label>
          <input
            defaultValue={formData.camera_score}
            {...register("camera_score", { required: true, min: 1, max: 100 })}
            className="form-control"
            type="number"
          />
          {errors.camera_score && (
            <div className="text-danger">* Enter valid camera score</div>
          )}
          <label>price</label>
          <input
            defaultValue={formData.price}
            {...register("price", { required: true, min: 1, max: 9999 })}
            className="form-control"
            type="number"
          />
          {errors.price && (
            <div className="text-danger">* Enter valid price</div>
          )}
          <button className="btn btn-warning mt-3">Update Device</button>
        </form>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default EditDeviceForm;
