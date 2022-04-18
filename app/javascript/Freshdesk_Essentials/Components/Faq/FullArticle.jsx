import parse from 'html-react-parser';
import { formatDate } from '../../helperFunction'
import { useSelector } from 'react-redux'
import React from 'react'
const FullArticle = ()=>{

  const article = useSelector( state => state.article)

  return(
    <div className="full-article">
      <div className="full-article-header">
        <div className="title">{article?.title}</div>
        <div className="date">{`Modified on: ${formatDate(article?.created_at)}`}</div>
      </div>
      <div className="full-article-body">
        {article?.description && parse(article?.description)}
      </div>
    </div>
  )
}
export default FullArticle
