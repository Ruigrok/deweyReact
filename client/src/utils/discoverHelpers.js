import axios from 'axios';

const discoverHelpers = {
	findBookSubject: function(subject){
		const apiKey = "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY";
		const queryURL= "https://www.googleapis.com/books/v1/volumes?q=intitle:"+ subject +"&key=" + apiKey;
		return axios.get(queryURL).then(function(response){
			// console.log("subject: ",require('util').inspect(response.data.items,{depth:null}));
			var	returnedSubject=response.data.items;
			// console.log("RETURNED TITLE: "+returnedTitle);
			return returnedSubject;
		});
	},
		findBookAuthor: function(author){
		const apiKey = "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY";
		const queryURL= "https://www.googleapis.com/books/v1/volumes?q=inauthor:"+ author +"&key=" + apiKey;
		return axios.get(queryURL).then(function(response){
			// console.log("author: ",require('util').inspect(response.data.items,{depth:null}));
			var	returnedAuthor=response.data.items;
			// console.log("RETURNED TITLE: "+returnedTitle);
			return returnedAuthor;
		});
	}
}

export default discoverHelpers;