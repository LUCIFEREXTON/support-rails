import React from 'react'
import PropTypes from 'prop-types'

function Checkbox({field, value, changeHandler}) {
	const onChange = (e) => {
		e.target.value = e.target.checked
		changeHandler(e)
	}
	return (
		<div className="form-check mb-3">
			<input data-name={field?.name} className="form-check-input" type="checkbox" onChange={onChange} value={value} id={`${field?.name}${field?.id}`}/>
			<label className="form-check-label text-capitalize" htmlFor={`${field?.name}${field?.id}`}>
				{field?.label_for_customers}
			</label>
		</div>
	)
}

Checkbox.propTypes = {
	field: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
		label: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.number,
    required_for_closure: PropTypes.bool,
    required_for_agents: PropTypes.bool,
    type: PropTypes.oneOf(['checkbox']),
    default: PropTypes.bool,
    customers_can_edit: PropTypes.bool,
    label_for_customers: PropTypes.string,
    required_for_customers: PropTypes.bool,
    displayed_to_customers: PropTypes.bool,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired
}

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