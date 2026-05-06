import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import UserMerchantFilter from '../../../layouts/common-components/UserMerchantFilter';

const UserMerchantList = () => {
  const { isLoading } = useSelector((state: any) => state.General);
  useEffect(() => {
    document.title = "Merchants | Snbla";
  }, []);
  return (
    <>
      <div className="flex flex-col tab:gap-8 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="tab:text-[28px] text-xl font-semibold text-black">
            Merchants List
          </h1>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E9EBF0] w-full">
          <div className="flex flex-col gap-8">
            <UserMerchantFilter />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserMerchantList
