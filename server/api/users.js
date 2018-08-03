const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')
const { getRes, getInsta, traverse } = require('./utils')
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
    const insta = await getInsta(req.user.accessToken)
    const responses = await getRes(insta, "IMAGE_PROPERTIES")
    res.json(responses)
  } catch (err) {
    next(err)
  }
})

router.get('/self/labels', async (req, res, next) => {
  try {
    const insta = await getInsta(req.user.accessToken)
    let responses = await getRes(insta, "LABEL_DETECTION")
    responses = (responses.map(response => response.responses[0].labelAnnotations))
    responses = traverse(responses)
    res.json(responses)
  } catch(err) {
    next(err)
  }
})

router.get('/self/text', async (req, res, next) => {
  try {
    const insta = await getInsta(req.user.accessToken)
    const responses = await getRes(insta, "TEXT_DETECTION")
    res.json(responses)
  } catch(err) {
    next(err)
  }
})

router.get('/self/faces', async (req, res, next) => {
  try {
    const insta = await getInsta(req.user.accessToken)
    const responses = await getRes(insta, "FACE_DETECTION")
    let filtered = responses.map(response => {
      //if(response.responses.length>0) {
         if(response.responses[0].faceAnnotations)
          return response.responses[0].faceAnnotations[0]
      }
    //}
    )
    filtered.forEach(response => {
      if(response && response.landmarks) delete response.landmarks
      if(response) delete response.boundingPoly
      if(response) delete response.fdBoundingPoly
    })
    res.json(filtered)
  } catch(err) {
    next(err)
  }
})