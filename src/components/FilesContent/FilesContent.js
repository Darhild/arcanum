import React, { Component } from 'react';
import ContentTableRow from './../ContentTableRow';
import './FilesContent.css';

export default class FilesContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        {
          "name": "api",
          "type": "folder",
          "lastCommit": "d53dsv",
          "message": "[vcs] move http to arc",
          "committer": "noxoomo",
          "commitDate": "4 s ago"
        },
        {
          "name": "ci",
          "type": "folder",
          "lastCommit": "f5jdsv",
          "message": "ARCADIA-771: append /trunk/arcadia/",
          "committer": "annaveronika",
          "commitDate": "Dec 29, 2018"
        },
        {
          "name": "lib",
          "type": "folder",
          "lastCommit": "d53dsv",
          "message": "[vcs] move http to arc",
          "committer": "noxoomo",
          "commitDate": "4 s ago"
        },
        {
          "name": "Readme.md",
          "type": "file",
          "lastCommit": "m87aa7",
          "message": "change readme.md",
          "committer": "anakin_skywalker",
          "commitDate": "Sep 15, 2019"
        }  
      ]
    };
  }

  renderContent() {
    return this.state.files.map(file => <ContentTableRow file={file} />
  }

  render() { 
    return (
      <div class="ContentTable">
        <div class="ContentTable-Row Content-table-Head">
          <div class="ContentTable-Col">Name</div>
          <div class="ContentTable-Col">Last commit</div>
          <div class="ContentTable-Col">Commit message</div>
          <div class="ContentTable-Col">Committer</div>
          <div class="ContentTable-Col ContentTable-Col_last">Updates</div>
        </div>
        {  this.renderContent() };
      </div>
    )
  }
}