import React, {Component} from 'react'
import Instafeed from 'react-instafeed'

export default class InstaWrap extends Component {
	shouldComponentUpdate(){
		return false
	}

	render() {
		const instafeedTarget = 'instafeed';
		const { userId, accessToken, clientId } = this.props
		return (
		<div id={instafeedTarget} className="card-columns">
	    <div >
	      <Instafeed
	        limit='20'
	        ref='instafeed'
	        resolution='standard_resolution'
	        sortBy='most-recent'
	        target={instafeedTarget}
	        template= '<div class="card"><img class="card-img-top" src={{image}}></div>'
	        userId={userId}
	        clientId={clientId}
	        accessToken={accessToken}
	      />
	    </div>
	    </div>
			)
	}
}