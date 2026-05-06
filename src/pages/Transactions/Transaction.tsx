import React, { useEffect, useState } from "react";
import TransactionTable from "../../components/AuthMerchant/Transactions/TransactionTable";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllTransactions } from "../../actions/admin";
import { useDispatch } from "react-redux";

const Transaction = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    search: "",
  });
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    document.title = "Transactions | Snbla";
  }, []);

  const fetchTransactionsList = (
    page: number,
    pageSize: number,
    search: string = filters.search
  ) => {
    setLoading(true);

    const data = { page, pageSize, search };

    dispatch(getAllTransactions(data))
      .then((response: any) => {
        setTransactions(response?.data || []);
        setPagination((prev) => ({
          ...prev,
          totalItems:
            response?.pagination?.totalItems || response?.transactions?.length || 0,
          totalPages: response?.pagination?.totalPages || 1,
        }));
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching wallets", error);
        setTransactions([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactionsList(pagination.currentPage, pagination.pageSize,searchInput);
  }, [filters, pagination.currentPage]);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    // ✅ If input is cleared, reset listing
    if (value === "") {
      setFilters((prev) => ({ ...prev, search: "" }));
      setPagination((prevState) => ({
        ...prevState,
        currentPage: 1, // Reset to first page
      }));
    }
  };

  const handleSearchSubmit = () => {
    setFilters((prev) => ({ ...prev, search: searchInput })); // ✅ Apply search filter
    setPagination((prevState) => ({
      ...prevState,
      currentPage: 1, // ✅ Reset to first page
    }));
    fetchTransactionsList(pagination.currentPage, pagination.pageSize); // ✅ Fetch merchants only on button click
  };

  const handleClearSearch = () => {
    setSearchInput(""); // ✅ Clear input
    setFilters((prev) => ({ ...prev, search: "" })); // ✅ Reset search filter
    setPagination((prevState) => ({
      ...prevState,
      currentPage: 1, // ✅ Reset to first page
    }));
    fetchTransactionsList(pagination.currentPage, pagination.pageSize); // ✅ Fetch default listing
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-left mb-6">Transactions</h1>
      <div className="d-flex gap-2 justify-content-end w-100 pb-3">
        <div className="relative sm:w-auto w-full">
          <input
            type="text"
            placeholder="Search for a transaction"
            value={searchInput} // ✅ Controlled input
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSubmit(); // ✅ Trigger search when Enter is pressed
              }
            }}
            className="flex-grow border border-bordercolor rounded-lg px-4 pl-8 pr-10 py-3 text-sm h-[40px] w-full"
            style={{ maxWidth: "300px" }}
          />

          {/* Search Icon */}
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

          {/* Clear (✖) Icon - Only visible when input is not empty */}
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
              onClick={handleClearSearch} // ✅ Handle clear click
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

      <TransactionTable
        data={transactions}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange} // Pass page change handler
      />
    </div>
  );
};

export default Transaction;
