import { PieChart, Pie, Sector, Cell } from 'Recharts'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getColors } from '../store/google'

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
const colorObj = {
  red: 65,
  green: 50,
  blue: 34
}
console.log(colorObj)
const color1 = toHex(colorObj)
const COLORS = [color1, '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180;


// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//  	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x  = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
//     	{`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

class SimplePieChart extends Component{
  componentDidMount(){
    this.props.getColors()
  }

	render () {
    const colors = this.props.colors || COLORS
  	return (
      <div id="pie">
    	<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
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