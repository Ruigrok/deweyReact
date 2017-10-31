import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import groupHelpers from '../utils/groupHelpers';
import GroupCards from './GroupCards.js';
import CreateGroup from './CreateGroup.js';
import JoinGroup from './JoinGroup.js';
import ShowMembers from './ShowMembers.js';
import Discussion from './Discussion';


class Community extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      selectedGroup: "",
      stepIndex: 0
    };
  }

  getGroups = () => {
    groupHelpers.getGroups(this.state.email)
      .then(data => {
        this.setState({ groups: data })
      })
  }

  // Get the user profile from Auth0. Store the email in state.email
  componentDidMount() {
    let self = this;
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          email: profile.email,
          nickname: profile.nickname,
          picture: profile.picture
        }, self.getGroups);

      });
    } else {
      this.setState({
        email: userProfile.email,
        nickname: userProfile.nickname,
        picture: userProfile.picture
      }, self.getGroups);
    }
  }

  createGroup = (groupName, groupDescription) => {
    groupHelpers.createGroup(groupName, groupDescription, this.state.email)
      .then(() => {
        this.getGroups();
      })
  }

  leaveGroup = (groupId) => {
    groupHelpers.leaveGroup(groupId, this.state.email)
      .then(() => {
        this.getGroups();
      })
  }

  deleteGroup = (groupId) => {
    groupHelpers.deleteGroup(groupId)
      .then(() => {
        this.getGroups();
      })
  }

  // Get all groups to display in JoinGroup component
  getAllGroups = () => {
    groupHelpers.getAllGroups()
      .then(data => {
        this.setState({
          allGroups: data,
          stepIndex: 0.5
        })
      })
  }

  // Join a group
  joinGroup = (groupId) => {
    groupHelpers.joinGroup(groupId, this.state.email)
      .then(() => {
        this.getAllGroups();
      })
  }

  returnToGroups = () => {
    this.setState({ stepIndex: 0 }, this.getGroups)
  }

  // Select a group for Discussion component
  showDiscussions = (group) => {
    this.setState({
      selectedGroup: group,
      stepIndex: 1
    })
  }

  // Select a group for ShowMembers component
  showMembers = (group) => {
    this.setState({
      selectedGroup: group,
      stepIndex: 2
    })
  }

  // Functions for step feature
  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <div className="col s12">
              <div className="col s4 offset-s4">
                <CreateGroup createGroup={this.createGroup} />
                <RaisedButton
                  label="Join a Group"
                  secondary={true}
                  fullWidth={true}
                  style={{ marginTop: 12 }}
                  icon={<FontIcon className="material-icons">group_add</FontIcon>}
                  onTouchTap={this.getAllGroups}
                />
              </div>
            </div>
            <GroupCards
              groups={this.state.groups}
              showDiscussions={this.showDiscussions}
              showMembers={this.showMembers}
              leaveGroup={this.leaveGroup}
              deleteGroup={this.deleteGroup}
            />
          </div>
        );
      case 0.5:
        return (
          <div>
            <div className="col s12">
              <div className="col s4 offset-s4">
                <RaisedButton
                  label="Return to Your Groups"
                  secondary={true}
                  fullWidth={true}
                  style={{ marginTop: 12 }}
                  icon={<FontIcon className="material-icons">keyboard_backspace</FontIcon>}
                  onTouchTap={() => this.returnToGroups()}
                />
              </div>
            </div>
            <JoinGroup
              joinGroup={this.joinGroup}
              groups={this.state.groups}
              allGroups={this.state.allGroups}
              user={this.state.email}
            />
          </div>
        );
      case 1:
        return (
          <Discussion group={this.state.selectedGroup} nickname={this.state.nickname} />
        );
      case 2:
        return (
          <ShowMembers group={this.state.selectedGroup} /> 
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const { stepIndex } = this.state;

    let displayStepper;
    if (stepIndex > 0.5) {
      displayStepper = (
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto', marginBottom: '30px' }}>

          <Stepper linear={false} activeStep={stepIndex}>
            <Step>
              <StepButton
                /* icon={<HomeIcon />} */
                onClick={() => this.setState({ stepIndex: 0 })}>
                Back to your groups page
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
                Group Discussions
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
                View Group Members
              </StepButton>
            </Step>
          </Stepper>

        </div>
      );
    } else {
      displayStepper = (
        <div style={{ minHeight: '30px' }}></div>
      );
    }

    return (
      <MuiThemeProvider>
        <div>
          {displayStepper}
          <div className="container">
            <div className="row">
              <div className="col 12">
                {this.getStepContent(stepIndex)}
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Community;