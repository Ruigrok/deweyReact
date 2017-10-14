import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';


class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  createGroup = () => {
    this.props.createGroup(this.state.groupName, this.state.groupDescription)
    this.handleRequestClose();
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  handleTouchTap = () => {
    this.setState({ open: true });
  }

  handleChange = (event) => {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }


  render() {
    const standardActions = (
      <FlatButton
        label="Create"
        primary={true}
        onTouchTap={this.createGroup}
      />
    );

    return (
      <div>
        <Dialog
          open={this.state.open}
          title="Create a New Group"
          actions={standardActions}
          onRequestClose={this.handleRequestClose}
          autoScrollBodyContent={true}
        >
          <input
            value={this.state.title}
            type="text"
            className="form-control text-left"
            placeholder="Group Name"
            id="groupName"
            onChange={this.handleChange}
            required
          />
          <input
            value={this.state.description}
            type="text"
            className="form-control text-left"
            placeholder="Group Description"
            id="groupDescription"
            onChange={this.handleChange}
          />
        </Dialog>

        <RaisedButton
          label="Create a Group"
          secondary={true}
          fullWidth={true}
          icon={<FontIcon className="material-icons">add</FontIcon>}
          onTouchTap={this.handleTouchTap}
        />
      </div>
    )
  }

}

export default CreateGroup;