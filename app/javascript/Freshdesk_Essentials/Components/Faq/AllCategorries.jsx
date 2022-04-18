import axios from "axios";
import Category from "./Category"
import { useState, useEffect } from "react";
import React from 'react'

const AllCategorries = ()=>{
  const [categoryList, setCategoryList] = useState([])
  useEffect(() => {
    (
      async () => {
        try {
          const res = await axios.get(`/solutions/categories`)
          setCategoryList([...res.data])
        } catch (error) {
          console.log(error)
        }
      }
    )()
  },[])
  return(
    <div>
      <div className="title">Knowledge base</div>
      <div className="content">
        {
          categoryList.map(category => (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
            /> 
          ))
        }
      </div>
    </div>
  )
}
export default AllCategorries
