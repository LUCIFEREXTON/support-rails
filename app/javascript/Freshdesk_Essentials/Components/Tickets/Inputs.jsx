import React,{useEffect, useState, useCallback, useRef} from 'react'
import axios from 'axios'
import Dropdown from './Inputs/Dropdown'
import DependableDropdown from './Inputs/DependableDropdown'
import TextArea from './Inputs/TextArea'
import Checkbox from './Inputs/Checkbox'
import Text from './Inputs/Text'

const Inputs = ({})=>{
	//handling file inputs
	const [files, changeFiles] = useState([]);
	const fileUploadRef = useRef();
	const formRef = useRef();

	const onFilesChange = event => {
    changeFiles([...files, ...event.target.files]);
    formRef.current.reset();
  }
	const removeSelectedFile = (fileName) => {
    changeFiles([...files.filter(file => file.name !== fileName)]);
  }
	const submitHandler = (e)=>{
		console.log(formData);
		e.preventDefault();
	}
	//rendring diffrent input fields acc to ticket fields
	const renderElement = (field) => {
		switch (field.type) {
			case 'nested_dropdown':
				return <DependableDropdown key={field.id} field={field} changeHandler={dependentChange}/>
			case 'select':
				return <Dropdown key={field.id} optionArray={field?.choices} name={field?.name} label={field?.label_for_customers} value={field[field.label_for_customers]} changeHandler={onChange} required ={field.required_for_customers} />
			case 'textarea':
				return <TextArea key={field.id} field={field} value={field[field.label_for_customers]} changeHandler={changeEditorState} required ={field.required_for_customers} />
			case 'checkbox':
				return <Checkbox key={field.id} field={field} value={field[field.label_for_customers]} changeHandler={onChange} required ={field.required_for_customers} />
			default:
				return <Text key={field.id} field={field} value={field[field.label_for_customers]} changeHandler={onChange} required ={field.required_for_customers} />
		}
	}
	//setting ticket fields
	const [data, setdata] = useState([])
	useEffect(()=>{
		(async()=>{
			const res = await axios.get('/ticket/create')
			setdata([...res.data])
		})()
	},[])
	const [formData, setFormData] = useState(false)
	//setting default formValues
	useEffect(() => {
		const formInit = {}
		data.forEach(field => {
			if(field.type === 'checkbox')
				formInit[field.name] = false
			else if(field.type === 'textarea')
				formInit[field.name] = '<p></p>\n'
			else
				formInit[field.name] = ''
			
			if(field.nested_ticket_fields){
				field.nested_ticket_fields.forEach(nested_field => {
					formInit[nested_field.name] = ''
				})
			}
		})
		setFormData({...formInit})
	}, [data])
	//onchnage events for handling form
	const changeEditorState = useCallback((editorState, name) => {
		console.log(formData)
		console.log(name, editorState)
		if(editorState!==formData[name]){
			setFormData({...formData, [name]: editorState})
		}
	},[formData])
	const onChange = (e) => {
		if(e.target.value && e.target.value!==formData[e.target.dataset.name]){
			console.log(e.target.dataset.name, e.target.value);
			setFormData({...formData, [e.target.dataset.name]:e.target.value})
		}
	}
	const dependentChange = (namesArr, valueArr) => {
		let temp = {...formData}
		namesArr.forEach((name, i)=> {
			console.log(name, valueArr[i])
			temp = {...temp, [name]: valueArr[i]}
		})
		setFormData({...temp})
	}
	
	return(
		<>
			{formData && data.length > 0 && <form onSubmit={submitHandler}>
				{data.map(field => renderElement(field))}
				<form ref={formRef}>
          <div className="mb-3 form-group">
            {
              files?.length  !== 0 && <div name="attachements" className="form-control attachment-container">
                {
                  files.map((file, ind) => (
                    <div className="attachment-selected" key={ind}>
                      <>{file.name}</>
                      <button type="button" className="file-remove-btn" onClick={() => removeSelectedFile(`${file.name}`)}>x</button>
                    </div>
                  ))
                }
              </div>
            }
            <button type="button" className="btn btn-primary" onClick={(event) => fileUploadRef.current.click()}>Upload Attachments</button>
            <input 
              type="file"
              ref={fileUploadRef}  
              multiple
              onChange={onFilesChange}
              style={{"display": "none"}} 
            />
          </div>
        </form>
				<input type="submit" className="btn btn-success text-white me-2" value="Submit" />
				<input type="reset" className="btn btn-danger ms-2" value="Reset"/>
			</form>}
		</>
	) 
}

export default Inputs

// {data?.length && <DependableDropdown field={data[2]} />}
// <Dropdown optionArray={data[6]?.choices} name={data[6]?.label}/>
// <TextArea name={data[9]?.label} />
// <Checkbox name={data[1]?.label} />
// <Text field={data[3]} />
// <Text field={data[4]} />
// <Text field={data[5]} />
// <Text field={data[8]} />

// custom_text => text => 1
// custom_paragraph => textarea => 2
// custom_checkbox => checkbox => 3
// custom_dropdown => select => 4
// nested_field => nested_dropdown => 5
// custom_date => date => 6
// custom_number => number => 7
// custom_decimal => decimal => 8
//
//	[
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
//			},
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
//			},
//			{
//					"id": 84000471176,
//					"name": "cf_country",
//					"label": "country",
//					"description": null,
//					"position": 3,
//					"required_for_closure": false,
//					"required_for_agents": false,
//					"type": "nested_field",
//					"default": false,
//					"customers_can_edit": true,
//					"label_for_customers": "country",
//					"required_for_customers": false,
//					"displayed_to_customers": true,
//					"created_at": "2022-04-02T05:57:42Z",
//					"updated_at": "2022-04-02T05:57:42Z",
//					"choices": {
//							"category 1": {
//									"subcategory 1": [
//											"item 1",
//											"item 2"
//									],
//									"subcategory 2": [
//											"item 1",
//											"item 2"
//									],
//									"subcategory 3": []
//							},
//							"category 2": {
//									"subcategory 1": [
//											"item 1",
//											"item 2"
//									]
//							}
//					},
//					"nested_ticket_fields": [
//							{
//									"id": 84000000980,
//									"name": "cf_state",
//									"description": null,
//									"label": "state",
//									"label_in_portal": "state",
//									"level": 2,
//									"ticket_field_id": 84000471176,
//									"created_at": "2022-04-02T05:57:43Z",
//									"updated_at": "2022-04-02T05:57:43Z"
//							},
//							{
//									"id": 84000000981,
//									"name": "cf_city",
//									"description": null,
//									"label": "city",
//									"label_in_portal": "city",
//									"level": 3,
//									"ticket_field_id": 84000471176,
//									"created_at": "2022-04-02T05:57:43Z",
//									"updated_at": "2022-04-02T05:57:43Z"
//							}
//					]
//			},
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
	//			},
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
	//			},
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
//			},
//			{
//					"id": 84000463082,
	//					"name": "subject",
//					"label": "Subject",
//					"description": "Ticket subject",
	//					"position": 8,
	//					"required_for_closure": false,
	//					"required_for_agents": true,
	//					"type": "default_subject",
	//					"default": true,
	//					"customers_can_edit": true,
	//					"label_for_customers": "Subject",
	//					"required_for_customers": true,
//					"displayed_to_customers": true,
	//					"created_at": "2022-03-29T09:49:24Z",
//					"updated_at": "2022-03-29T09:49:24Z"
	//			},
	//			{
	//					"id": 84000463083,
	//					"name": "ticket_type",
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
	//			},
	//			{
	//					"id": 84000463084,
//					"name": "source",
	//					"label": "Source",
//					"description": "Ticket source",
	//					"position": 10,
	//					"required_for_closure": false,
	//					"required_for_agents": false,
	//					"type": "default_source",
	//					"default": true,
	//					"customers_can_edit": false,
	//					"label_for_customers": "Source",
	//					"required_for_customers": false,
	//					"displayed_to_customers": false,
	//					"created_at": "2022-03-29T09:49:24Z",
	//					"updated_at": "2022-03-29T09:49:24Z",
	//					"choices": {
	//							"Email": 1,
	//							"Portal": 2,
//							"Phone": 3,
	//							"Forum": 4,
//							"Twitter": 5,
	//							"Facebook": 6,
	//							"Chat": 7,
	//							"MobiHelp": 8,
	//							"Feedback Widget": 9,
	//							"Outbound Email": 10,
	//							"Ecommerce": 11,
	//							"Bot": 12,
	//							"Whatsapp": 13
	//					}
	//			},
	//			{
	//					"id": 84000463085,
	//					"name": "status",
	//					"label": "Status",
//					"description": "Ticket status",
	//					"position": 11,
//					"required_for_closure": false,
	//					"required_for_agents": true,
	//					"type": "default_status",
	//					"default": true,
	//					"customers_can_edit": false,
	//					"label_for_customers": "Status",
	//					"required_for_customers": false,
	//					"displayed_to_customers": true,
	//					"created_at": "2022-03-29T09:49:24Z",
	//					"updated_at": "2022-03-29T09:49:24Z",
	//					"choices": {
	//							"2": [
	//									"Open",
	//									"Being Processed"
	//							],
	//							"3": [
	//									"Pending",
//									"Awaiting your Reply"
	//							],
//							"4": [
	//									"Resolved",
	//									"This ticket has been Resolved"
	//							],
	//							"5": [
	//									"Closed",
	//									"This ticket has been Closed"
	//							],
	//							"6": [
	//									"Waiting on Customer",
	//									"Awaiting your Reply"
	//							],
	//							"7": [
	//									"Waiting on Third Party",
	//									"Being Processed"
//							]
	//					}
//			},
	//			{
	//					"id": 84000463086,
	//					"name": "priority",
	//					"label": "Priority",
	//					"description": "Ticket priority",
	//					"position": 12,
	//					"required_for_closure": false,
	//					"required_for_agents": true,
	//					"type": "default_priority",
	//					"default": true,
	//					"customers_can_edit": false,
	//					"label_for_customers": "Priority",
	//					"required_for_customers": false,
	//					"displayed_to_customers": false,
	//					"created_at": "2022-03-29T09:49:24Z",
//					"updated_at": "2022-03-29T09:49:24Z",
	//					"choices": {
	//							"Low": 1,
	//							"Medium": 2,
	//							"High": 3,
//							"Urgent": 4
//					}
	//			},
//			{
	//					"id": 84000463087,
	//					"name": "group",
	//					"label": "Group",
	//					"description": "Ticket group",
	//					"position": 13,
	//					"required_for_closure": false,
	//					"required_for_agents": false,
	//					"type": "default_group",
	//					"default": true,
	//					"customers_can_edit": false,
	//					"label_for_customers": "Group",
	//					"required_for_customers": false,
	//					"displayed_to_customers": false,
	//					"created_at": "2022-03-29T09:49:24Z",
	//					"updated_at": "2022-03-29T09:49:24Z",
//					"choices": {
	//							"Billing": 84000219438,
	//							"Customer Support": 84000219440,
	//							"Escalations": 84000219439
	//					}
	//			},
	//			{
	//					"id": 84000463088,
	//					"name": "agent",
	//					"label": "Agent",
	//					"description": "Agent",
	//					"position": 14,
	//					"required_for_closure": false,
//					"required_for_agents": false,
//					"type": "default_agent",
	//					"default": true,
//					"customers_can_edit": false,
	//					"label_for_customers": "Assigned to",
	//					"required_for_customers": false,
	//					"displayed_to_customers": true,
	//					"created_at": "2022-03-29T09:49:24Z",
	//					"updated_at": "2022-03-29T09:49:24Z",
	//					"choices": {
	//							"Ajay Kanyal": 84007931837,
	//							"Mo Bame": 84007928874,
	//							"Utkarsh Gupta": 84007931838
	//					}
	//			},
	//			{
	//					"id": 84000463090,
	//					"name": "description",
	//					"label": "Description",
//					"description": "Ticket description",
//					"position": 16,
	//					"required_for_closure": false,
//					"required_for_agents": true,
	//					"type": "default_description",
//					"default": true,
	//					"customers_can_edit": true,
//					"label_for_customers": "Description",
	//					"required_for_customers": true,
//					"displayed_to_customers": true,
	//					"created_at": "2022-03-29T09:49:24Z",
//					"updated_at": "2022-03-29T09:49:24Z"
	//			},
//			{
	//					"id": 84000463091,
//					"name": "company",
	//					"label": "Company",
//					"description": "Ticket Company",
	//					"position": 17,
//					"required_for_closure": false,
	//					"required_for_agents": true,
//					"type": "default_company",
	//					"default": true,
//					"customers_can_edit": true,
//					"label_for_customers": "Company",
//					"required_for_customers": true,
	//					"displayed_to_customers": true,
//					"created_at": "2022-03-29T09:49:24Z",
	//					"updated_at": "2022-03-29T09:49:24Z"
	//			}
	//	]
