import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { shallowEqualArrays } from 'shallow-equal';
import { fetchData } from './../../actions';
import ContentMenu from './../ContentMenu';
import FilesContent from './../FilesContent';
import BranchesContent from './../BranchesContent';
import Folders from './../Folders';

class Files extends Component {
  componentDidMount() {
    this.props.fetchData(`http://localhost:8000${this.props.history.location.pathname}`);
  }

  componentDidUpdate(prevProps) {    
    
    if (shallowEqualArrays(this.props.content, prevProps.content)) {
      console.log(shallowEqualArrays(this.props.content, prevProps.content));
      this.props.fetchData(`http://localhost:8000${this.props.history.location.pathname}`)
    };
  }

  renderContent() {
    switch (this.props.appContent) { 
      case 'branches':
        return <BranchesContent />    
        
      default:
        if (this.props.content) {
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

const mapStateToProps = (state) => {
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