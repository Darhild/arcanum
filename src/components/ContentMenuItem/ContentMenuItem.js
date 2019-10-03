import React, { Component } from 'react';
import { connect } from 'react-redux'
import './ContentMenuItem.css';
import { showContent } from './../../actions';

class ContentMenuItem extends Component { 
  render() {
    const { data, appContent, showContent } = this.props;

    return (
      <div onClick={() => showContent(data)} className={ data === appContent ? 'ContentMenu-Item ContentMenu-Item_state_active' : 'ContentMenu-Item' }>
        { data }
      </div>
    )
  }    
}

const mapStateToProps = (state) => {
  return {
    appContent: state.isShown
  }
}

const mapDispatchToProps = {
  showContent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentMenuItem);