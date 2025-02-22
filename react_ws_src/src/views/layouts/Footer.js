import React from 'react'
import { Link } from 'react-router'

import { useAppContext } from '../../context/AppContext'

const Footer = () => {
	const [ appState ] = useAppContext()
	
	if (!appState || !appState.ws_conf) {
		return <p>Loading...</p>
	}

	const { footer } = appState.ws_conf

	return (
		<footer>
			<div className='container'>
				<nav>
					<ul>
						{
							footer.items.i.map(function (it, i) {
								return (
									it.tp == 'ln' ?
										(<li key={i}><Link to={it.u}>{it.txt}</Link></li>) :
										(<li key={i}>{it.txt}</li>)
								)
							})
						}
					</ul>
				</nav>

				<div className='foot_message'> {footer.foot_msg.txt} </div>

				<a className='foot-r-logo' href={footer.foot_r_logo.u} target={footer.foot_r_logo.t} rel="noopener noreferrer" >
					<img alt='footer logo' src={footer.foot_r_logo.i} />
				</a>
			</div>
		</footer>
	)
}


export default Footer