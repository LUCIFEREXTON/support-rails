import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from 'react'

const Article = ({ article }) =>{
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();
  const fetchArticle = () => {
    let filterArticle = [...articles].filter(currentArticle => currentArticle.id === article.id);
    dispatch({type: 'STORE_ARTICLE', article: article});
  }
  return(
    <div className="article">
      <div className="liicon"><i className="fa fa-book" aria-hidden="true"></i></div>
      <div className="articletitle" onClick={fetchArticle}><Link to='/faq/article' >{article?.title}</Link></div>
    </div>
  )
}

export default Article
