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

  async function getComments( data, accessToken) {
  	let responses = await Promise.all(data.map(async entry => {
  		let response = await axios.get(`https://api.instagram.com/v1/media/${entry.id}/comments?access_token=${accessToken}`)
  		return response.data.data.map( el => el.text)
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
  		innerArr = innerArr && innerArr.map(obj => {
  			if(obj.description!==null) return obj.description 
  		})
  		labels = labels.concat(innerArr)
  	})
  	return labels
  }

  const filterFaces = responses => {
  	let filtered = responses.map(response => {
         if(response.responses[0].faceAnnotations)
          return response.responses[0].faceAnnotations[0]
      }
    )
    filtered.forEach(response => {
      if(response) {
        delete response.landmarks
        delete response.boundingPoly
        delete response.fdBoundingPoly
        delete response.rollAngle
        delete response.panAngle
        delete response.detectionConfidence
        delete response.landmarkingConfidence
        delete response.tiltAngle
      }
  })
    return filtered
}

const mostLikely = faces => {
	let obj = {
		joyLikelihood: 0,
		sorrowLikelihood: 0,
		angerLikelihood: 0,
		surpriseLikelihood: 0
	}
	let keys = Object.keys(obj)
	for (var i = 0; i < faces.length; i++) {
		let currentObj = faces[i]
		for (var j = 0; j < keys.length; j++) {
			if (currentObj!==undefined && ( currentObj[keys[j]] === "VERY_LIKELY" || currentObj[keys[j]] === "LIKELY" || currentObj[keys[j]] === "POSSIBLE")) {
				obj[keys[j]]++
			}
		}
	}
	for(let key in obj){
		if(obj.hasOwnProperty(key))
		obj[key[0].toUpperCase()+key.slice(1, key.indexOf("L"))] = obj[key]
		delete obj[key]
	}
	return obj
}

const leastLikely = faces => {
	let obj = {
		joyLikelihood: 0,
		sorrowLikelihood: 0,
		angerLikelihood: 0,
		surpriseLikelihood: 0
	}
	let keys = Object.keys(obj)
	for (var i = 0; i < faces.length; i++) {
		let currentObj = faces[i]
		console.log(currentObj)
		for (var j = 0; j < keys.length; j++) {
			if (currentObj!==undefined && ( currentObj[keys[j]] === "VERY_UNLIKELY" || currentObj[keys[j]] === "UNLIKELY")) {
				obj[keys[j]]++
			}
		}
	}
	for(let key in obj){
		if(obj.hasOwnProperty(key))
			console.log("key", key)
		obj[key[0].toUpperCase()+key.slice(1, key.indexOf("L"))] = obj[key]
		delete obj[key]
	}
	return obj
}

const toHex = rgb => `#`+(rgb.red.toString(16))+((rgb.green).toString(16))+((rgb.blue).toString(16))

const colorsToHex = colors => colors.map(colorObj => toHex(colorObj))

const filterEmpty = data => {
	let filtered = data.filter(entry => entry.length > 0)
	return filtered.reduce( (acc, curr) => acc.concat(curr), []).reduce((acc, curr) => acc + curr, '')
}

const getSentiment = data => {
	const score = data.documentSentiment.score
	if ( score > 0.1 && score <= 0.5 ) {
		return "Slightly Positive"
	}
	else if (score > 0.5 ) {
		return "Strongly Positive"
	}
	else if (score >= -0.5 && score < 0 ) {
		return "Slightly Negative"
	}
	else if (score < -0.5 ) {
		return "Strongly Negative"
	}
	else return "Neutral"
}


  module.exports = {
  	getRes,
  	getInsta,
  	traverse,
  	filterFaces,
  	mostLikely,
  	leastLikely,
  	colorsToHex,
  	getComments,
  	filterEmpty,
  	getSentiment
  }