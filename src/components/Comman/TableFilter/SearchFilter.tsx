import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import TableFilter from './TableFilter';
import { InputRef } from 'antd/es/input'; // Import InputRef type

interface SearchFilterProps {
  onSearch: (payload: { search: string; filter: string }) => void;
  showAdvance?: boolean;
  searchTitle?: string;
  filterList?: any;
  isBackButton?: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, showAdvance = true, searchTitle = 'Name', isBackButton = false }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined);
  const inputRef = useRef<InputRef>(null); // Use InputRef type from Ant Design

  const getValueBasedOnKey = (value: string) => {
    switch (value) {
      case 'successful-clients': {
        return {
          outcome: 'success'
        }
      }
      case 'all-selected': {
        return {
          
        }
      }
      case 'successful-referrer': {
        return {
          isRegistered: 1
        }
      }
      case 'unsuccessful-clients': {
        return {
          outcome: 'fail'
        }
      }
      case 'unsuccessful-referrer': {
        return {
          isRegistered: 0
        }
      }
      case 'businessIRefer': {
        return {
          businessIRefer: 1
        }
      }
      case 'paid-offer': {
        return {
          outcome: 'success'
        }
      }
      case 'outstanding-payees': {
        return {
          outcome: 'pending'
        }
      }
      case 'outstanding-referrer': {
        return {
          outstanding: true
        }
      }
      case 'active': {
        return {
          isActive: 1
        }
      }
      case 'deactivated': {
        return {
          isActive: 0
        }
      }
      case 'inactive': {
        return {
          active:0
        }
      }
      case "activesms":{
        return {
          active:1
        }
      }
      default: {
        return {}
      }
    }
  }

  const handleSearch = (search: string, filter: string) => {
    const payload: any = { search, ...getValueBasedOnKey(filter) };
    onSearch(payload);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearInput = () => {
    setSearchValue('');
    handleSearch('', selectedFilter || '');
    inputRef.current?.focus(); // Keep focus after clearing input
  };

  const handleSelectChange = (value: string) => {
    setSelectedFilter(value);
    handleSearch(searchValue, value);
    inputRef.current?.focus(); // Keep focus after selecting
  };

  // Ensure the input is focused on mount
  useEffect(() => {
    // inputRef.current?.focus();
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <div className='search-filter-row'>

        <div className='column-search'>

          <Input
            ref={inputRef} // Use the ref correctly
            placeholder={`Search by ${searchTitle}`}
            value={searchValue}
            size="large"
            onChange={handleInputChange}
            style={{ width: '100%', height: '39px', marginRight: 10 }}
            // suffix={
            //   searchValue && (
            //     <CloseCircleOutlined style={{ cursor: 'pointer', color: 'red' }} onClick={handleClearInput} />
            //   )
            // }
            onPressEnter={() => handleSearch(searchValue, selectedFilter || '')}
          />
        </div>

         <div className='column-btn'>
         <div className='inner-div' style={{ width: '100%' }}>
          {showAdvance && (
            <TableFilter
              dataIndex="exportRegister"
              selectFilterHandler={handleSelectChange}
              label="Advance Filter"
            />
          )}
          {(isBackButton && selectedFilter) && <Button
            type="primary"
            style={{height: '39px', fontSize: '12px'}}
            className='btn btn-primary mx-2'
            // size="medium"
            onClick={() => {handleSearch('', ''); setSelectedFilter('')}}
          >
            Back
          </Button>}
          <Button
            type="primary"
            icon={<SearchOutlined />}
            className='btn btn-primary'
            // size="large"
            style={{height: '39px', fontSize: '12px'}}
            onClick={() => handleSearch(searchValue, selectedFilter || '')}
          >
            Search
          </Button>
        </div>
         </div>
      </div>

    </div>
  );
};

export default SearchFilter;
