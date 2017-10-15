import axios from "axios";

const discussionHelpers = {
	// Get a specific Group's discussions
	getDiscussionsOfGroup: (groupId) => {
	  return axios.get("/api/groups/"+groupId+"/discussions")
	    .then(function(results){
	        return results;
	    })
	},

	// Create a discussion in database
	createDiscussion: (groupId, discName) => {
	  return axios.post("/api/groups/"+groupId+"/discussions", {name: discName})
	    .then(function(results){
	        return results;
	    })
	},

	// Update discussion name
	updateDiscussionName: (groupId, discussionId, chatName) => {
	  return axios.put("/api/groups/"+groupId+"/discussions/"+discussionId, {name: chatName})
	    .then(function(results){
	        return results;
	    })
	},

	// Delete discussion in database whenever a group member deletes it
	deleteDiscussion: (groupId, discussionId) => {
	    return axios.delete("/api/groups/"+groupId+"/discussions/"+discussionId)
	}

}

export default discussionHelpers;