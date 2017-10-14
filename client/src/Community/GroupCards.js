import React, { Component } from 'react';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class GroupCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editOpen: false,
      leaveOpen: false,
      deleteOpen: false,

    };
  }

  //==== Leave a group ====
  leaveGroup = (groupId) => {
    this.props.leaveGroup(groupId);
  }

  //==== Edit a group ====
  handleEditOpen = () => {
    this.setState({ editOpen: true });
  }

  handleEditClose = () => {
    this.setState({ editOpen: false });
  }

  //==== Delete a group ====
  handleDeleteOpen = (groupId) => {
    this.setState({
      deleteOpen: true,
      selectedGroup: groupId
    });
  }

  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  }

  deleteGroup = () => {
    this.props.deleteGroup(this.state.selectedGroup);
    this.handleDeleteClose();
  }

  render() {

    const menuStyles = { float: "right" }

    const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseDelete}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        onClick={this.deleteGroup}
      />,
    ];

    let display;
    if (!this.props.groups.data || this.props.groups.data.length === 0) {
      display = (
        <div className="col s4 offset-s4">
          <Card style={{ marginTop: '30px', paddingRight:'20px'}}>
            <CardHeader title='Create or join groups to see them here' />
          </Card>
        </div>
      );
    } else {
      display = (
          <div className="row">
            {this.props.groups.data.map((group, i) => {

              return (
                <div className="col s4" key={i}>
                  <Card style={{ marginTop: '30px' }}>
                    <CardHeader
                      title={group.name}
                      titleStyle={{ fontSize: '22px' }}
                      subtitle={group.description}
                    />
                    <CardActions>
                      <FlatButton
                        label="Open Discussions"
                        onClick={() => this.props.selectGroup(group)}
                      />
                      <br />
                      <FlatButton label="See Members" />
                      <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        style={menuStyles}
                      >
                        <MenuItem primaryText="Delete Group" onTouchTap={() => this.handleDeleteOpen(group.id)} />
                        <MenuItem primaryText="Leave Group" onTouchTap={() => this.leaveGroup(group.id)} />
                        <MenuItem primaryText="Edit Group" onTouchTap={this.handleEditOpen} />
                      </IconMenu>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
          </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          {display}
        </div>

        <Dialog
          title="Delete Group?"
          actions={deleteActions}
          modal={false}
          open={this.state.deleteOpen}
          onRequestClose={this.handleDeleteClose}
        >
          Are you sure??? This will delete the group for all users.
        </Dialog>
      </div>

    );
  }
}

export default GroupCards