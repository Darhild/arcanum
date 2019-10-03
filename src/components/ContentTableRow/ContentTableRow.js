import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconPlus from './../IconPlus';
import './ContentTableRow.css';
import { fetchData } from './../../actions';

class ContentTableRow extends Component {
  onClick() {  
    console.log(this.props.file.name);
    this.props.fetchData(`http://localhost:8000/api/repos/my-repository/tree/master/files?dir[]=${this.props.file.name}`, 'files');
  }

  render() {
    const file = this.props.file;    

    return (
      <div class="ContentTable-Row">
        <div class="ContentTable-Col ContentTable-Col_name" onClick={ () => { this.onClick() } }>
          <IconPlus type={file.type} iconClasses={['']} text={file.name ? file.name : ''} />
        </div>        
        <div class="ContentTable-Col ContentTable-Col_commit"><span class="Link Link_color_accent">{file.lastCommit ? file.lastCommit : ''}</span></div>
        <div class="ContentTable-Col ContentTable-Col_message">{file.message ? file.message : ''}</div>
        <div class="ContentTable-Col ContentTable-Col_committer"> <span class="Link Link_user">{file.committer ? file.committer : ''}</span></div>
        <div class="ContentTable-Col ContentTable-Col_updated ContentTable-Col_last">{file.commitDate ? file.commitDate : ''}</div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchData
}

export default connect(
  null,
  mapDispatchToProps
)(ContentTableRow);