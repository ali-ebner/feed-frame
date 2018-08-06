import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getColors} from '../store/google'

class Colors extends Component{
  constructor(){
    super()
  }

  componentDidMount(){
    this.props.getColors()
  }

  render() {
    return (
      <div>
        <ul>
          { this.props.colors.length && 
            this.props.colors.map(color => <li key={color.score}>
              Red: {color.color.red} Green: {color.color.green} Blue: {color.color.blue}
              </li>)}
        </ul>
      </div>
    )
}
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    colors: state.google.colors
  }
}

const mapDispatch = dispatch => {
  return {
    getColors: () => dispatch(getColors())
  }
}

export default connect(mapState, mapDispatch)(Colors)
