import React, { Component } from 'react';
import './FileContentRow.css';

export default class FileContentRow extends Component {
  render() {
    return (
      <div class="FileContent-Row">        
        <div class="FileContent-Col FileContent-RowNum">{this.props.id}</div>
        <div class="FileContent-Col FileContent-RowContent">{this.props.content}</div>
      </div>      
    )
  }
}