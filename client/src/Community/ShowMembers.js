import React, { Component } from 'react';
import groupHelpers from '../utils/groupHelpers';
import { Card, CardHeader } from 'material-ui/Card';

class ShowMembers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupMembers: []
    };
  }

  getMembers = () => {
    groupHelpers.getMembers(this.props.group.id)
      .then((data) => {
        this.setState({
          groupMembers: data
        })
      })
  }

  componentDidMount() {
    this.getMembers();
  }

  render() {

    let display;
     if (this.state.groupMembers.data === undefined) {
      display = (
        <div className="col s4 offset-s4">
          <Card style={{ marginTop: '30px', paddingRight: '20px' }}>
            <CardHeader title="There's no one here!" />
          </Card>
        </div>
      );
    } else {
      
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
                          <p><strong>Favorite Book: </strong>{user.myFavorite}</p>
                          <p><strong>Currently Reading: </strong>{user.myCurrent}</p>
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