import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import IconPlus from '../IconPlus';
import { fetchData } from '../../actions';
import { StoreState, Repository } from '../../types';
import { CommitInfo } from '../../server/formatters';

const cnFileName = cn('FileName');

interface RepoId {
  repositoryId: string
}

interface StateProps {
  selectedRepo: Repository
}

interface OwnProps extends RouteComponentProps<RepoId> {
  file: CommitInfo,
  classes?: Array<string>
}

interface DispatchProps {
  fetchData: (url: string) => void
}

type FileNameprops = StateProps & OwnProps & DispatchProps;

class FileName extends Component<FileNameprops> {
  onClick() {     
    let { match, history } = this.props;
    let { name, type } = this.props.file;
    
    let queryType = 'blob'; 

    if (type === 'folder') {
      queryType = 'tree';
      name += '/';
    } 

    if (match.path !== '/api/repos/' && history.location.pathname.indexOf('tree') === -1 && history.location.pathname.indexOf('blob') === -1) {
      const repo = match.params.repositoryId;    
      this.props.fetchData(`http://localhost:8080/api/repos/${repo}/${queryType}/master/${name}`);
      history.push(`${queryType}/master/${name}`);
    }

    else {      
      history.push(name);
      let pathname = history.location.pathname;  
      if (type === 'file') {
        pathname = history.location.pathname.replace('tree', 'blob');
        history.replace(pathname);
      }

      this.props.fetchData(`http://localhost:8080${pathname}`);
    }
  }

  render() {
    let { name, type } = this.props.file;

    return (
      <div className={cnFileName(null, this.props.classes)} onClick={ () => { this.onClick() } }>
        <IconPlus type={ type } iconClasses={['']} text={ name ? name : ''} />
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState) => {
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
)(FileName));