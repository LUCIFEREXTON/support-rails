import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from "draft-js";

function TextArea({field, changeHandler, value, required, ...rest}) {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
	useEffect(() => {
		if(value!==draftToHtml(convertToRaw(editorState.getCurrentContent()))){
			changeHandler(draftToHtml(convertToRaw(editorState.getCurrentContent())), field.name)
		}
	}, [editorState])
	return (
		<div className="form-floating mb-3">
			<Editor
				data-name={field?.name}
				className="form-control"
				placeholder={`${field?.label_for_customers}`}
				required={required}
				editorState={editorState}
				onEditorStateChange={setEditorState}
				{...rest}
			/>
		</div>
		// 	<textarea className="form-control" name={name} placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}}></textarea>
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