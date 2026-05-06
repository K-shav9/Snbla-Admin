import React, { useState } from 'react';
import { Select } from 'antd';
import './index.css';

interface FilterProps {
  dataIndex?: string;
  label?: string;
  selectFilterHandler?: any;
  filterList?: any;
}

const TableFilter: React.FC<FilterProps> = ({ selectFilterHandler }) => {

  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    // You can also call the filter submit function or perform other actions based on the selected value
    selectFilterHandler(value)
  };

  return (
      <Select
        style={{ height: '39px' }}
        className='advance-filter-select'
        placeholder="Advance Filter"
        onChange={handleSelectChange} // Add the change handler here
        value={selectedValue} // Optional: Control the value of the Select
      >
      </Select>
  );
};

export default TableFilter;
