import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getFaces } from '../store/google'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

class StackedBarChart extends Component{
  componentDidMount(){
    this.props.getFaces()
  }

	render () {
    const likely = this.props.likelyFaces
    const unlikely = this.props.unlikelyFaces
    const data = [
      {name: 'Joy', likely: likely.Joy, unlikely: unlikely.Joy, amt: 20},
      {name: 'Sorrow', likely: likely.Sorrow, unlikely: unlikely.Sorrow, amt: 20},
      {name: 'Anger', likely: likely.Anger, unlikely: unlikely.Anger, amt: 20},
      {name: 'Surprise', likely: likely.Surprise, unlikely: unlikely.Surprise, amt: 20}
    ]

  	return (
      <div id="graphs" >
      <div id="bar" className="my-card"  >
      <div id="barchart">
    	<BarChart width={600} height={300} data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="likely" stackId="a" fill="#8884d8" />
       <Bar dataKey="unlikely" stackId="a" fill="#82ca9d" />
      </BarChart>
      </div>
      <div className="jumbotron jumbotron-fluid" id="bar-jumbo">
      <div className="container">
      <h4 className="display-4" id="bar-caption">Your Sentiment Analysis</h4>
      <p className="lead">The most likely emotions in your recent photos.</p>
      </div>
      </div>
      <div className="next-btn" id="bar-btn">
      <Button type="button" variant="contained" color="primary"><Link to='/labels' className="button">Next: Label Detection</Link></Button>
      </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    likelyFaces: state.google.likelyFaces,
    unlikelyFaces: state.google.unlikelyFaces
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFaces: () => dispatch(getFaces())
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(StackedBarChart)