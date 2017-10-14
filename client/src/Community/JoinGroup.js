import React, { Component } from 'react';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DoneIcon from 'material-ui/svg-icons/action/done';


class JoinGroup extends Component {

  render() {

    let display;
    if (!this.props.allGroups.data || this.props.allGroups.data.length === 0) {
      display = (
        <div className="col s4 offset-s4">
          <Card style={{ marginTop: '30px', paddingRight: '20px' }}>
            <CardHeader title='Create or join groups to see them here' />
          </Card>
        </div>
      );
    } else {
      display = (
        <div className="row">
          {this.props.allGroups.data.map((group, i) => {

            if (group.Users.filter(user => user.email === this.props.user).length > 0) {
              return (
                <div className="col s4" key={i}>
                  <Card style={{ marginTop: '30px', overflow: "hidden" }}>
                    <CardHeader
                      title={group.name}
                      titleStyle={{ fontSize: '22px' }}
                      subtitle={group.description}
                    />
                    <FloatingActionButton
                      disabled={true}
                      disabledColor={'#1fbcd2'}
                      style={{ float: 'right', margin: '10px' }} >
                      <DoneIcon />
                    </FloatingActionButton>
                  </Card>
                </div>
              );
            } else {
              return (
                <div className="col s4" key={i}>
                  <Card style={{ marginTop: '30px', overflow: "hidden" }}>
                    <CardHeader
                      title={group.name}
                      titleStyle={{ fontSize: '22px' }}
                      subtitle={group.description}
                    />
                    <FloatingActionButton
                      secondary={true}
                      onTouchTap={() => this.props.joinGroup(group.id)}
                      style={{ float: 'right', margin: '10px' }} >
                      <ContentAdd />
                    </FloatingActionButton>
                  </Card>
                </div>
              );
            }
          })}

        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          {display}
        </div>
      </div>
    )
  }

}

export default JoinGroup;