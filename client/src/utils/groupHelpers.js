import axios from 'axios';

const groupHelpers = {

  // Get a user's groups and discussions
  getGroups: (email) => {
    return axios.get('/api/groups/' + email)
      .then((response) => {
        return response;
      })
  },

  getAllGroups: () => {
    return axios.get('/api/allgroups')
    .then((response) => {
      return response;
    })
  },

  createGroup: (groupName, groupDescription, user) => {
    return axios.post('/api/groups', {
      name: groupName,
      description: groupDescription,
      user: user
    }).then((response) => {
      return response;
    })
  },

  leaveGroup: (groupId, user) => {
    return axios.delete('/api/groups/' + groupId + "/" + user)
      .then((response) => {
        return response;
      })
  },

  deleteGroup: (groupId) => {
    return axios.delete('/api/groups/' + groupId)
      .then((response) => {
        return response;
      })
  },

  joinGroup: (groupId, user) => {
    return axios.post('/api/groups/' + groupId + '/users/' + user) 
    .then((response) => {
      return response;
    })
  }


}

// Export the API helper
export default groupHelpers;



