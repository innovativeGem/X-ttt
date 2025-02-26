import React, {Component} from 'react'
import PopUp from '../layouts/PopUp'
import PropTypes from 'prop-types'

export default class PopUp_page extends Component {

	constructor (props) {
		super(props)
	}

	render () {
		const [ appState ] = useAppContext()

		if (!appState || !appState.ws_conf) {
			return <p>Loading...</p>
		}

		const { pu_page } = this.props.params
		const page_x = appState.ws_conf.pgs[pu_page]

		if (!pu_page || !page_x) return null

		// console.log(page_x)

		return (
			<PopUp pageTitle={page_x.pg_name}>
				<div dangerouslySetInnerHTML={{__html: page_x.__cdata}} />
			</PopUp>
		)
	}

}

PopUp_page.propTypes = {
	params: PropTypes.any
}