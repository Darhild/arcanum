import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import './ContentMenuItem.css';
import { showContent } from './../../actions';

const ContentMenuItem = ({ data, appContent, history }) => {

  return <div className={ data === appContent ? 'ContentMenu-Item ContentMenu-Item_state_active' : 'ContentMenu-Item' }
          onClick={() => {
            history.push(`/${data}`);
            showContent(data);
          }} 
         >
          { data }
        </div>    
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
)(withRouter(ContentMenuItem));