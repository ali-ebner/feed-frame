const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')
module.exports = router

router.get('/self', async (req, res, next) => {
  try {
    const data = await axios.get(`https://api.instagram.com/v1/users/self/?access_token=${req.user.accessToken}`)
    res.json(data.data)
  } catch (err) {
    next(err)
  }
})

router.get('/self/media/recent', async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${req.user.accessToken}`)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/self/colors', async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=219263362.f575de1.d2eca60557594d16a642f18eb3e33bb5`)
    console.log("data1", data)
    // const request = {
    //   "requests": data.data.map(entry => {return {
    //     "image": {
    //       "source": {
    //         "imageUri": `${entry.images.standard_resolution.url}`
    //       }
    //     },
    //     "features": [
    //       {
    //         "type": "IMAGE_PROPERTIES",
    //         "maxResults":"1"
    //       }
    //     ]
    //     }
    //   }) 
    // }
    
    const request = {
  "requests":[
    {
      "image":{
        "source":{
          "imageUri":
            "https://scontent.cdninstagram.com/vp/7b138887860d3cd5fc394ddca96ea19e/5C0D3740/t51.2885-15/sh0.08/e35/s640x640/37057923_183892825812369_3600906937517998080_n.jpg"
        }
      },
      "features":[
        {
          "type":"IMAGE_PROPERTIES",
          "maxResults":1
        }
      ]
    }
  ]
}
    console.log("request object", request)
     const response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=AIzaSyATsYyW-tNsA3beM3M5bM7cXm2sO69sX14`, request)
     console.log("response in route", response.data.responses)
    res.json(response.data.responses[0].imagePropertiesAnnotation.dominantColors.colors)
  } catch (err) {
    next(err)
  }
})