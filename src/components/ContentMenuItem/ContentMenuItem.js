import React, { Component } from 'react';
import { connect } from 'react-redux'
import './ContentMenuItem.css';

class ContentMenuItem extends Component {
  onClick() {
    
  }

  render() {
    return (
      <div onClick={this.onClick} className={ this.props.data === this.props.appContent ? 'ContentMenu-Item ContentMenu-Item_state_active' : 'ContentMenu-Item'}>
        { this.props.data }
      </div>
    )
  }    
}

const mapStateToProps = (state) => {
  return {
    appContent: state.isShown
  }
}

export default connect(
  mapStateToProps
)(ContentMenuItem);



/*
export default class ContentMenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = { isActive: false };
  }

  onClick() {
    this.setState(state => ({
      isActive: !state.isActive
    }))  
  }

  render() {
    return (
      <div onClick={this.onClick} className={ this.state.isActive ? 'ContentMenu-Item ContentMenu-Item_state_active' : 'ContentMenu-Item'}>
        { this.props.data }
      </div>
    )
  }    
}
*/