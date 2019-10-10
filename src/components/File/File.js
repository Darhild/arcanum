import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { shallowEqualArrays } from 'shallow-equal';
import { fetchData } from './../../actions';
import { showContent } from './../../actions';
import ContentMenu from './../ContentMenu';
import FileContent from './../FileContent';

class File extends Component {
  componentDidMount() {
    this.props.fetchData(`http://localhost:8080${this.props.history.location.pathname}`);
    this.props.showContent('details');
  }

  componentDidUpdate(prevProps) {
    if (shallowEqualArrays(this.props.content, prevProps.content)) {
      this.props.fetchData(`http://localhost:8080${this.props.history.location.pathname}`)
    };
  }

  renderContent() {
    switch (this.props.appContent) { 
      case 'history':
        return null;    
        
      default:  
        return <FileContent content={ this.props.content }/> 
    }
  }
    
  render() {
    return (
      <>
        <ContentMenu items={['details', 'history']}/>
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
  fetchData,
  showContent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(File));