import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddCategory() {
  const [formData, setformdata] = useState({
    categoryName: "",
    description: "",
  });

  const handleChange = (event) => {
    setformdata({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/categories`,
        formData
      );
      if (res.status === 201) {
        toast.success("Category added successfully successfully", {
          autoClose: 2000,
        });
        setformdata({
          categoryName: "",
          description: "",
        });
      } else if (res.status === 208) {
        toast.error(res.data);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
     <div className="form">
        <div className="in-form">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Category name
              </label>
              <input
                type="text"
                name="categoryName"
                placeholder="Category name ..."
                onChange={handleChange}
                value={formData.categoryName}
                className="form-control"
                id="name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Description ..."
                onChange={handleChange}
                value={formData.description}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container text-center">
        <Link to="/" className="btn btn-info">
          Back
        </Link>
      </div>
    </>
  )
}

export default AddCategory