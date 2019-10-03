import React, { Component } from 'react';
import ContentTableRow from './../ContentTableRow';
import './FilesContent.css';

export default class FilesContent extends Component {
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