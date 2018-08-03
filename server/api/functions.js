const colorAvg = (responseObj) => {
	const colors = responseObj.reduce((acc, curr) => {
		acc.red.push(curr.imagePropertiesAnnotation.dominantColors.color.red)
		acc.green.push(curr.imagePropertiesAnnotation.dominantColors.color.green)
		acc.blue.push(curr.imagePropertiesAnnotation.dominantColors.color.blue)
	}, {
		red: [],
		green: [],
		blue: []
	})
	const redAvg = colors.red.reduce((acc,curr) => acc + curr, 0)/colors.red.length 
	const greenAvg = colors.green.reduce((acc,curr) => acc + curr, 0)/colors.green.length
	const blueAvg = colors.blue.reduce((acc,curr) => acc + curr, 0)/colors.blue.length 
	return [redAvg, greenAvg, blueAvg]
}

// const mostProminentColors = (responseObj) => {
// 	return responseObj.map(response => {
// 		let max = 0;
// 		response.imagePropertiesAnnotation.dominantColors.colors.forEach(color => {
// 			 max = max === 0 ? color : (color.score > max.score ? color : max)
// 		})
// 		return max
// 	}
// }
// }