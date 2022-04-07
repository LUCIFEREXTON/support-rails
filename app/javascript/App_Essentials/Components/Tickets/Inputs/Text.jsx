import React from 'react'
import PropTypes from 'prop-types'

function Text({field}) {
	return (
		<div className="form-floating mb-3">
			<input type={field?.type} className="form-control" id={`${field?.id}`} placeholder={`Enter ${field?.label}`} step={field?.step}/>
			<label for={`${field?.id}`}>{field?.label}</label>
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
// <div className="form-floating mb-3">
// <input type="date" className="form-control" id="floatingInput" placeholder="number"/>
// <label for="floatingInput">Date</label>
// </div>
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