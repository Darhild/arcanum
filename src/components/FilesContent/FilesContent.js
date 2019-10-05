import React, { Component } from 'react';
import ContentTableRow from './../ContentTableRow';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchData } from './../../actions';
import './FilesContent.css';

class FilesContent extends Component {
  componentDidMount() {
    this.props.fetchData(`http://localhost:8000${this.props.history.location.pathname}`);
  }

  render() { 
    return (
      <div class="Main-InnerContent">
        <div class="ContentTable">
          <div class="ContentTable-Row ContentTable-Head">
            <div class="ContentTable-Col">Name</div>
            <div class="ContentTable-Col">Last commit</div>
            <div class="ContentTable-Col">Commit message</div>
            <div class="ContentTable-Col">Committer</div>
            <div class="ContentTable-Col ContentTable-Col_last">Updates</div>
          </div>
          { this.props.content 
            ? this.props.content.map(file => <ContentTableRow file={file} />) 
            : null 
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.content
  }
}

const mapDispatchToProps = {
  fetchData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FilesContent));