import React from 'react'
import { useSelector } from 'react-redux';
import Toast from './Toast'
const Layout = ({children}) =>{
	const msg = useSelector( state => state.errormsg)
  return(
		<div className='container'>
			{msg!=='' && <Toast msg={msg}/>}
			<div className='grid support-content bg-primary-bv'>
				<div className='grid-body'>
					{children}
				</div>
			</div>
		</div>
  );
}

export default Layout
