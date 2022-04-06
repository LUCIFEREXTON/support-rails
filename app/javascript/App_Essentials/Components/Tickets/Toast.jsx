import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Toast({msg}) {
    const dispatch = useDispatch()
    const [openmodal, setopenmodal] = useState(true)
    const closemodal = (e)=>{
        dispatch({type:'ERROR', error: ''})
        e.stopPropagation()
        setopenmodal(false)
    }
	const reload = ()=>{
			window.location.reload(false);
    }
	return(
        openmodal?
		<div id='error-modal-backdrop'>
			<div className='error-modal'>
				<div className='error-modal-body'>
					{msg}
				</div>
				<div className='error-modal-footer'>
					<div className='footer-button' onClick={closemodal}>Close</div>
					<div className='footer-button' onClick={reload}>Retry</div>
				</div>
			</div>
		</div>:
        <></>
	)
}
/*
let interval;

    useEffect(() => {
        //eslint-disable-next-line
        interval = setTimeout(() => {
            document.querySelector('.alert').classList.remove('alert-danger')
            document.querySelector('.alert').classList.remove('alert-success')
        }, 5000);
    }, [props.class])
    useEffect(() => {    
        return ()=> clearInterval(interval)
    //eslint-disable-next-line
    }, [])

    return (
        <div className={`alert ${props.class} w-25 fixed-top`} role="alert">
            <strong>{props.msg}</strong>
        </div>
	)
*/
