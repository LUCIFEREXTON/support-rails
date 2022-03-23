import FullArticle from "./FullArticle";
import React from 'react'
import SearchedArticles from "./SearchedArticles";
import { Routes, Route } from "react-router-dom";
import AllCategorries from "./AllCategorries";

const Main = ()=>{
  return (
    <div className="main">
      <Routes>
        <Route path="article" element={<FullArticle/>}/>
        <Route path="search" element={<SearchedArticles/>}/>
        <Route path="/" element={<AllCategorries/>}/>
      </Routes>
    </div>
  )
}

export default Main
