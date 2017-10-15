import axios from 'axios';

const libraryHelpers = {

	getBookImageTitle: (title) => {
		const apiKey = "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY";
		const queryURL= "https://www.googleapis.com/books/v1/volumes?q=intitle:"+ title +"&key=" + apiKey;
		return axios.get(queryURL).then(function(response){
			var returnedDisplay={
				returnedLink:response.data.items[0].volumeInfo.imageLinks.thumbnail,
				returnedTitle:response.data.items[0].volumeInfo.title
			}
			return returnedDisplay;
		});
	},

	saveBook: (title, author, comments, link, user) => {
		var newBook={
			title: title,
			author: author,
			comments: comments,
			link: link,
			UserId: user
		}
		return axios.post("/api/library", newBook);
	},

	showBooks: (id) => {
		return axios.get("/api/library/"+id);
	},

	modalInfo: (title) => {
		const apiKey = "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY";
		const queryURL= "https://www.googleapis.com/books/v1/volumes?q=intitle:"+ title +"&key=" + apiKey;
		return axios.get(queryURL).then(function(response){
			var results = response.data.items[0].volumeInfo;
			// console.log(results);
			var returnedBook = {
				title :  results.title,
				author : results.authors[0],
				rating : results.averageRating,
				description : results.description
			}
			return returnedBook;
		});
	},

	deleteBook: (id) => {
		return axios.delete("/api/library/"+id);
	},

	updateUserBooks: (id, favorite, current) => {
		var updateInfo={
			favoriteBook: favorite,
			currentlyReading: current
		};
		console.log(updateInfo);
		console.log("ID: "+id);
		return axios.put("/api/users/"+id, updateInfo);
	},

	getUserBooks: (email) => {
		return axios.get("/api/users/"+email);
	}
}

export default libraryHelpers;

