import React, { Component } from 'react';
import userHelpers from '../utils/userHelpers';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DiscoverResults from './DiscoverResults';
import discoverHelpers from '../utils/discoverHelpers';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:"",
      results: [],
      selectedOption:""
    };
  }

  // Use state.email from Auth0 to get MySQL user or create new user. Store user in state.user
  handleTouchTap = () => {
    discoverHelpers.findBooks(this.state.search).then((response)=>{
      console.log(response);
      this.setState({
        results:response
      })
      // console.log("RESULTS: "+this.state.results);
      console.log("SELECTED: "+this.selectedOption); 
    })
  }

  handleChange = (event) => {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
  handleOptionChange=(event)=>{
    this.setState({
      selectedOption:event.target.value
    })
   console.log("SELECTED: "+this.selectedOption); 
  }

  // Here we render the function
  render() {

    return (
      <div className="wrapper">
        <div className="row ">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <div className="row personalInfo">
              <div className="panel panel-primary discover" id="panelPrimary">
                <div className="panel-heading" id="panel">
                  <h3 className="panel-title">Discover New Books</h3>
                </div>
                <div className="panel-body">
                  <div>
                    <MuiThemeProvider>
                      <div className="radioButtons">
                      <RadioButtonGroup name="search" defaultSelected="Genre" className="buttons">
                        <RadioButton
                          value="author"
                          label="Author"
                          onClick={this.handleOptionChange}
                        />
                        <RadioButton
                          value="genre"
                          label="Genre"
                          onClick={this.handleOptionChange}
                        />
                      </RadioButtonGroup>
                      </div>
                    </MuiThemeProvider>
                    <input
                      value={this.state.search}
                      type="text"
                      className="form-control text-left"
                      placeholder="Search by genre or author!"
                      id="search"
                      onChange={this.handleChange}
                      required
                    />
                    <MuiThemeProvider>
                      <RaisedButton
                        label="Find a Book"
                        secondary={true}
                        onTouchTap={this.handleTouchTap}
                      />
                    </MuiThemeProvider>
                    <div>{this.state.results}</div>
                  </div>
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
export default Discover;