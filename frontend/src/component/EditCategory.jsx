import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditProduct() {

  const [formData, setformdata] = useState({
    categoryName: "",
    description: "",
  });

  const {id}=useParams();

  const navigate = useNavigate();

  const getCategoryDetail=async()=>{
    const res=await axios.get(`http://localhost:8080/api/categories/categoryById/${id}`)
    setformdata({
      categoryName:res.data.categoryName,
      description:res.data.description
    }
    )
  }

  useEffect(()=>{
    getCategoryDetail();
  },[])

  const handleChange = (event) => {
    setformdata({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/categories/${id}`,
        formData
      );
      if (res.status === 202) {
        navigate('/')
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

export default EditProduct