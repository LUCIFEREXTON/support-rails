import React from 'react'
import PropTypes from 'prop-types'

function TextArea({name}) {
	return (
		<div className="form-floating mb-3">
			<textarea className="form-control" name={name} placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}}></textarea>
			<label for="floatingTextarea2">{name}</label>
		</div>
	)
}

TextArea.propTypes = {}

export default TextArea

//			{
//					"id": 84000463499,
//					"name": "cf_blog_uri",
//					"label": "blog_uri",
//					"description": null,
//					"position": 1,
//					"required_for_closure": false,
//					"required_for_agents": false,
//					"type": "custom_paragraph",
//					"default": false,
//					"customers_can_edit": true,
//					"label_for_customers": "blog_uri",
//					"required_for_customers": false,
//					"displayed_to_customers": true,
//					"created_at": "2022-03-29T11:53:58Z",
//					"updated_at": "2022-04-02T05:54:53Z"
//			}