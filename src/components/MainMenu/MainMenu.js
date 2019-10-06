import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InnerMenu from './../InnerMenu';
import './MainMenu.css';
import { selectRepo } from './../../actions';

class MainMenu extends Component {
  constructor(props) {
    super(props);    
    this.state = { 
      innerMenuIsOpen: false 
    };
    this.toggleInnerMenu = this.toggleInnerMenu.bind(this);    
  }

  selectRepo = (repo) => {
    this.setState((state) => ({
      ...state,
      innerMenuIsOpen: false
    }))

    this.props.selectRepo(repo);
  }

  toggleInnerMenu() {
    this.setState(state => ({
      innerMenuIsOpen: !state.innerMenuIsOpen
    }));
  }

  render() {
    return (
      <div className="MainMenu MainHeader-Menu"> 
        <div 
          className=
          { this.state.innerMenuIsOpen 
            ? 'MainMenu-Item MainMenu-Item_state_active'
            : 'MainMenu-Item' 
          }
          onClick={ this.toggleInnerMenu }
        >
          { this.props.selectedRepo.text }
        </div>
        { this.state.innerMenuIsOpen 
          ? <InnerMenu classes={['MainMenu-InnerMenu']} data={this.props.mainMenu} updateData={ this.selectRepo }/> 
          : ''
        }                     
      </div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    mainMenu: state.mainMenu,
    selectedRepo: state.selectedRepo
  }
}

const mapDispatchToProps = {
  selectRepo  
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu));