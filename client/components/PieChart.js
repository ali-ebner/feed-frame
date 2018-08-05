import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'Recharts'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getColors } from '../store/google'
import { WordCloud, BarChart } from '../components'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const data = [{name: 'Group A', value: 20}, {name: 'Group B', value: 20},
                  {name: 'Group C', value: 20}, {name: 'Group D', value: 20}, {name: 'Group E', value: 20},
                  {name: 'Group F', value: 20}, {name: 'Group G', value: 20},
                  {name: 'Group H', value: 20}, {name: 'Group I', value: 20},
                  {name: 'Group J', value: 20}, {name: 'Group K', value: 20},
                  {name: 'Group L', value: 20}, {name: 'Group M', value: 20},
                  {name: 'Group N', value: 20}, {name: 'Group O', value: 20},
                  {name: 'Group P', value: 20}, {name: 'Group Q', value: 20},
                  {name: 'Group R', value: 20}, {name: 'Group S', value: 20},
                  {name: 'Group T', value: 20}]

const toHex = rgb => `#`+(rgb.red.toString(16))+((rgb.green).toString(16))+((rgb.blue).toString(16))


const COLORS = ['#FFFFFF', '#00C49F', '#FFBB28', '#FF8042']

class SimplePieChart extends Component{
  componentDidMount(){
    this.props.getColors()
  }

	render () {
    const colors = this.props.colors || COLORS
  	return (
      <div id="graphs" >
      <div id="pie" className="my-card"  >
    	<PieChart width={800} height={400} onMouseEnter={this.onPieEnter} className="card-img-top">
        <Pie
          data={data} 
          cx={300} 
          cy={200} 
          labelLine={false}
          //label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell key={data.name} fill={colors[index % colors.length]}/>)
          }
        </Pie>
      </PieChart>
      <div className="jumbotron jumbotron-fluid">
      <div className="container">
      <h4 className="display-4">Your Color Palette</h4>
      <p className="lead">The most prominent colors from every photo in your recent feed.</p>
      </div>
      </div>
      <div className="next-btn">
      <Button type="button" variant="contained" color="primary"><Link to='/faces' className="button">Next: Photo Sentiment Analysis</Link></Button>
      </div>
      </div>
      </div>
     
    )
  }
}

const mapStateToProps = state => {
  return {
    colors: state.google.colors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getColors: () => dispatch(getColors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimplePieChart)