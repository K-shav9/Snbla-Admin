import React, { useEffect, useState } from "react";
import NotificationTable from "./Notificationtable";
import { Button } from "antd";
import { getNotifications } from "../../actions/notification";
import { useDispatch } from "react-redux";

const NotificationList = () => {
  const dispatch: any = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({ search: "" });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });

  const fetchNotificationsList = (page?:number, pageSize?:number) => {
    setLoading(true);
    const data = {
      page: page || pagination.currentPage,
      limit: pageSize || pagination.pageSize,
      search: filters.search,
    };

    dispatch(
      getNotifications(data, (response: any) => {
        if (response?.status === 200) {
          setNotifications(response.data);
         const paginationData = response?.pagination || {};
          setPagination({
            totalItems: paginationData?.totalItems,
            currentPage: paginationData?.currentPage,
            totalPages: paginationData?.totalPages,
            pageSize: paginationData?.pageSize,
          });
        } else {
          setNotifications([]);
        }
        setLoading(false);
      })
    );
    dispatch(getNotifications(data, (response: any) => {
      if (response?.status === 200) {
        setNotifications(response.data);
       setPagination((prev) => ({
         totalItems: response.pagination?.totalItems || 0,
         currentPage: response.pagination?.page || 1,
         totalPages: Math.max(
           1, // Ensure at least 1 page
           Math.ceil(
             (response.pagination?.totalItems || 0) /
               (response.pagination?.limit || 10)
           )
         ),
         pageSize: response.pagination?.limit || 10,
       }));

      } else {
        setNotifications([]);
      }
      setLoading(false);
    }));
  };

  useEffect(() => {
    fetchNotificationsList();
  }, [filters]);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
      pageSize: pageSize,
    }));
    fetchNotificationsList(page, pageSize);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const handleSearchSubmit = () => {
    setFilters({ search: searchInput });
     fetchNotificationsList(1, pagination.pageSize);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setFilters({ search: "" });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Handle page change
  // const handlePageChange = (page: number, pageSize: number) => {
  //   setPagination((prevState) => ({
  //     ...prevState,
  //     currentPage: page,
  //     pageSize: pageSize,
  //   }));
  // };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notification</h1>
      </div>

      <div className="d-flex gap-2 justify-content-end w-100 pb-3">
        <div className="relative sm:w-auto w-full">
          <input
            type="text"
            placeholder="Search for a notification"
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            className="grow border border-bordercolor rounded-lg px-4 pl-8 pr-10 py-3 text-sm h-[40px] w-full"
            style={{ maxWidth: "300px" }}
          />

          {searchInput && (
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
              onClick={handleClearSearch}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </div>

        <Button
          className="btn-primary py-2"
          onClick={handleSearchSubmit}
          style={{ height: "40px" }}
        >
          Search
        </Button>
      </div>

      <NotificationTable
        data={notifications}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default NotificationList;
