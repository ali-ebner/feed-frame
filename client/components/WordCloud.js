import React, { Component } from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import { connect } from 'react-redux'
import { getLabels } from '../store/google'

 
// const data = [
//   { text: 'Hey', value: 1000 },
//   { text: 'lol', value: 200 },
//   { text: 'first impression', value: 800 },
//   { text: 'very cool', value: 1000000 },
//   { text: 'duck', value: 10 },
// ];
 
const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

class myWordCloud extends Component {
  componentDidMount(){
    this.props.getLabels()
  }
  render() {
    const data = this.props.labels && this.props.labels.map( word => ({
      text: word,
      value: Math.round(Math.random()*1000)
    }))
    console.log("DATA", data)
  return (
       <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        />
    )
  }
}

const mapState = state => {
  return {
    labels: state.google.labels 
  }
}

const mapDispatch = dispatch => {
  return {
    getLabels: () => dispatch(getLabels())
  }
}

export default connect(mapState, mapDispatch)(myWordCloud)
 