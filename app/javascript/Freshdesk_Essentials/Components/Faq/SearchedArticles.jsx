
import React from 'react'
import Article from "./Article";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from 'react-router-dom'
const SearchedArticles = ()=>{
  const filterArticles = useSelector(state => state.filterArticles);
  const dispatch = useDispatch()
  useEffect(()=>{
    return ()=>{
      console.log('SA unmounted')
      dispatch({type: 'EMPTY_FILTER_ARTICLES'})
    }
  },[])
  return(
    <div>
        {
          filterArticles?.length 
            ? <>
                <div className="title">Related Articles</div>
                <div className="content">
                  {filterArticles.map(article => (
                    <Article
                      key={article.id}
                      article={article}
                    />
                  ))}
                </div>
              </>
          : <div className="search-note">No Articles Found<br/>Please <Link to='/ticket/new'>Create a new Ticket</Link>.</div>
        }
    </div>
  )
}

export default SearchedArticles
