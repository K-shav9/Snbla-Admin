import React, { useEffect, useState } from "react";
import defaultImage from "../../assets/img/Image-not-found.png";
import Button from "./buttons/Button";
import { getAllMerchants } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Select, Input } from 'antd'; // Import the Select component from Ant Design
import { Link } from "react-router-dom";
import { categories, groupByTypes } from "../../utils/constants";

//   { id: 1, logo: rosaclara, image: saveshop, discount: "15%" },
//   { id: 2, logo: rosaclara, image: saveshop, discount: "8%" },
//   {
//     id: 3,
//     logo: rosaclara,
//     image: saveshop,
//     discount: "10%",
//   },
//   { id: 4, logo: rosaclara, image: saveshop, discount: "5%" },
//   { id: 5, logo: rosaclara, image: saveshop, discount: "15%" },
//   { id: 6, logo: rosaclara, image: saveshop, discount: "8%" },
//   {
//     id: 7,
//     logo: rosaclara,
//     image: saveshop,
//     discount: "10%",
//   },
//   { id: 8, logo: rosaclara, image: saveshop, discount: "5%" },
// ];

const FilterSection = () => {
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  const [merchants, setMerchants] = useState([]);
  const [filters, setFilters] = useState({
    category: null,
    sort: null,
    search: "",
    groupByType: ""
  });
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 12,
  });

  const { Option } = Select; // Destructure Option from Select for use

  const fetchMerchants = (roleId: number) => {
    const data = {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      isWeb: true,
      ...filters,
    };

    dispatch(getAllMerchants({ roleId, ...data }))
      .then((response: any) => {

        if (response.status === 200) {
          setMerchants((prev) =>
            pagination.currentPage === 1 ? response.data : [...prev, ...response.data]
          );

          const paginationData = response?.pagination || {};
          setPagination((prev) => ({
            ...prev,
            totalItems: paginationData.totalItems,
            totalPages: paginationData.totalPages,
            currentPage: paginationData.currentPage,
            pageSize: paginationData.pageSize,
            // pageSize: 4,

          }));
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
  }, [filters, pagination.currentPage]);

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handleCategoryChange = (value) => {
    setFilters((prev) => ({ ...prev, category: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to page 1
  };

  const handleSortChange = (value) => {
    setFilters((prev) => ({ ...prev, sort: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to page 1
  };

  const handleGroupByTypeChange = (value) => {
    setFilters((prev) => ({ ...prev, groupByType: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };


  // const handleSearchChange = (event) => {
  //   setFilters((prev) => ({ ...prev, search: event.target.value }));
  //   setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to page 1
  // };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchChange = debounce((event) => {
    setFilters((prev) => ({ ...prev, search: event.target.value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, 100);

  const settingMerchanId = (item) => {
    console.log("item", item)
    localStorage.setItem("m_id", item?.merchant?.id)
  }


  return (
    <>
      <section className=" xl:pb-secpadding tab:pb-96 pb-40">
        <div className="mx-auto container 2xl:max-w-screen-xl sm:px-5 px-2">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 custom_filter">
            <div className="flex flex-wrap items-center justify-between sm:gap-3 gap-2 ">
              {/* <select className="border border-bordercolor rounded-lg px-3 py-2 text-sm text-black sm:w-[150px] w-[130px]  h-[40px] relative">
             
                <option>Category</option>
              </select> */}
              {/* <select
                className="border border-bordercolor rounded-lg px-3 py-2 text-sm text-black sm:w-[150px] w-[130px] h-[40px]"
                onChange={handleCategoryChange}
              >
                <option value="">Category</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="groceries">Groceries</option>
                <option value="restaurants">Restaurants</option>
              </select> */}

              {/* <select className="border border-bordercolor rounded-lg px-3 py-2 text-sm text-black sm:w-[150px] w-[130px] h-[40px]">
                <option>Sort by</option>
              </select> */}
              {/* Sort By Dropdown */}
              {/* <select
                className="border border-bordercolor rounded-lg px-3 py-2 text-sm text-black sm:w-[150px] w-[130px] h-[40px]"
                onChange={handleSortChange}
              >
                <option value="">Sort by</option>
                <option value="discount-high-low">Discount: High to Low</option>
                <option value="discount-low-high">Discount: Low to High</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select> */}

              {/* 
              <Select
      
                className=" border-bordercolor rounded-lg py-2 text-sm text-black sm:w-[150px] w-[130px] h-[55px]"
                placeholder="Category"
                onChange={handleSortChange}
                style={{ width: "200px" }} // Increase width to 300px
              >
                <Option value="">Category </Option>
                {/* <Option value="discount-high-low">Discount: High to Low</Option>
                <Option value="discount-low-high">Discount: Low to High</Option> */}
              {/* <Option value="name-asc">Name: A to Z</Option>
                <Option value="name-desc">Name: Z to A</Option>
              </Select>  */}

              <Select
                className="w-full sm:w-[180px] h-[40px] hover:border-transparent custom-select focus:border-transparent focus:ring-0"
                // className="hover:border-transparent focus:border-transparent focus:ring-0"
                placeholder="Select Category"
                onChange={handleCategoryChange}
              >
                <Option value="">Select Category</Option>
                {categories.map((category, index) => (
                  <Option key={index} value={category.value}>
                    {category.label}
                  </Option>
                ))}
              </Select>

              <Select
                className=" border-bordercolor rounded-lg py-2 text-sm custom-select text-black sm:w-[150px] w-[130px] h-[55px]"
                placeholder="Sort by"
                onChange={handleSortChange}
                style={{ width: "200px" }} // Increase width to 300px
              >
                <Option value="">Sort by</Option>
                {/* <Option value="discount-high-low">Discount: High to Low</Option>
                <Option value="discount-low-high">Discount: Low to High</Option> */}
                <Option value="name-asc">Name: A to Z</Option>
                <Option value="name-desc">Name: Z to A</Option>
              </Select>

              {/* <button className="border border-bordercolor rounded-lg text-sm w-[40px] h-[40px] flex items-center justify-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.33333 15H11.6667V13.3333H8.33333V15ZM2.5 5V6.66667H17.5V5H2.5ZM5 10.8333H15V9.16667H5V10.8333Z"
                    fill="#1F242E"
                  />
                </svg>
              </button> */}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3 ">
              <div className="relative">
                {/* <input
                  type="text"
                  placeholder="Search for a merchant"
                  className="flex-grow border border-bordercolor rounded-lg px-4 pl-8 py-2 text-sm h-[40px] w-full"
                  onChange={handleSearchChange}
                  value={filters.search}
                /> */}
                <Input
                  placeholder="Search for a merchant"
                  className="flex-grow border  border-bordercolor rounded-lg px-4 pl-8 py-2 text-sm h-[40px] custom-select"
                  onChange={handleSearchChange}
                  value={filters.search}
                  prefix={<i className="fas fa-search"></i>} // Optional: search icon
                />
                <svg
                  className="absolute left-2 top-[11px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.1291 11.8791H12.4707L12.2374 11.6541C13.0541 10.7041 13.5457 9.47074 13.5457 8.12907C13.5457 5.1374 11.1207 2.7124 8.12907 2.7124C5.1374 2.7124 2.7124 5.1374 2.7124 8.12907C2.7124 11.1207 5.1374 13.5457 8.12907 13.5457C9.47074 13.5457 10.7041 13.0541 11.6541 12.2374L11.8791 12.4707V13.1291L16.0457 17.2874L17.2874 16.0457L13.1291 11.8791ZM8.12907 11.8791C6.05407 11.8791 4.37907 10.2041 4.37907 8.12907C4.37907 6.05407 6.05407 4.37907 8.12907 4.37907C10.2041 4.37907 11.8791 6.05407 11.8791 8.12907C11.8791 10.2041 10.2041 11.8791 8.12907 11.8791Z"
                    fill="#686E7D"
                  />
                </svg>
              </div>

              {/* <select className="border border-bordercolor rounded-lg px-4 py-2 text-sm sm:w-[180px] h-[40px] w-full">
                <option>Group by Type</option>
              </select> */}
              {/* <select
                className="border border-bordercolor rounded-lg px-4 py-2 text-sm sm:w-[180px] h-[40px] w-full"
                onChange={handleGroupByTypeChange}
              >
                <option value="">Group by Type</option>
                <option value="premium">Premium Merchants</option>
                <option value="standard">Standard Merchants</option>
                <option value="new">New Arrivals</option>
              </select> */}

              <Select
                className="w-full sm:w-[180px] h-[40px] custom-select"
                placeholder="Group by Type"
                onChange={handleGroupByTypeChange}
              >
                <Option value="">Group by Type</Option>
                {groupByTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>

              {/* <Select
                className="w-full sm:w-[180px] h-[40px]"
                placeholder="Select Category"
                onChange={handleGroupByTypeChange}
                style={{ width: "100%" }}
              >
                <Option value="">Select Category</Option>
                {categories.map((category, index) => (
                  <Option key={index} value={category.value}>
                    {category.label}
                  </Option>
                ))}
              </Select> */}
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen w-full">
              <Spin />
            </div>
          ) : (
            <div>
              {/* Merchant Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 xl:grid-cols-4 gap-6">
                {merchants.length > 0 ? (
                  merchants.map((merchant) => (
                    <Link
                      // to={"/partners-offer"}
                      to={`/partners-offer/${encodeURIComponent(merchant?.merchant?.businessName)}`}
                      key={merchant.id}
                      // state={{ merchant }}
                      onClick={() => settingMerchanId(merchant)}
                      className="bg-white rounded-lg-lg overflow-hidden group rounded-2xl relative h-[200px] shadow-shadow"
                    >
                      <div
                        className="absolute inset-0 z-10"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(36, 39, 48, 0.80) 100%)",
                        }}
                      ></div>
                      <img
                        src={
                          merchant?.merchant?.plan?.promoPicture
                            ? merchant?.merchant?.plan?.promoPicture
                            : defaultImage
                        }
                        className="w-full object-cover group-hover:scale-105 transition-transform absolute h-full"
                      />
                      <div className="pt-8 pb-6 px-6 relative business-name-col z-10 h-full flex flex-col justify-center text-white">
                        <div className="business_logo">
                          {merchant?.merchant?.brandLogo ? (
                            <img
                              src={merchant.merchant.brandLogo}
                              className="w-auto absolute left-0 right-0 mx-auto mt-12"
                              alt="Brand Logo"
                            />
                          ) : (
                            <h1 className="text-center w-full font-bold text-xl mx-auto mt-12 text-white">
                              {merchant?.merchant?.businessName}
                            </h1>
                          )}
                        </div>

                        <div className="mt-auto text-sm flex items-center justify-between position-relative">
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
                            Earn Up to
                            <span className="bg-[#059669] font-medium text-xs px-2 py-1 rounded-md">
                              {" "}
                              {merchant?.merchant?.plan?.offerEarning}%{" "}
                            </span>
                          </span>
                          <button className="text-gray-500 hover:bg-transparent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500 text-lg">No Merchants found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center flex justify-between sm:flex-row flex-col gap-2 sm:items-center items-start py-3 sm:px-6">
            <span className="text-sm text-gray-500">
              Showing 1 to {merchants.length} of {pagination?.totalItems}
              &nbsp;Results
            </span>

            {merchants.length === 12 && (
              <Button
                type="primary"
                className="!text-gray hover:bg-white border-bordercolor"
                // eslint-disable-next-line no-undef
                onClick={handleNextPage}
                Show
                More
              >
                Show More
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default FilterSection;
