import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link active" href="#" onClick={handleClick} disabled={!isLoggedIn}>Logout</a>
              <Link to="/home" className="nav-link active">Home</Link>
              <Link to="/colors" className="nav-link active">Color Palette</Link>
              <Link to="/faces" className="nav-link active">Image Sentiments</Link>
              <Link to="/labels" className="nav-link active">Image Labels</Link>
              <Link to="/comments" className="nav-link active">Comment Sentiments</Link>
            </li>
          </ul>
      }
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
