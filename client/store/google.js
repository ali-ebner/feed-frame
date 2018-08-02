import axios from 'axios'
import history from '../history'

const GET_COLORS = 'GET_COLORS'


const colorData = (colors) => ({type: GET_COLORS, colors})

const initialState = {
	colors: []
}


export const getColors = () => async dispatch => {
  try {
    // const { data } = await axios.get('/api/users/self/media/recent')
    // console.log("media data", data)
    // const req = {
    //   "requests": data.data.map(entry => {return {
    //     "image": {
    //       "content": entry.images.standard_resolution.url
    //     },
    //     "features": [
    //       {
    //         "type": "IMAGE_PROPERTIES"
    //       }
    //     ]
    //     }
    //   }) 
    // }
    // console.log("REQ OBJECT", req)
    // const colors = await axios.post('/api/users/self/colors', req)
    const { data } = await axios.get('/api/users/self/colors')
    console.log("data in thunk", data)

    dispatch(colorData(data))
  } catch (err) {
    console.error(err)
  }
}


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COLORS:
      return {...state, colors: action.colors}
    default:
      return state
  }
}