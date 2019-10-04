import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconPlus from './../IconPlus';
import './ContentTableRow.css';
import { fetchData } from './../../actions';

class ContentTableRow extends Component {
  onClick() {      
    let { match, history } = this.props;
    let { name, type } = this.props.file;

    console.log(this.props);
    console.log(name);

    let query = history.location.pathname;
    let queryType = 'blob'; 
    let dataType = 'file';

    if (type === 'folder') {
      query += '/';
      queryType = 'tree';
      dataType = 'files'
    } 

    history.push(`${query}${name}`);

    if (query === '/api/repos/') {
      this.props.fetchData(`http://localhost:8000/api/repos/${name}`, 'files');
    }

    else {
      let repo = match.params.repositoryId;
      console.log(`http://localhost:8000/api/repos/${repo}/${queryType}/master/${query}${name}`);

      this.props.fetchData(`http://localhost:8000/api/repos/${repo}/${queryType}/master/${query}${name}`, `${dataType}`);
    }
  }

  render() {
    const { file } = this.props;    

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

const mapStateToProps = (state) => {
  return {
    selectedRepo: state.selectedRepo
  }
}

const mapDispatchToProps = {
  fetchData
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentTableRow));