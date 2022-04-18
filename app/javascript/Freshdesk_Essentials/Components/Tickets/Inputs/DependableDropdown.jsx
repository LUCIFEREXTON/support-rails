import React, { useState, useEffect, useRef } from 'react'
import Dropdown from './Dropdown'
import PropTypes from 'prop-types'

function DependableDropdown({field, changeHandler, ...rest}) {
  const no_of_dd = useRef(field.nested_ticket_fields.length+1)
  const [labels_arr, setLabel_arr] = useState([])
  const [names_arr, setName_arr] = useState([])
  const choices = useRef({...field.choices})
  const depth = useRef(1)
  const [optionsArr, setOptionsArr] = useState([])
  const [seletectedoptionArr, setSeletectedOptionArr] = useState([])
  const [required, setRequired] = useState(false)
  
  const onChange = (e) =>{
    depth.current = e.target.dataset.depth
    const value = e.target.value    
    const tempSelOpArr = [...seletectedoptionArr]
    tempSelOpArr.splice(depth.current-1)
    tempSelOpArr.push(value)
    setSeletectedOptionArr([...tempSelOpArr])
  }

  useEffect(() => {
    const temp = []
    const nameTemp = []
    temp.push(field?.label_for_customers)
    nameTemp.push(field?.name)
    field?.nested_ticket_fields.forEach(custom_field =>{ 
      temp.push(custom_field?.label_in_portal)
      nameTemp.push(custom_field?.name)
    })
    setLabel_arr([...temp])
    setName_arr([...nameTemp])
    setOptionsArr([[...Object.keys(field?.choices)]])
    setRequired(field?.required_for_customers)
  },[field])

  useEffect(() => {
    if(seletectedoptionArr.length && depth.current< no_of_dd.current){      
      const tempOpArr = [...optionsArr]
      tempOpArr.splice(depth.current)
      let temp = {...choices.current}      
      for (let index = 0; index < depth.current; index++) {      
        temp = temp[seletectedoptionArr[index]]
      }
      if(!Array.isArray(temp)){
          temp = Object.keys(temp)
        }      
      tempOpArr.push(temp)
      depth.current++;
      setOptionsArr([...tempOpArr])
    }
    console.log(seletectedoptionArr)
    changeHandler(names_arr, seletectedoptionArr)
  }, [seletectedoptionArr])

  return (
    <>
      {labels_arr.length>0 && optionsArr.map((options, i)=>{
        return (<Dropdown
          key={i}
          depth={i+1}
          optionArray={options} 
          label={labels_arr[i]} 
          name={names_arr[i]} 
          value={seletectedoptionArr[i]}
          changeHandler={onChange}
          required={required}
          {...rest}
        />)}
      )}
    </>
  )
}

DependableDropdown.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.number,
    required_for_closure: PropTypes.bool,
    required_for_agents: PropTypes.bool,
    type: PropTypes.oneOf(['nested_dropdown']),
    default: PropTypes.bool,
    customers_can_edit: PropTypes.bool,
    label_for_customers: PropTypes.string,
    required_for_customers: PropTypes.bool,
    displayed_to_customers: PropTypes.bool,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    choices: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])),
    nested_ticket_field: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      label: PropTypes.string,
      label_in_portal: PropTypes.string,
      level: PropTypes.string,
      ticket_field_id: PropTypes.number,
      created_at: PropTypes.string,
      updated_at: PropTypes.string
    }))
  }).isRequired
}

export default DependableDropdown


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
//			}
