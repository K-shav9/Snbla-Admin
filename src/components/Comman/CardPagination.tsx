import React from 'react';
import { Pagination } from 'antd';

const CardPagination = ({ activePage, total, handleChange }: any) => {
    return (
        <div className='custom-pagination'>
            <Pagination 
                current={activePage}
                pageSize={12}
                showTotal={(total, range) => {
                    return `${range[0]}-${range[1]} of ${total} items`
                }}
                defaultCurrent={activePage} 
                total={total} 
                onChange={handleChange} 
            />
        </div>
    )
};

export default CardPagination;