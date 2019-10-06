import React from 'react';
import { connect } from 'react-redux'
import { showContent } from './../../actions';

const ContentMenuItem = ({ item, appContent, showContent }) => {
  return  <div className={ item === appContent ? 'ContentMenu-Item ContentMenu-Item_state_active' : 'ContentMenu-Item' }
            onClick={ () => { showContent(item) } }>
            { item }
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
)(ContentMenuItem);