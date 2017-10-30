import axios from 'axios';

const userHelpers = {

	// Get a user's groups and discussions
	getUser: (email, nickname, photo) => {
		return axios.get('/api/users/' + email)
			.then(response => {
				return response;
			})
	},
	
	createUser:  (email, nickname, photo) => {
		var newUser = {
			email: email,
			nickname: nickname,
			photoRef: photo
		}
		return axios.post('/api/users/', newUser)
		.then(response => {
			return response;
		} )
	},

	updateUser: (id, favorite, current, photo) => {
 		var updateInfo = {};
		if (favorite !== '') {
			updateInfo['favoriteBook'] = favorite;
		}
		if (current !== '') {
			updateInfo['currentlyReading'] = current;
		}
		if (photo !== '') {
			updateInfo['photoRef'] = photo;
		}

		return axios.put("/api/users/"+id, updateInfo);
	},

	cloudinaryPhoto: (image) => {
		const cloudName = 'ruigrok';
		const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload';
	
		const formData = new FormData();
		formData.append("file", image);
		formData.append("upload_preset", "usuh6jax");
		formData.append("api_key", "495555397782837");
		formData.append("timestamp", (Date.now() / 1000) | 0);
	
		return axios.post(url, formData, {
		  headers: { "X-Requested-With": "XMLHttpRequest" },
		}).then(response => {
			return response;
		})
	}

}

export default userHelpers;



