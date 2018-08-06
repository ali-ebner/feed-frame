const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')
const { getRes, getInsta, traverse, filterFaces, mostLikely, leastLikely, colorsToHex, getComments, filterEmpty, getSentiment } = require('./utils')
module.exports = router


router.get('/self', async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://api.instagram.com/v1/users/self/?access_token=${req.user.accessToken}`)
    const user = {
      userId: data.data.id,
      accessToken: req.user.accessToken,
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      fullName: data.data.full_name
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/self/media/recent', async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${req.user.accessToken}`)
    res.json(data.data)
  } catch (err) {
    next(err)
  }
})

router.get('/self/captions', async (req, res, next) => {
  try {
    const insta = await getInsta(req.user.accessToken)
    res.json(insta)
  } catch (err) {
    next(err)
  }
})

router.get('/self/colors', async (req, res, next) => {
  try {
    const insta = await getInsta(req.user.accessToken)
    const resObj = await getRes(insta, "IMAGE_PROPERTIES")
    let responses = resObj.map(entry => entry.responses)
    responses = responses.map(entry => entry && entry[0].imagePropertiesAnnotation.dominantColors.colors[0].color)
    responses = colorsToHex(responses)
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

router.get('/self/faces/all', async (req, res, next) => {
  try {
    const insta = await getInsta(req.user.accessToken)
    const responses = await getRes(insta, "FACE_DETECTION")
    let filtered = filterFaces(responses)
    res.json(filtered)
  } catch(err) {
    next(err)
  }
})

router.get('/self/faces/mostLikely', async (req, res, next) => {
  try {
    const insta = await getInsta(req.user.accessToken)
    const responses = await getRes(insta, "FACE_DETECTION")
    let filtered = filterFaces(responses)
    filtered = mostLikely(filtered)
    res.json(filtered)
  } catch(err) {
    next(err)
  }
})

router.get('/self/faces/leastLikely', async (req, res, next) => {
  try {
    const insta = await getInsta(req.user.accessToken)
    const responses = await getRes(insta, "FACE_DETECTION")
    let filtered = filterFaces(responses)
    filtered = leastLikely(filtered)
    res.json(filtered)
  } catch(err) {
    next(err)
  }
})

router.get('/self/comments', async (req, res, next) => {
  try {
    const insta = await getInsta(req.user.accessToken)
    let comments = await getComments(insta.data, req.user.accessToken)
    comments = filterEmpty(comments)
    comments = {
    "document":{
      "type":"PLAIN_TEXT",
      "language": "EN",
      "content":comments
    },
    "encodingType":"UTF8"
   }
    const { data } = await axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyATsYyW-tNsA3beM3M5bM7cXm2sO69sX14`, comments)
    const sentiment = getSentiment(data)
    comments = { Score: data.documentSentiment.score, Sentiment: sentiment }
    res.json(comments)
  } catch(err) {
    next(err)
  }
})

router.get('/tags/:name', async (req, res, next) => {
  try {
    const tagInfo = await axios.get(`https://api.instagram.com/v1/tags/${req.params.name}?access_token=${req.user.accessToken}`)
    res.json(tagInfo.data)
  } catch(err) {
    next(err)
  }
})


