import axios from 'axios'
import history from '../history'

const GET_COLORS = 'GET_COLORS'
const GET_LABELS = 'GET_LABELS'
const GET_FACES = 'GET_FACES'


const colorData = (colors) => ({type: GET_COLORS, colors})

const labelData = (labels) => ({type: GET_LABELS, labels})

const faceData = (likely, unlikely) => ({type: GET_FACES, likely, unlikely})

const initialState = {
	colors: [],
  labels: [],
  likelyFaces: {},
  unlikelyFaces: {}
}


export const getColors = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users/self/colors')
    console.log("data in thunk", data)
    dispatch(colorData(data))
  } catch (err) {
    console.error(err)
  }
}

export const getLabels = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users/self/labels')
    dispatch(labelData(data))
  } catch (err) {
    console.error(err)
  }
}

export const getFaces = () => async dispatch => {
  try {
    let likely  = await axios.get('/api/users/self/faces/mostLikely')
    likely = likely.data
    let unlikely = await axios.get('/api/users/self/faces/leastLikely')
    unlikely = unlikely.data
    dispatch(faceData(likely, unlikely))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COLORS:
      return {...state, colors: action.colors}
    case GET_LABELS:
      return {...state, labels: action.labels}
    case GET_FACES:
      return {...state, likelyFaces: action.likely, unlikelyFaces: action.unlikely}
    default:
      return state
  }
}