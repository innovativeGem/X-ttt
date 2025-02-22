import superagent from 'superagent'
import X2JS from 'x2js'

import '../../static/ws_conf.xml'

const prep_env = function () {
	return new Promise((resolve, reject) => {
	  superagent
		.get(conf_file)
		.end(function (err, res) {
		  if (err || !res.ok) {
			alert('Can\'t load site configuration')
			console.error('Can\'t load site configuration', err)
			return reject(err)
		  }
  
		  // Parse XML config to JSON
		  const x2js = new X2JS({ attributePrefix: '' })
		  const conf_json = x2js.xml2js(res.text)
		  const ws_conf = conf_json.data
		  console.log('loaded site configuration', ws_conf.site.vals.year)
  
		  // Flash detection
		  let hasFlash = false
		  if ('ActiveXObject' in window) { // IE only
			try {
			  hasFlash = !!(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
			} catch (e) {}
		  } else { // W3C
			hasFlash = !!navigator.mimeTypes['application/x-shockwave-flash']
		  }
  
		  // Mobile detection
		  const is_mobile = !!(
			navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/iPad|iPhone|iPod/i) ||
			navigator.userAgent.match(/webOS|BlackBerry|Windows Phone|Opera Mini|IEMobile|windows mobile/i)
		  )
		  const mobile_type = is_mobile
			? (navigator.userAgent.match(/Android/i) ? 'Android'
			   : navigator.userAgent.match(/iPad|iPhone|iPod/i) ? 'iOS'
			   : null)
			: null
  
		  const can_app = !!mobile_type
		  const couldHaveFlash = !is_mobile
  
		  const settings = {
			ws_conf,
			hasFlash,
			is_mobile,
			mobile_type,
			can_app,
			couldHaveFlash
		  }
  
		  // Resolve the promise with settings object
		  resolve(settings)
		})
	})
  }
  
export default prep_env
