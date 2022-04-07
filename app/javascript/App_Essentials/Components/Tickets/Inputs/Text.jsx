import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'

function Text({field, changeHandler, value, ...rest}) {
	const [pattern, setPattern]= useState('')
	const [formText, setFormText]= useState('')
	useEffect(() => {
		switch(field?.type.split('_')[1]){
			case 'text':{
				setPattern('[a-z|A-z|0-9|\\s]{0,}')
				setFormText('Only Alphanumeric characters are allowed')
				break
			}
			case 'number':{
				setPattern('[0-9]+')
				setFormText('Only Integer Number characters are allowed')
				break
			}
			case 'decimal':{
				setPattern('\\d+(\\.)+(\\d{1,})+$')
				setFormText('Only Decimal Number characters are allowed')
				break
			}
			case 'date':{
				setPattern('\\d{1,2}\/\\d{1,2}\/\\d{4}')
				setFormText('Only dd/mm/yyyy are allowed')
			}
		}
	},[field])
	return (
		<div className="form-floating mb-3">
			<input
				data-name={field?.name}
				value={value}
				onChange={changeHandler}
				type='date'
				id={`${field?.name}${field?.id}`}
				placeholder={`${field?.label}`}
				pattern={`${pattern}`}
				className="form-control" 
				{...rest}
			/>
			<label className="text-capitalize" htmlFor={`${field?.name}${field?.id}`}>{field?.label}</label>
			<div className="form-text">{formText}</div>
		</div>
	)
}

Text.propTypes = {}

export default Text
//			{
//					"id": 84000463081,
//					"name": "requester",
//					"label": "Search a requester",
//					"description": "Ticket requester",
//					"position": 7,
//					"required_for_closure": false,
//					"required_for_agents": true,
//					"type": "default_requester",
//					"default": true,
//					"customers_can_edit": true,
//					"label_for_customers": "Requester",
//					"required_for_customers": true,
//					"displayed_to_customers": true,
//					"created_at": "2022-03-29T09:49:24Z",
//					"updated_at": "2022-04-02T05:56:22Z",
//					"portal_cc": false,
//					"portal_cc_to": "company"
//			}
//==========================================================================================
{/* <div className="form-floating mb-3">
<input type="number" className="form-control" id="floatingInput" placeholder="name@example.com" pattern="[0-9]+"/>
<label for="floatingInput">Number</label>
</div> */}
//			{
//					"id": 84000471180,
//					"name": "cf_contact",
//					"label": "contact",
//					"description": null,
//					"position": 5,
//					"required_for_closure": false,
//					"required_for_agents": false,
//					"type": "custom_number",
//					"default": false,
//					"customers_can_edit": true,
//					"label_for_customers": "contact",
//					"required_for_customers": false,
//					"displayed_to_customers": true,
//					"created_at": "2022-04-02T05:58:29Z",
//					"updated_at": "2022-04-02T05:58:29Z"
//			},

//			{
//					"id": 84000471181,
//					"name": "cf_price",
//					"label": "price",
//					"description": null,
//					"position": 6,
//					"required_for_closure": false,
//					"required_for_agents": false,
//					"type": "custom_decimal",
//					"default": false,
//					"customers_can_edit": true,
//					"label_for_customers": "price",
//					"required_for_customers": false,
//					"displayed_to_customers": true,
//					"created_at": "2022-04-02T05:58:38Z",
//					"updated_at": "2022-04-02T05:58:46Z"
//			}