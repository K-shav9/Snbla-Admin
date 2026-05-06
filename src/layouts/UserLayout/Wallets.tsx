import React, { useEffect, useState } from "react";
import Card from "./Common/Card";
import Button from "../common-components/buttons/Button";
import cardimg from "../../assets/img/dash-card.png";
import eilago from "../../assets/img/eilago.png";
import WalletsListing from "../../components/AuthMerchant/WalletsListing/WalletsListing";
import { useDispatch, useSelector } from "react-redux";
import { getWalletsByUserId } from "../../actions/user";
import { Select, Spin } from "antd";
import { groupByTypes } from "../../utils/constants";

const Wallets = () => {
  useEffect(() => {
    document.title = "Wallets | Snbla";
  }, []);
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  const [wallets, setWallets] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state?.Auth);
  const [filters, setFilters] = useState({
      search: "",
      groupByType: ""
    });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });

  const { Option } = Select;

  const userId = user?.user?.data?.id;

  const fetchWalletsList = (page: number, pageSize: number, filters) => {
    if (user?.user?.data?.roleId !== 3) return;
    setLoading(true);

    const data = { userId, page, pageSize, ...filters };

    dispatch(getWalletsByUserId(data))
      .then((response: any) => {
        setWallets(response?.data || []);
        setPagination((prev) => ({
          ...prev,
          totalItems:
            response?.pagination?.totalItems || response?.wallets?.length || 0,
          totalPages: response?.pagination?.totalPages || 1,
        }));
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching wallets", error);
        setWallets([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.user?.data?.roleId === 3) {
      fetchWalletsList(pagination.currentPage, pagination.pageSize, filters);
    }
  }, [filters,pagination.currentPage, user]);


  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  // const cards = [
  //   {
  //     image: cardimg,
  //     logoimage: eilago,
  //     title: "Elago Vacation Package",
  //     amount: "3,000",
  //     cashback: "7",
  //     progress: 10.56,
  //   },
  //   {
  //     image: cardimg,
  //     logoimage: eilago,
  //     title: "Alomar Sofa",
  //     amount: "3,200",
  //     cashback: "3",
  //     progress: 46.35,
  //   },
  //   {
  //     image: cardimg,
  //     logoimage: eilago,
  //     title: "Bridgestone Tyres",
  //     amount: "3,400",
  //     cashback: "12",
  //     progress: 32.23,
  //   },
  //   {
  //     image: cardimg,
  //     logoimage: eilago,
  //     title: "Elago Vacation Package",
  //     amount: "3,000",
  //     cashback: "7",
  //     progress: 10.56,
  //   },
  //   {
  //     image: cardimg,
  //     logoimage: eilago,
  //     title: "Alomar Sofa",
  //     amount: "3,200",
  //     cashback: "3",
  //     progress: 46.35,
  //   },
  //   {
  //     image: cardimg,
  //     logoimage: eilago,
  //     title: "Bridgestone Tyres",
  //     amount: "3,400",
  //     cashback: "12",
  //     progress: 32.23,
  //   },
  // ];

  const handleClearSearch = () => {
    setFilters((prev) => ({ ...prev, search: "" }));
  };

  const handleGroupByTypeChange = (value) => {
    setFilters((prev) => ({ ...prev, groupByType: value }));
  };

  return (
    <>
      <div className="flex flex-col tab:gap-8 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="tab:text-[28px] text-xl font-semibold text-black ">
            Wallets Listing
          </h1>
          {/* <Button type="secondary" onClick="">
            New Wallet
          </Button> */}
        </div>
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 tab:mb-1 mb-4">
          <div className="flex flex-wrap items-center justify-between sm:gap-3 gap-2 ">
            <select className="border border-bordercolor rounded-lg px-3 py-2 text-sm text-black sm:w-[150px] w-[130px] h-[40px]">
              <option>All</option>
            </select>
            <button className="border border-bordercolor rounded-lg text-sm w-[40px] h-[40px] flex items-center justify-center ">
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
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 ">
            <div className="relative sm:w-auto w-full">
              <input
                type="text"
                placeholder="Search for a wallet"
                className="flex-grow border border-bordercolor rounded-lg px-4 pl-8 py-2 text-sm h-[40px] w-full"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
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
              {filters?.search && (
                <svg
                  className="absolute right-3 top-[12px] cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={handleClearSearch} // ✅ Clears input on click
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
            </div>
            <select
              className="border border-bordercolor rounded-lg px-4 py-2 text-sm sm:w-[180px] h-[40px] w-full"
              onChange={(e) => handleGroupByTypeChange(e.target.value)}
              value={filters?.groupByType}
            >
              <option value="">Group by Type</option>
              {groupByTypes?.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {user?.user?.data?.roleId === 2 && (
          <div className="mb-10">
            <WalletsListing filters={filters} />
          </div>
        )}

        {user?.user?.data?.roleId === 3 && (
          <div className="flex justify-center items-center w-full">
            {isLoading ? (
              <div className="flex justify-center items-center w-full h-40">
                <Spin />
              </div>
            ) : wallets?.length > 0 ? (
              <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 tab:gap-8 gap-4 w-full">
                {wallets?.map((wallet: any, index: number) => (
                  <Card
                    key={index}
                    image={wallet?.merchants?.offer?.coverImage ?? cardimg} // Static image for now
                    logoimage={wallet?.merchants?.brandLogo ?? eilago} // Static logo for now
                    title={
                      wallet?.merchants?.businessName || "Unknown Merchant"
                    }
                    amount={wallet?.targetAmount || "N/A"}
                    cashback={wallet?.merchants?.offer?.offerEarning || 0}
                    progress={
                      wallet?.remainingAmount
                        ? Number(
                            ((wallet.targetAmount - wallet.remainingAmount) /
                              wallet.targetAmount) *
                              100
                          ).toFixed(2)
                        : "0.00"
                    }
                    merchant={wallet}
                  />
                ))}
              </div>
            ) : (
              <p className="flex justify-center items-center w-full h-40 text-gray-500 text-lg">
                No wallets found
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Wallets;
