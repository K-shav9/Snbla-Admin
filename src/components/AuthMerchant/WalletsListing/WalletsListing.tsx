import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getWalletsByMerchantId } from "../../../actions/merchant";
import WalletTable from "./WalletTable";

interface WalletsListingProps {
  filters: {
    search: string;
    groupByType: string;
  };
}

const WalletsListing: React.FC<WalletsListingProps> = ({ filters }) => {
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  const [wallets, setWallets] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state?.Auth);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });

  const merchantId = user?.user?.data?.merchant?.id;
  const fetchWalletsList = (page: number, pageSize: number, filters) => {
    setLoading(true);

    const data = { merchantId, page, pageSize, ...filters };

    dispatch(getWalletsByMerchantId(data))
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
    fetchWalletsList(pagination.currentPage, pagination.pageSize, filters);
  }, [filters, pagination.currentPage]);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  return (
    <div className="w-full">
      <div className="relative">
        <WalletTable
          data={wallets}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange} // Pass page change handler
        />
      </div>
    </div>
  );
};

export default WalletsListing;
