import React, { Component } from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import { connect } from 'react-redux'
import { getLabels } from '../store/google'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

 
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
      <div id="graphs" >
      <div id="word" className="my-card"  >
      <div id="wordcloud">
       <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        />
      </div>
      <div className="jumbotron jumbotron-fluid" id="word-jumbo">
      <div className="container">
      <h4 className="display-4" id="word-caption">Your Label Detections</h4>
      <p className="lead">Labels for entities detected in your recent photos.</p>
      </div>
      </div>
      <div className="next-btn" id="word-btn">
      <Button type="button" variant="contained" color="primary"><Link to='/comments' className="button">Next:Comment Sentiment Analysis</Link></Button>
      </div>
      </div>
      </div>
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
 