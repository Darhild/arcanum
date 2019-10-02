import React, { Component } from 'react';
import FilesContent from './../FilesContent';
import BranchesContent from './../BranchesContent';
import FileContent from './../FileContent';
import { throwStatement } from '@babel/types';

export default class Content extends Component {
  render() {
    return (
      <div class="Main-InnerContent">
        {switch (this.props.content){ 
          case 'FilesContent': 
          return <FilesContent/>
        }}
      </div>
    )
  }  
}