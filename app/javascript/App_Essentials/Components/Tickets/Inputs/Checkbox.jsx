import React from 'react'
import PropTypes from 'prop-types'
const Checkbox = ({name}) => {
	return (
<		div className="form-check mb-3">
			<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
			<label className="form-check-label" for="flexCheckDefault">
				{name}
			</label>
		</div>
	)
}
export default Checkbox;
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