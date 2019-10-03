import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilesContent from './../FilesContent';
import BranchesContent from './../BranchesContent';
import FileContent from './../FileContent';
import { fetchData } from './../../actions';

class Content extends Component {
  componentDidMount() {
    this.props.fetchData('http://localhost:8000/api/repos/my-repository', 'files');
  }

  showContent() {
    switch (this.props.appContent){  
      case 'file':
        return <FileContent />;       
      case 'branches':
        return <BranchesContent />;
      default:
        return <FilesContent files={this.props.files} />;
    }
  }
  
  render() {  
    return (
      <div class="Main-InnerContent">
        { this.showContent() }
      </div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    files: state.files,
    appContent: state.isShown
  }
}

const mapDispatchToProps = {
  fetchData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);