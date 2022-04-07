import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'

function Date({field, changeHandler, value, ...rest}) {

	return (
		<div className="form-floating mb-3">
			<input
				data-name={field?.name} 
				value={value}
				onChange={changeHandler}
				type='date'
				id={`${field?.name}${field?.id}`} 
				placeholder={`${field?.label}`}
				className="form-control" 
				{...rest}
			/>
			<label className="text-capitalize" htmlFor={`${field?.name}${field?.id}`}>{field?.label}</label>
		</div>
	)
}

Date.propTypes = {}

export default Date
//			{
//					"id": 84000471179,
//					"name": "cf_issue_date",
//					"label": "issue_date",
//					"description": null,
//					"position": 4,
//					"required_for_closure": false,
//					"required_for_agents": false,
//					"type": "custom_date",
//					"default": false,
//					"customers_can_edit": true,
//					"label_for_customers": "issue_date",
//					"required_for_customers": false,
//					"displayed_to_customers": true,
//					"created_at": "2022-04-02T05:58:11Z",
//					"updated_at": "2022-04-02T05:58:11Z"
//			}
