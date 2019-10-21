import React from 'react';
import { Repository } from '../../types';

interface InnerMenuItemProps {
  item: Repository;
  updateData: (value: Repository) => void
}

const InnerMenuItem = ({ item, updateData }: InnerMenuItemProps) => {
  return <div className="InnerMenu-Item" onClick={() => updateData(item) }> { item.text } </div>
}

export default InnerMenuItem;