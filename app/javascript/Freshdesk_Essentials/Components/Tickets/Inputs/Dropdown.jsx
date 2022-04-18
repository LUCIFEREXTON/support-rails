import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Dropdown = ({optionArray=[], name, label, depth=1, value, changeHandler, required, ...rest})=>{
	const select = useRef(null)

	useEffect(() => {
		select.current.selectedIndex = 0
	},[optionArray])

	return (
		<div className="form-floating mb-3">
			<select ref={select} defaultValue={'DEFAULT'} data-name={name} data-depth={depth} value={value} onChange={changeHandler} className="form-select" id={label} required={required} {...rest}>
				<option value="DEFAULT" disabled >Choose {label}</option>
				{(Array.isArray( optionArray ) && optionArray?.length > 0)
					? optionArray?.map((option,i) => <option key={i} value={option}>{option}</option>)
					: Object.keys(optionArray).map(( key, i)=> <option key={i} value={optionArray[key]}>{key}</option>)
				}
			</select>
			<label className="text-capitalize" htmlFor={label}>{label}</label>
		</div>
	)
}

Dropdown.propTypes = {
	optionArray : PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.string)
	]),
	label : PropTypes.string.isRequired,
	depth: PropTypes.number,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onChange : PropTypes.func
}

export default Dropdown

//			{
//					"id": 84000463083,
//					"label": "ticket_type",
//					"label": "Type",
//					"description": "Ticket type",
//					"position": 9,
//					"required_for_closure": false,
//					"required_for_agents": false,
//					"type": "default_ticket_type",
//					"default": true,
//					"customers_can_edit": false,
//					"label_for_customers": "Type",
//					"required_for_customers": false,
//					"displayed_to_customers": false,
//					"created_at": "2022-03-29T09:49:24Z",
//					"updated_at": "2022-03-29T09:49:24Z",
//					"choices": [
//							"Question",
//							"Incident",
//							"Problem",
//							"Feature Request",
//							"Refund"
//					]
//			}