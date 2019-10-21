import React from 'react';
import { connect } from 'react-redux'
import { showContent } from '../../actions';
import { StoreState } from '../../types';

interface OwnProps {
  item: string,
  appContent: string
}

interface DispatchProps {
  showContent: (data: string) => void
}

type ContentMenuItemProps = OwnProps & DispatchProps;

const ContentMenuItem = ({ item, appContent, showContent }: ContentMenuItemProps) => {
  return  <div className={ item === appContent ? 'ContentMenu-Item ContentMenu-Item_state_active' : 'ContentMenu-Item' }
            onClick={ () => { showContent(item) } }>
            { item }
          </div>    
}    

const mapStateToProps = (state: StoreState) => {
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