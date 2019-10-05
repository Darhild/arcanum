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
    
    let queryType = 'blob'; 

    if (type === 'folder') {
      queryType = 'tree';
      name += '/';
    } 

    if (match.path !== '/api/repos' && history.location.pathname.indexOf('tree') === -1 && history.location.pathname.indexOf('blob') === -1) {
      const repo = match.params.repositoryId;    
      console.log(`http://localhost:8000/api/repos/${repo}/${queryType}/master/${name}`);  
      this.props.fetchData(`http://localhost:8000/api/repos/${repo}/${queryType}/master/${name}`);
      history.push(`${queryType}/master/${name}`);
    }

    else {      
      history.push(name);
      let pathname = history.location.pathname;  
      if (type === 'file') {
        pathname = history.location.pathname.replace('tree', 'blob');
        history.replace(pathname);
      }
      console.log(`http://localhost:8000${pathname}`);

      this.props.fetchData(`http://localhost:8000${pathname}`);

      console.log(history);
    }
  }

  render() {
    const { file } = this.props;   

    if(file) {
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

    return ( <div>
      Error!
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