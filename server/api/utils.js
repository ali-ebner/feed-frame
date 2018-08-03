const axios = require('axios')
async function getRes(data, featureType) {
	let responses =  
    await Promise.all(data.data.map(async entry => {
      let request = {
      "requests":[
        {
          "image":{
            "source":{
              "imageUri": `${entry.images.standard_resolution.url}`            
            }
          },
          "features":[
            {
              "type":`${featureType}`,
              "maxResults":5
            }
          ]
        }]}
        let response =  await axios.post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyATsYyW-tNsA3beM3M5bM7cXm2sO69sX14", request)
        return response.data
    }))

    return responses
  }

  async function getInsta(accessToken) {
  	const { data } = await axios.get(`https://api.instagram.com/v1/users/self/media/recent?access_token=${accessToken}`)
  	return data
  }

  const traverse = (nestedArr) => {
  	let labels = []
  	nestedArr.forEach(innerArr => {
  		console.log("innerArr", innerArr)
  		innerArr = innerArr && innerArr.map(obj => {
  			if(obj.description!==null) return obj.description 
  		})
  		labels = labels.concat(innerArr)
  	})
  	return labels
  }

  module.exports = {
  	getRes,
  	getInsta,
  	traverse
  }