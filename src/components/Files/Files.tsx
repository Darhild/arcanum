import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import _ from 'lodash';
import { fetchData } from '../../actions';
import ContentMenu from '../ContentMenu';
import FilesContent from '../FilesContent';
import BranchesContent from '../BranchesContent';
import Folders from '../Folders';
import { StoreState } from '../../types';
import { CommitInfo } from '../../server/formatters';

interface StateProps {
  content: Array<CommitInfo>
}

interface OwnProps extends RouteComponentProps {
  appContent: string
}

interface DispatchProps {
  fetchData: (url: string) => void,
  showContent: (data: string) => void
}

type FilesProps = StateProps & OwnProps & DispatchProps;

class Files extends Component<FilesProps> {
  componentDidMount() {
    this.props.fetchData(`http://localhost:8080${this.props.history.location.pathname}`);
  }

  componentDidUpdate(prevProps: FilesProps) { 
    if (!_.isEqual(this.props.content, prevProps.content)) {      
      this.props.fetchData(`http://localhost:8080${this.props.history.location.pathname}`)
    };
  }

  renderContent() {
    switch (this.props.appContent) { 
      case 'branches':
        return <BranchesContent />    
        
      default:
        if (this.props.content && Array.isArray(this.props.content)) {
          if (this.props.content.some((item) => item.committer || item.message || item.lastCommit)) {
            return <FilesContent content={ this.props.content } />
          }    
          return <Folders content={ this.props.content }/> 
        }
        return null;
      }
  }
    
  render() {
    return (
      <>
        <ContentMenu items={['files', 'branches']}/>
        { this.renderContent() }          
      </>
    )
  }  
}

const mapStateToProps = (state: StoreState) => {
  return {
    content: state.content,
    appContent: state.isShown
  }
}

const mapDispatchToProps = {
  fetchData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Files));