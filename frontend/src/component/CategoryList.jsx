import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function CategoryList() {

  const [categories, setCategories] = useState([]);

  const deleteCategories=async(id)=>{
    if(window.confirm("Please assign product to different Category before Deleting?\n press OK if anyway you want to delete")){
      await axios.put(`http://localhost:8080/api/categories/deactivate/${id}`)
      getCategories();
    }
    
  }

  const getCategories=async()=>{
    try{
        const res= await axios.get(`http://localhost:8080/api/categories`);
        console.log(res.data?.updatedAt);
        console.log(res.data?.createdAt);
        
        setCategories(res.data)
        }
        catch(error){
            console.log("error")
        } 
}

  useEffect(()=>{
    getCategories();
  },[])

  return (
    <>
    <div className="container mt-4 d-flex justify-content-end">
      <Link to='/add-category' className='btn btn-warning'>Add Category</Link>
    </div>
    <div className="container text-center mb-3 mt-1" >
      <h2 style={{textDecoration:'underline'}}>Category List</h2>
    </div>
           <div className="fluid-container">
        <table class="table text-center">
  <thead>
    <tr>
      <th scope="col">Category ID</th>
      <th scope="col">Category Name</th>
      <th scope="col">Discription</th>
      <th scope="col">Created Date</th>
      <th scope="col">Updated Date</th>
      <th scope="col" colSpan={2}>Action</th>
    </tr>
  </thead>
  <tbody>
    {
      categories.length===0?(
      <tr>
        <td colSpan={6} className='align-center'>No Data Found</td>
      </tr>) :(
        categories.map(
            category=>
                <tr key={category.categoryId}>
                    <td>{category.categoryId}</td>
                    <td>{category.categoryName}</td>
                    <td>{category.description}</td>
                    <td>{new Date(category.createdAt).toLocaleDateString()},{new Date(category.createdAt).toLocaleTimeString()}</td>
                    {/* <td>{new Date(category.updatedAt).toLocaleDateString()},{new Date(category?.updatedAt).toLocaleTimeString()}</td> */}
                    <td>{category.updatedAt?<span>{new Date(category.updatedAt).toLocaleDateString()},{new Date(category.updatedAt).toLocaleTimeString()}</span>:category.updatedAt}</td>
                    <td>
                      <Link to={`/edit-category/${category.categoryId}`} className='btn btn-info'> Update</Link>
                      <button style={{marginLeft:'1rem'}} onClick={()=>deleteCategories(category.categoryId)} className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
        ))
    }
    
  </tbody>
</table>
</div>
    </>
  )
}

export default CategoryList