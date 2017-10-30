import React, { Component } from 'react';
import userHelpers from '../utils/userHelpers';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LibraryResults from './LibraryResults';
import libraryHelpers from '../utils/libraryHelpers';
import Dropzone from 'react-dropzone';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: "",
      comments: "",
      results: [],
      user: "",
      email: null,
      photoRef: "",
      nickname: "",
      profileOpen: false,
      favoriteBook: "",
      currentlyReading: "",
      newPhoto: "",
      newFavBook: "",
      newCurrRead: ""
    };
  }

  getUser() {
    userHelpers.getUser(this.state.email)
      .then(result => {
        if (result.data != null) {
          this.setState({
            user: result.data,
            favoriteBook: result.data.favoriteBook,
            currentlyReading: result.data.currentlyReading,
            photoRef: result.data.photoRef
          }, this.getLibrary);
        } else {
          userHelpers.createUser(this.state.email, this.state.nickname, this.state.photoRef)
            .then(result => {
              this.setState({
                user: result.data
              }, this.getLibrary);
            })
        }
      })
  }

  getLibrary = () => {
    libraryHelpers.showBooks(this.state.user.id).then(function (response) {
      this.setState({ results: response.data })
    }.bind(this))
  }

  // Get the user profile from Auth0. Store the email in state.email
  componentDidMount() {
    let self = this;
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          email: profile.email,
          photoRef: profile.picture,
          nickname: profile.nickname
        }, self.getUser);
      });
    } else {
      this.setState({
        email: userProfile.email,
        photoRef: userProfile.picture,
        nickname: userProfile.nickname,
      }, self.getUser);
    }
  }

  handleRequestClose = () => {
    this.setState({ open: false });
    libraryHelpers.getBookImageTitle(this.state.title).then(function (data) {
      libraryHelpers.saveBook(data.returnedTitle, data.returnedAuthor, this.state.comments, data.returnedLink, this.state.user.id);
      libraryHelpers.showBooks(this.state.user.id).then(function (response) {
        this.setState({
          results: response.data
        })
      }.bind(this))
    }.bind(this))
  }

  handleEditRequestClose = () => {
    this.setState({ profileOpen: false });
  }

  editProfile = () => {
    let self = this;
    userHelpers.updateUser(this.state.user.id, this.state.newFavBook, this.state.newCurrRead, this.state.newPhoto)
      .then(() => {
        self.getUser();
        self.handleEditRequestClose();
      })
  }

  handleTouchTap = () => {
    this.setState({ open: true });
  }

  handleEditTouchTap = () => {
    this.setState({
      profileOpen: true,
      newPhoto: '',
      newFavBook: '',
      newCurrRead: ''
    });
  }

  handleChange = (event) => {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleDrop = files => {
    const image = files[0];
    userHelpers.cloudinaryPhoto(image)
      .then(response => {
        this.setState({ newPhoto: response.data.secure_url })
      })
  }

  // Here we render the function
  render() {
    const standardActions = (
      <FlatButton
        label="Add"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );
    const editActions = (
      <FlatButton
        label="Update"
        primary={true}
        onTouchTap={this.editProfile}
      />
    );

    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-sm-3 about">
            <div className="row personalInfo">
              <div className="panel panel-primary" id="panelPrimary">
                <div className="panel-heading" id="panel">
                  <h3 className="panel-title">{this.state.nickname}</h3>
                </div>
                <div className="panel-body">
                  <img src={this.state.user.photoRef} id="personalPicture" alt="user" />
                  <div id="personalInfo">
                    <p><strong>Favorite Book: </strong>{this.state.favoriteBook}</p>
                    <p><strong>Currently Reading: </strong>{this.state.currentlyReading}</p>
                  </div>
                  <MuiThemeProvider>
                    <div>
                      <Dialog
                        open={this.state.profileOpen}
                        title="Edit Profile"
                        actions={editActions}
                        onRequestClose={this.handleEditRequestClose}
                        autoScrollBodyContent={true}
                      >
                        <div className='col-sm-12'>
                          <div className='row'>
                            <div className='col-sm-5'>
                              <Dropzone
                                onDrop={this.handleDrop}
                                accept="image/*"
                              />
                            </div>
                            <div className='col-sm-5'>
                              <img src={this.state.newPhoto} alt='Upload Photo' />
                            </div>
                          </div>
                        </div>

                        <input
                          value={this.state.newFavBook}
                          type="text"
                          className="form-control text-left"
                          placeholder="My Favorite Book"
                          id="newFavBook"
                          onChange={this.handleChange}
                          required
                        />
                        <input
                          value={this.state.newCurrRead}
                          type="text"
                          className="form-control text-left"
                          placeholder="Currently Reading..."
                          id="newCurrRead"
                          onChange={this.handleChange}
                          required
                        />
                      </Dialog>
                      <a onTouchTap={this.handleEditTouchTap} id="editLink">Edit</a>
                    </div>
                  </MuiThemeProvider>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-9 bookList">
            <div className="panel panel-primary" id="panelPrimary">
              <div className="panel-heading" id="panel">
                <h3 className="panel-title">Bookshelf</h3>
              </div>
              <div className="panel-body">
                <MuiThemeProvider>
                  <div>
                    <Dialog
                      open={this.state.open}
                      title="Add a Book"
                      actions={standardActions}
                      onRequestClose={this.handleRequestClose}
                      autoScrollBodyContent={true}
                    >
                      <input
                        value={this.state.title}
                        type="text"
                        className="form-control text-left"
                        placeholder="Title"
                        id="title"
                        onChange={this.handleChange}
                        required
                      />
                      <input
                        value={this.state.comments}
                        type="text"
                        className="form-control text-left"
                        placeholder="Comments"
                        id="comments"
                        onChange={this.handleChange}
                        required
                      />
                    </Dialog>
                    <RaisedButton
                      label="Add a Book"
                      secondary={true}
                      onTouchTap={this.handleTouchTap}
                    />
                  </div>
                </MuiThemeProvider>
                <div>
                  <LibraryResults results={this.state.results} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// Export the component back for use in other files
export default Library;