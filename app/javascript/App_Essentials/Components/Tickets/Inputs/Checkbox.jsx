import React from 'react'
import PropTypes from 'prop-types'

function Checkbox({field, value, changeHandler}) {
	const onChange = (e) => {
		console.log('Checked?:', e.target.checked, 'Value?:', e.target.value)
		e.target.value = e.target.checked
		changeHandler(e)
	}
	return (
		<div className="form-check mb-3">
			<input data-name={field?.name} className="form-check-input" type="checkbox" onChange={onChange} value={value} id={`${field?.name}${field?.id}`}/>
			<label className="form-check-label text-capitalize" htmlFor={`${field?.name}${field?.id}`}>
				{field?.label}
			</label>
		</div>
	)
}

Checkbox.propTypes = {}

export default Checkbox



//			{
//					"id": 84000471175,
//					"name": "cf_encrypted",
//					"label": "encrypted",
//					"description": null,
//					"position": 2,
//					"required_for_closure": false,
//					"required_for_agents": false,
//					"type": "custom_checkbox",
//					"default": false,
//					"customers_can_edit": true,
//					"label_for_customers": "encrypted",
//					"required_for_customers": false,
//					"displayed_to_customers": true,
//					"created_at": "2022-04-02T05:56:03Z",
//					"updated_at": "2022-04-02T05:56:03Z"
//			}