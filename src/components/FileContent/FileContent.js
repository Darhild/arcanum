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
    console.log(`http://localhost:8000${this.props.history.location.pathname}`);
    this.props.fetchData(`http://localhost:8000${this.props.history.location.pathname}`);
  }

  componentDidUpdate() {
    console.log(`http://localhost:8000${this.props.history.location.pathname}`);
    this.props.fetchData(`http://localhost:8000${this.props.history.location.pathname}`);
  }

  render() {
    return (
      <div class="Main-InnerContent Main-InnerContent_p_t Main-InnerContent_width_full">
        <div class="FileContent">
          <div class="FileContent-Head">
            <IconPlus type='file' iconClasses={['']} text={this.props.content.fileName} />
            <div class="FileContent-Size">({this.state.size} bytes)</div>
            <div class="FileContent-Download">
              <Icon type="download" classes={['']} />
            </div>
          </div>
          <div class="FileContent-Content">
            { this.props.content.fileContent ? this.props.content.fileContent.map(string => <FileContentRow key={string.id} id={string.id} content={string.str} />)  : null }
          </div>   
        </div>
      </div>   
    )
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
