import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FileContent.css';
import { fetchData } from './../../actions';
import { withRouter } from 'react-router-dom';
import IconPlus from './../IconPlus';
import Icon from './../Icon';
import FileContentRow from './../FileContentRow';

class FileContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: '4347'     
    };
  }

  componentDidMount() { 
    this.props.fetchData(`http://localhost:8000${this.props.history.location.pathname}`);
  }

  componentDidUpdate(prevProps) {    
    if (this.props.content !== prevProps.content) this.props.fetchData(`http://localhost:8000${this.props.history.location.pathname}`);
  }

  render() {
    if (this.props.content) {
      return (
        <div className="Main-InnerContent Main-InnerContent_p_t Main-InnerContent_width_full">
          <div className="FileContent">
            <div className="FileContent-Head">
              <IconPlus type='file' iconClasses={['']} text={this.props.content.fileName} />
              <div className="FileContent-Size">({this.state.size} bytes)</div>
              <div className="FileContent-Download">
                <Icon type="download" classes={['']} />
              </div>
            </div>
            <div className="FileContent-Content">
              { this.props.content.fileContent ? this.props.content.fileContent.map(string => <FileContentRow key={string.id} id={string.id} content={string.str} />)  : null }
            </div>   
          </div>
        </div>   
      )
    }

    return null;    
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.content
  }
}

const mapDispatchToProps = {
  fetchData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FileContent));
