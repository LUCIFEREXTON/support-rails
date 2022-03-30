import React from 'react'
import { useSelector } from 'react-redux';
import Toast from './Toast'
const Layout = ({children}) =>{
	const msg = useSelector( state => state.errormsg)
  return(
		<div className='container'>
			{msg!='' && <Toast msg={msg}/>}
			<section className='content'>
				<div className='row'>
					<div className='col-md-12'>
						<div className='grid support-content bg-primary-bv'>
							<div className='grid-body'>
								{children}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
  );
}

export default Layout
