import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const UserHome = (props) => {
    const {fullName} = props

    return (
      <div className="jumbotron">
        <h1 className="display-4">Welcome, {fullName}</h1>
        <hr className="my-4"/>
        <button className="btn btn-primary btn-lg" role="button"><Link to="/colors">Get Your Feed Frame</Link></button>
      </div>
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    fullName: state.user.full_name,
    colors: state.google.colors
  }
}


export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  fullName: PropTypes.string
}
