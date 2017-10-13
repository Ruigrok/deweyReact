import axios from 'axios';

const userHelpers = {

	// Get a user's groups and discussions
	getUser: (email) => {
		return axios.get('/api/users/' + email)
			.then((response) => {
				return response;
			})
    },
    

}

// Export the API helper
export default userHelpers;



