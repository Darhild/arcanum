import React, { Component } from 'react';
import FilesContent from './../FilesContent';
import BranchesContent from './../BranchesContent';
import FileContent from './../FileContent';
import { throwStatement } from '@babel/types';

export default class Content extends Component {
  showContent() {
    switch (this.props.appContent){         
      case 'branches':
        return <BranchesContent/>;
      default:
        return <FilesContent/>;
    }
  }
  render() {  
    return (
      <div class="Main-InnerContent">
        { this.showContent() }
      </div>
    )
  }  
}