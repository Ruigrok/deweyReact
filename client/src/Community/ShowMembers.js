import React, { Component } from 'react';
import groupHelpers from '../utils/groupHelpers';

class ShowMembers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupMembers: []
    };
  }

  getMembers = () => {
    groupHelpers.getMembers(this.props.group.id)
      .then(data => {
        this.setState({ groupMembers: data })
      })
  }

  componentDidMount() {
    this.getMembers();
  }

  render() {

    let display;
     if (this.state.groupMembers.data !== undefined) {
      display = (
        <div className="row">
          {this.state.groupMembers.data.map((user, i) => {
              return (
                <div className="col-sm-3 about text-center" key={i}>
                  <div className="row personalInfo">
                    <div className="panel panel-primary" id="panelPrimary">
                      <div className="panel-heading" id="panel">
                        <h3 className="panel-title">{user.nickname}</h3>
                      </div>
                      <div className="panel-body">
                        <img src={user.photoRef} id="personalPicture" alt="user" />
                        <div id="personalInfo">
                          <p><strong>Favorite Book: </strong>{user.favoriteBook}</p>
                          <p><strong>Currently Reading: </strong>{user.currentlyReading}</p>
                        </div>

                      </div>
                    </div>
                  </div>
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
      </div>
    )
  }

}

export default ShowMembers;