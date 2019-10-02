import React, { Component } from 'react';
import Icon from './../Icon';
import './ContentTableRow.css';

export default class FilesContent extends Component {
  render() {
    const file = this.props.file;

    return (
      <div class="ContentTable-Row">
        <div class="ContentTable-Col ContentTable-Col_name Icon-plus">
          <Icon />
          <div class="Icon-plus-Text">${file.name ? file.name : ''}</div>
        </div>
        <div class="ContentTable-Col ContentTable-Col_commit"><span class="Link Link_color_accent">${file.lastCommit ? file.lastCommit : ''}</span></div>
        <div class="ContentTable-Col ContentTable-Col_message">${file.message ? file.message : ''}</div>
        <div class="ContentTable-Col ContentTable-Col_committer"> <span class="Link Link_user">${file.committer ? file.committer : ''}</span></div>
        <div class="ContentTable-Col ContentTable-Col_updated ContentTable-Col_last">${file.commitDate ? file.commitDate : ''}</div>
      </div>
    )
  }
}