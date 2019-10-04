import React, { Component } from 'react';
import ContentTableRow from './../ContentTableRow';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchData } from './../../actions';
import './FilesContent.css';

class FilesContent extends Component {
  componentDidMount() {
    if(!this.props.files.length) this.props.fetchData(`http://localhost:8000/api/repos`, 'files');
  }

  render() { 
    return (
      <div class="ContentTable">
        <div class="ContentTable-Row ContentTable-Head">
          <div class="ContentTable-Col">Name</div>
          <div class="ContentTable-Col">Last commit</div>
          <div class="ContentTable-Col">Commit message</div>
          <div class="ContentTable-Col">Committer</div>
          <div class="ContentTable-Col ContentTable-Col_last">Updates</div>
        </div>
        { this.props.files 
          ? this.props.files.map(file => <ContentTableRow file={file} />) 
          : null 
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.files,
    appContent: state.isShown
  }
}

const mapDispatchToProps = {
  fetchData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FilesContent));