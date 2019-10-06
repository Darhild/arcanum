import React from 'react';
import IconPlus from './../IconPlus';

const BranchesRow = ({ branch }) => {
  return (
    <div className='ContentTable-Row'>
      <div className='ContentTable-Col ContentTable-Col_name'>
        <IconPlus type="branch" iconClasses={['']} text={branch.name ? branch.name : ''} />          
      </div>
      <div className='ContentTable-Col ContentTable-Col_last'> <span className='Link Link_color_accent'>{branch.hash ? branch.hash : ''}</span></div>
    </div>
  )
}

export default BranchesRow;