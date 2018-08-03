import axios from 'axios'
import history from '../history'

const GET_COLORS = 'GET_COLORS'
const GET_LABELS = 'GET_LABELS'


const colorData = (colors) => ({type: GET_COLORS, colors})

const labelData = (labels) => ({type: GET_LABELS, labels})

const initialState = {
	colors: [],
  labels: []
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
    const { data } = await axios.get('/api/users/self/faces')
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
    default:
      return state
  }
}