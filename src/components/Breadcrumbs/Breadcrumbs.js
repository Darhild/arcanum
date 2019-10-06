import React, { Component } from 'react';
import './Breadcrumbs.css';

export default class Breadcrumbs extends Component {
  render() {
    return (
      <div className="Breadcrumbs">
        <div className="Breadcrumbs-Wrapper">
          <div className="Breadcrumbs-Current">arcadia</div>
        </div>
      </div>
    )
  }
}