import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getUser } from '../store/google'
import InstaWrap from './InstaWrap'

class Home extends Component {
	componentDidMount(){
		this.props.getUser()
	}

	render(){
	  const { userId, accessToken, clientId } = this.props.user
	  if (userId) {
	  return (
	    <InstaWrap userId={userId} accessToken={accessToken} clientId={clientId}/>
	  )
	}
	else {
		return (
			<h1>Loading...</h1>
		)
	}
	}
}

const mapState = state => {
	return {
		user: state.google.user
	}
}

const mapDispatch = dispatch => {
	return {
		getUser: () => dispatch(getUser())
	}
}

export default connect(mapState, mapDispatch)(Home)