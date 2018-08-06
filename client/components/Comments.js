import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getComments } from '../store/google'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'


class Comments extends Component {
	componentDidMount(){
		this.props.getComments()
	}

	render(){
	  const { Score, Sentiment } = this.props.comments
	  let className = '';
	  if ( Sentiment === "Postive" || Sentiment === "Slightly Postive") className="alert alert-primary"
	  else if (Sentiment === "Negative" || Sentiment ==="Slightly Negative") className = "alert alert-danger"
	  else className = "alert alert-info"
	  return (
	    <div id="graphs" >
      	<div id="com" className="my-card"  >
      	<div id="comments">
      	<div className={className} role="alert">
		  <h1>{Sentiment}</h1>
		  <h2>Score: {Score}</h2>
		</div>
	      </div>
	      <div className="jumbotron jumbotron-fluid" id="com-jumbo">
	      <div className="container">
	      <h4 className="display-4" id="bar-caption">Your Comment Sentiment Analysis</h4>
	      <p className="lead">The overall sentiments of comments on your recent photos.</p>
	      </div>
	      </div>
	      <div className="next-btn" id="com-btn">
	      <Button type="button" variant="contained" color="primary"><Link to='/home' className="button">Back Home</Link></Button>
	      </div>
	      </div>
	      </div>
	  )
	}
}

const mapState = state => {
	return {
		comments: state.google.comments
	}
}

const mapDispatch = dispatch => {
	return {
		getComments: () => dispatch(getComments())
	}
}

export default connect(mapState, mapDispatch)(Comments)