import React, { useEffect, useState } from "react";
import { getAllAdminMerchants } from "../../actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const UserMerchantFilter = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => state.General);
  const [merchants, setMerchants] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });

  const fetchMerchants = (roleId: number) => {
    const data = { page: pagination.currentPage, limit: pagination.pageSize };

    dispatch(getAllAdminMerchants({ roleId, ...data }))
      .then((response: any) => {
        if (response.status === 200) {
          // Set the merchants with the fetched data
          setMerchants(response?.data);

          // Handle pagination
          const paginationData = response?.pagination || {};
          setPagination({
            totalItems: paginationData?.totalItems,
            currentPage: paginationData?.currentPage,
            totalPages: Math.ceil(
              paginationData?.totalItems / pagination.pageSize
            ),
            pageSize: pagination.pageSize,
          });
        } else {
          console.error("Error fetching merchants", response);
          setMerchants([]);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching merchants", error);
        setMerchants([]);
      });
  };

  useEffect(() => {
    fetchMerchants(2);
  }, [pagination?.currentPage]);

  // Handle page change
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
      pageSize: pageSize, // Keeps the page size consistent for all pages
    }));
  };

  const handleMerchantPlan = (merchant: any) => {
    navigate("/user/merchant/offer", { state: { merchant } });
  };

  return (
    <>
      <section className=" xl:pb-secpadding tab:pb-96 pb-40">
        <div className="mx-auto container 2xl:max-w-screen-xl sm:px-5 px-2">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-screen w-screen">
              <Spin />
            </div>) : (
            <div>
              {/* Merchant Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 xl:grid-cols-4 gap-6">
                {merchants?.length > 0 ? (
                  merchants.map((merchant) => (
                    <div
                      key={merchant.id}
                      className="bg-white rounded-lg-lg overflow-hidden group rounded-2xl relative h-[200px] shadow-shadow cursor-pointer"
                      onClick={() => handleMerchantPlan(merchant)}
                    >
                      <div
                        className="absolute inset-0 z-10"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(36, 39, 48, 0.80) 100%)",
                        }}
                      ></div>
                      <img
                        src={merchant.image}
                        className="w-full object-cover group-hover:scale-105 transition-transform absolute h-full  "
                      />
                      <div className="pt-8 pb-6 px-6 relative z-10 h-full flex flex-col justify-center text-white">
                        <img
                          src={merchant.logo}
                          className="w-auto absolute left-0 right-0 mx-auto"
                        />
                        <div className="mt-auto text-sm flex items-center justify-between">
                          <span className="flex gap-1 items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M20 6.5H17.82C17.93 6.19 18 5.85 18 5.5C18 3.84 16.66 2.5 15 2.5C13.95 2.5 13.04 3.04 12.5 3.85L12 4.52L11.5 3.84C10.96 3.04 10.05 2.5 9 2.5C7.34 2.5 6 3.84 6 5.5C6 5.85 6.07 6.19 6.18 6.5H4C2.89 6.5 2.01 7.39 2.01 8.5L2 19.5C2 20.61 2.89 21.5 4 21.5H20C21.11 21.5 22 20.61 22 19.5V8.5C22 7.39 21.11 6.5 20 6.5ZM15 4.5C15.55 4.5 16 4.95 16 5.5C16 6.05 15.55 6.5 15 6.5C14.45 6.5 14 6.05 14 5.5C14 4.95 14.45 4.5 15 4.5ZM9 4.5C9.55 4.5 10 4.95 10 5.5C10 6.05 9.55 6.5 9 6.5C8.45 6.5 8 6.05 8 5.5C8 4.95 8.45 4.5 9 4.5ZM20 19.5H4V17.5H20V19.5ZM20 14.5H4V8.5H9.08L7 11.33L8.62 12.5L12 7.9L15.38 12.5L17 11.33L14.92 8.5H20V14.5Z"
                                fill="white"
                              />
                            </svg>
                            {/* Earn up to{" "} */}
                            {merchant?.firstName} {merchant?.lastName}
                            <span className="bg-[#059669] font-medium text-xs px-2 py-1 rounded-md">
                              {" "}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500 text-lg">No records found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 flex justify-end gap-2 sm:items-center items-start py-3 sm:px-6">
            {pagination.totalItems > 10 && (
              <Pagination
                current={pagination.currentPage}
                total={pagination.totalItems}
                pageSize={pagination.pageSize}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserMerchantFilter;
