import React, { Component } from 'react';
import IconPlus from './../IconPlus';
import './ContentTableRow.css';

export default class ContentTableRow extends Component {
  render() {
    const file = this.props.file;

    return (
      <div class="ContentTable-Row">
        <IconPlus classes={['ContentTable-Col', 'ContentTable-Col_name']} type={file.type} iconClasses={['']} text={file.name ? file.name : ''} />
        <div class="ContentTable-Col ContentTable-Col_commit"><span class="Link Link_color_accent">{file.lastCommit ? file.lastCommit : ''}</span></div>
        <div class="ContentTable-Col ContentTable-Col_message">{file.message ? file.message : ''}</div>
        <div class="ContentTable-Col ContentTable-Col_committer"> <span class="Link Link_user">{file.committer ? file.committer : ''}</span></div>
        <div class="ContentTable-Col ContentTable-Col_updated ContentTable-Col_last">{file.commitDate ? file.commitDate : ''}</div>
      </div>
    )
  }
}