import React, { Component } from 'react';
import './BranchesContent.css';
import BranchesRow from './../BranchesRow';

export default class BranchesContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      branches: [
        {
          "name": "users/a-aidyn00/my-feature-2",
          "hash": "6748ds893432438dsd823329d923482d",
        },
        {
          "name": "users/a-aidyn00/my-feature-3",
          "hash": "8748ds893432438dsd823329d923482d",
        }
      ]
    };
  }

  render() { 
    return (
      <div className="Main-InnerContent">
        <div className="ContentTable">
          <div className="ContentTable-Row ContentTable-Head">
            <div className="ContentTable-Col">Name</div>
            <div className="ContentTable-Col ContentTable-Col_last">Commit Hash</div>
          </div>
          { this.state.branches 
            ? this.state.branches.map(branch => <BranchesRow branch={ branch } key={ branch.name } />) 
            : null 
          }
        </div>
      </div>
    )
  }
}