import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, IndexRoute, browserHistory  } from 'react-router'
import { createHistory, useBasename } from 'history'
import ga from 'react-ga'

import './sass/main.scss'

import Main from './views/Main'

import Ttt from './views/ttt/Ttt'

import Txt_page from './views/pages/Txt_page'
import PopUp_page from './views/pages/PopUp_page'

import Contact from './views/pages/Contact'
import ErrorPage from './views/pages/ErrorPage'

import { AppProvider } from './context/AppContext'
import prep_env from './models/prep_env'



let renderSite = function () {
	return render((
		<AppProvider>
			<Router history={browserHistory}>
				<Route path='/' component={Main}>

					<IndexRoute components={{mainContent: Txt_page}} />

					<Route path='/pg/(:page)' components={{mainContent: Txt_page}} />

					<Route path='/ttt' components={{mainContent: Ttt}} />

					<Route path='/pupg/(:pu_page)' components={{popup: PopUp_page}} />

					<Route path='/contact-us' components={{popup: Contact}} />

					<Route path='/error/404' components={{mainContent: ErrorPage}} />
					<Route path="*" components={{mainContent: ErrorPage}} />
				</Route>
			</Router>
		</AppProvider>
	), document.getElementById('root'))
}

// ----------------------------------------------------------------------
// This section is used to configure the global app
// ----------------------------------------------------------------------


prep_env()
	.then((settings) => {
		console.log('Loaded environment settings:', settings)

		renderSite()

		if (settings.ws_conf && settings.ws_conf.conf && settings.ws_conf.conf.ga_acc) {
			ga.initialize(settings.ws_conf.conf.ga_acc.an, { debug: true })
			browserHistory.listen((location) => {
			ga.pageview(location.pathname)
			})
		}
	})
	.catch((err) => {
		console.error('Error initializing environment:', err)
	})



