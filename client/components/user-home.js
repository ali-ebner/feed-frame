import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { getUser } from '../store/google'
import {Login, Colors, WordCloud, PieChart, BarChart, Home} from '../components'


/**
 * COMPONENT
 */
class UserHome extends Component {

    componentDidMount(){
      this.props.getUser()
    }

    render() {
    console.log(this.props)
    const {fullName} = this.props.user

    return (
      <div>
      <div className="jumbotron">
        <h1 className="display-4">Welcome, {fullName}</h1>
        <hr className="my-4"/>
        <Button type="button" variant="contained" color="primary"><Link to='/colors' className="button">Get Your Feed Frame</Link></Button>
        <Home />
      </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log("STATE", state)
  return {
    user: state.google.user,
    colors: state.google.colors
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  }
}


export default connect(mapState, mapDispatch)(UserHome)

