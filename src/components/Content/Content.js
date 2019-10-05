import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilesContent from './../FilesContent';
import BranchesContent from './../BranchesContent';
import FileContent from './../FileContent';
import { fetchData } from './../../actions';

class Content extends Component {
  render() {  
    return (
      <Switch>
        <Route path="/api/repos/:repositoryId/blob" component={FileContent} />
        <Route path ="/api/repos/:repositoryId" component={FilesContent} />          
        <Route path ="/api/repos" component={FilesContent} />          
        <Route path="/branches" component={BranchesContent} />          
        <Redirect from='/' to='/api/repos/'/>          
      </Switch>  
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    files: state.files,
    appContent: state.isShown,
    selectedRepo: state.selectedRepo
  }
}

const mapDispatchToProps = {
  fetchData
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Content));