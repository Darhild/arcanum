import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
//import { shallowEqualArrays } from 'shallow-equal';
import { fetchData } from '../../actions';
import { showContent } from '../../actions';
import ContentMenu from '../ContentMenu';
import FileContent from '../FileContent';
import { StoreState } from '../../types';
import { IFileContent } from '../../server/app';

interface StateProps {
  content: IFileContent  
}

interface OwnProps extends RouteComponentProps {
  appContent: string
}

interface DispatchProps {
  fetchData: (url: string) => void,
  showContent: (data: string) => void
}

type FileProps = StateProps & OwnProps & DispatchProps;

class File extends Component<FileProps> {
  componentDidMount() {
    this.props.fetchData(`http://localhost:8080${this.props.history.location.pathname}`);
    this.props.showContent('details');
  }

  componentDidUpdate(prevProps: FileProps) {
    /*
    if (shallowEqualArrays(this.props.content, prevProps.content)) {
      this.props.fetchData(`http://localhost:8080${this.props.history.location.pathname}`)
    };*/

    this.props.fetchData(`http://localhost:8080${this.props.history.location.pathname}`)
  }

  renderContent() {
    switch (this.props.appContent) { 
      case 'history':
        return null;    
        
      default:  
        return <FileContent/> 
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

const mapStateToProps = (state: StoreState) => {
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