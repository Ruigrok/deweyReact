import axios from 'axios';

const discoverHelpers = {
	findBooks: function(search){
		const apiKey = "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY";
		const queryURL= "https://www.googleapis.com/books/v1/volumes?q=intitle:"+ search +"&key=" + apiKey;
		return axios.get(queryURL).then(function(response){
			// console.log("RESPONSE: ",require('util').inspect(response.data.items,{depth:null}));
			var	returnedTitle=response.data.items[0].volumeInfo.title;
			console.log("RETURNED TITLE: "+returnedTitle);
			return returnedTitle;
		});
	}
}

export default discoverHelpers;