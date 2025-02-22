import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

import MessageBar from '../layouts/MessageBar'
import { useAppContext } from '../../context/AppContext'

const Header = () => {

	const [ appState ] = useAppContext()

	if (!appState || !appState.ws_conf) {
		return <p>Loading...</p>
	}

	const { header, main_menu } = appState.ws_conf
	console.log('Header context:', header) 

	return (
		<header id='main_header'>
				<div id='brand'>
					<div className='container'>

						<Link to={header.head_l_logo.u} className='logo-tl'>
							<img src={header.head_l_logo.i} />
						</Link>


						<Link to={header.site_title.u} className='main-site-name'>
							{header.site_title.txt}
						</Link>

						<nav>
							<ul>
								{
									main_menu.pages.p.map(function (p, i) {
										return (
											<li key={i}>
												<Link 	to={p.u} >
													<i className={'fa fa-2x '+p.ico} aria-hidden="true"></i>
													{p.name}
												</Link>
											</li>
										)
									})
								}
							</ul>
						</nav>

					</div>
				</div>

				<MessageBar />

			</header>
	  )
}

// property validation
Header.propTypes = {
	children: PropTypes.any
}

export default Header