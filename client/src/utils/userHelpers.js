import axios from 'axios';

const userHelpers = {

	// Get a user's groups and discussions
	getUser: (email, nickname, photo) => {
		return axios.get('/api/users/' + email)
			.then((response) => {
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
		.then((response) => {
			return response;
		} )
	}


}

export default userHelpers;



