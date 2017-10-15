import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import discussionHelpers from '../utils/discussionHelpers';

const divStyle = {
    textAlign: "center"
};

class CreateDiscussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        discName: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    discussionHelpers.createDiscussion(this.props.groupId, this.state.discName)
      .then(() => {
        this.props.getDiscussions();
        this.setState({ discName: "" });
      })
  }

  handleFormChange = (event) => {
    var newState={};
    newState[event.target.id]=event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div style={divStyle}>
        <h2>Create a new discussion!</h2>
        <TextField 
          value={this.state.discName}
          type="text"
          placeholder="Add Discussion"
          id="discName"
          onChange={this.handleFormChange}
          fullWidth={true}
          onSubmit={(event) => this.handleSubmit(event)}
         />
        <RaisedButton label="Submit" type="submit" primary={true} onClick={this.handleSubmit}/>
      </div>
    )
  }
}

export default CreateDiscussion;