import axios from "axios";
import Folder from "./Folder"
import { useState, useEffect } from "react";
import React from 'react'
const Category = ({ id, name })=>{
  const [folderList, setFolderList] = useState([]);
  useEffect(() => {
    if(id) {
      (async () => {
          try {
            const res = await axios.get(`/solutions/categories/${id}/folders`)
            setFolderList([...res.data])
          } catch (error) {
            console.log(error)
          }
      })()
    }
  },[id])
  return(
    <div className="category">
      <div className="cattitle">{name}</div>
        {
          folderList.map(folder => (
            <Folder
              key={folder.id}
              id={folder.id}
              name={folder.name}
            /> 
          ))
        }
    </div>
  )
}

export default Category
