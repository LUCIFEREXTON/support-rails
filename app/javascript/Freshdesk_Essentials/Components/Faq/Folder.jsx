import axios from "axios";
import Article from "./Article"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from 'react'

const Folder = ({ id, name })=>{
  const [articleList, setArticleList] = useState([]);
  const dispatch = useDispatch()
  const folderList = useSelector( state => state.folderList)

  useEffect(() => {
    if( id ){
      (async () => {
        try {
          const res = await axios.get(`/solutions/folders/${id}/articles`)
          setArticleList([...res.data])
          if(!folderList.includes(id)){
            dispatch({
              type: 'INSERT_CATEGORY', 
              folderId: id
            })

            dispatch({
              type:'UPDATE_ARTICLES',
              articles: [...res.data]
            })
          }
        } catch (error) {
          console.log(error)
        }
      })()
    }
  },[id])
  
  return(
    <div className="folder">
      <div className="foldertitle">
        <div className="title">{name}</div>
        <div className="count">({articleList?.length})</div>
      </div>
      <div className="articles">
        {
          articleList.map(article => (
            <Article
              key={article.id}
              id={article.id}
              article={article}
            /> 
          ))
        }
      </div>
    </div>
  )
}

export default Folder
