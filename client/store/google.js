import axios from 'axios'
import history from '../history'

const GET_COLORS = 'GET_COLORS'
const GET_LABELS = 'GET_LABELS'
const GET_FACES = 'GET_FACES'
const GOT_USER = 'GOT_USER'
const GOT_COMMENTS = 'GOT_COMMENTS'


const colorData = (colors) => ({type: GET_COLORS, colors})

const labelData = (labels) => ({type: GET_LABELS, labels})

const faceData = (likely, unlikely) => ({type: GET_FACES, likely, unlikely})

const gotUser = (user) => ({type: GOT_USER, user})

const gotComments = (comments) => ({type:GOT_COMMENTS, comments})

const initialState = {
	colors: [],
  labels: [],
  likelyFaces: {},
  unlikelyFaces: {},
  user: {},
  comments: {}
}


export const getColors = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users/self/colors')
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

export const getUser = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users/self')
    dispatch(gotUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const getComments = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users/self/comments')
    dispatch(gotComments(data))
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
    case GOT_USER:
      return {...state, user: action.user}
    case GOT_COMMENTS:
      return {...state, comments: action.comments}
    default:
      return state
  }
}