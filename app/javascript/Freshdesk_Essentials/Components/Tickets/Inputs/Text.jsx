import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

function Text({field, changeHandler, value, required, ...rest}) {
	const [pattern, setPattern]= useState('')
	const [formText, setFormText]= useState('')
	useEffect(() => {
		switch(field?.type){
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
				setPattern('\\d{1,2}/\\d{1,2}/\\d{4}')
				setFormText('Only dd/mm/yyyy are allowed')
				break
			}
			default: {
				break
			}
		}
	},[field])

	return (
		<div className="form-floating mb-3">
			<input
				data-name={field?.name}
				value={value}
				onKeyPress={changeHandler}
				onChange={changeHandler}
				type={field.input_type}
				id={`${field?.name}${field?.id}`}
				placeholder={`${field?.label_for_customers}`}
				pattern={`${pattern}`}
				className="form-control"
				required={required}
				{...rest}
			/>
			<label className="text-capitalize" htmlFor={`${field?.name}${field?.id}`}>{field?.label_for_customers}</label>
			<div className="form-text">{formText}</div>
		</div>
	)
}

Text.propTypes = {
	field: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,		
    description: PropTypes.string,
    position: PropTypes.number,
    required_for_closure: PropTypes.bool,
    required_for_agents: PropTypes.bool,
    type: PropTypes.oneOf(['text', 'date', 'number', 'decimal']).isRequired,
    input_type: PropTypes.oneOf(['text', 'date']).isRequired,
    default: PropTypes.bool,
    customers_can_edit: PropTypes.bool,
    label_for_customers: PropTypes.string.isRequired,
    required_for_customers: PropTypes.bool,
    displayed_to_customers: PropTypes.bool,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired
}

export default Text
// {
// 	"id": 84000463082,
// 	"name": "subject",
// 	"label": "Subject",
// 	"description": "Ticket subject",
// 	"position": 9,
// 	"required_for_closure": false,
// 	"required_for_agents": true,
// 	"type": "default_subject",
// 	"default": true,
// 	"customers_can_edit": true,
// 	"label_for_customers": "Subject",
// 	"required_for_customers": true,
// 	"displayed_to_customers": true,
// 	"created_at": "2022-03-29T09:49:24Z",
// 	"updated_at": "2022-03-29T09:49:24Z"
// }
// {
// 	"id": 84000471179,
// 	"name": "cf_issue_date",
// 	"label": "issue_date",
// 	"description": null,
// 	"position": 4,
// 	"required_for_closure": false,
// 	"required_for_agents": false,
// 	"type": "custom_date",
// 	"default": false,
// 	"customers_can_edit": true,
// 	"label_for_customers": "issue_date",
// 	"required_for_customers": false,
// 	"displayed_to_customers": true,
// 	"created_at": "2022-04-02T05:58:11Z",
// 	"updated_at": "2022-04-02T05:58:11Z"
// }
//{
//		"id": 84000471180,
//		"name": "cf_contact",
//		"label": "contact",
//		"description": null,
//		"position": 5,
//		"required_for_closure": false,
//		"required_for_agents": false,
//		"type": "custom_number",
//		"default": false,
//		"customers_can_edit": true,
//		"label_for_customers": "contact",
//		"required_for_customers": false,
//		"displayed_to_customers": true,
//		"created_at": "2022-04-02T05:58:29Z",
//		"updated_at": "2022-04-02T05:58:29Z"
//},

//{
//		"id": 84000471181,
//		"name": "cf_price",
//		"label": "price",
//		"description": null,
//		"position": 6,
//		"required_for_closure": false,
//		"required_for_agents": false,
//		"type": "custom_decimal",
//		"default": false,
//		"customers_can_edit": true,
//		"label_for_customers": "price",
//		"required_for_customers": false,
//		"displayed_to_customers": true,
//		"created_at": "2022-04-02T05:58:38Z",
//		"updated_at": "2022-04-02T05:58:46Z"
//}