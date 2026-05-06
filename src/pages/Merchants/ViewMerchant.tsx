import React, { useEffect, useState } from "react";
import { Button, Form, Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPackagesByMerchandId } from "../../actions/admin";
import { ViewWallet } from "./ViewWallet";
import RenderPersonalDetails from "./RenderPersonalDetails";
import AddOfferPackage from "./AddOfferPackage";
import { ViewMerchantTransaction } from "./ViewMerchantTransaction";

interface ViewMerchantProps {
  merchantData: {
    id?: number;
    email?: string;
    roleId?: number;
    name?: string;
    firstName?: string | null;
    lastName?: string | null;
    mobileNumber?: string | null;
    profilePhoto?: string | null;
    address?: string | null;
    isActive?: boolean;
    isRead?: boolean;
    dateOfBirth?: string | null;
    createdAt?: string;
    updatedAt?: string;
    merchantId?: number | null;
    businessName?: string;
    website?: string;
    merchant?: {
      id?: number;
      name?: string;
      businessName?: string;
      website?: string;
      description?: string;
      whichBestDescribesYou?: string;
      commercialRegistrationNumber?: string;
      brandLogo?: string;
      plan?: {
        id?: number;
        pageTitle?: string;
        everyTimeDeposit?: number;
        everyDepositEarn?: number;
        offerEarning?: number;
        offOnRecurring?: number;
        category?: string;
        groupBy?: string;
        promoPicture?: string;
        thumbNailImage?: string;
        demoVideo?: string;
      };
    } | null;
  } | null;
}

interface PackageType {
  id?: number; // Optional during creation
  title?: string;
  totalAmount?: number;
  offerPercentage?: number;
  saveOnEveryDepo?: number;
  recurringOff?: number;
  icon?: string;
  category?: string;
  merchant?: {
    id?: number;
    businessName?: string;
    website?: string | null;
    description?: string;
  };
}

const ViewMerchant: React.FC<ViewMerchantProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const newMerchantData = useSelector(
    (state: any) => state?.Merchant?.createMerchantData
  );
  const { merchantData, tab } = location.state || {};
  const [showButton, setShowButton] = useState<boolean>(false);
  const [wallet, setwallet] = useState<any>([]);
  const [transaction, setTransaction] = useState<any>([]);
  const [defaultTabKey, setDefaultTabKey] = useState<any>("1");
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });

  useEffect(() => {
    document.title = "Merchant Details | Snbla";
    setDefaultTabKey(tab);
  }, []);
  const merchantId = merchantData?.merchant?.id;

  useEffect(() => {
    if (merchantData?.merchant?.plan) {
      const { id, ...rest } = merchantData.merchant.plan;

      const isEmpty = Object.values(rest).every(
        (value) => value === "" || value === null || value === undefined
      );

      if (isEmpty) {
        setShowButton(true);
      }
    } else {
      setShowButton(true);
    }
  }, [merchantData]);

  const fetchPackages = (
    merchantId: string,
    page: number = pagination.currentPage,
    pageSize: number = pagination.pageSize
  ) => {
    dispatch(
      getPackagesByMerchandId(
        { page, pageSize, merchantId },
        (response: any) => {
          if (response.status === 200 || response.status === 201) {
            setPackages(response?.data);

            const paginationData = response.pagination || {};
            setPagination({
              totalItems: paginationData.totalItems || 0,
              currentPage: paginationData.currentPage || 1,
              totalPages: paginationData.totalPages || 1,
              pageSize: paginationData.pageSize || 10,
            });
          } else {
            console.error("Failed to fetch packages:", response);
          }
        }
      )
    );
  };

  useEffect(() => {
    fetchPackages(merchantId, pagination.currentPage, pagination.pageSize);
  }, [pagination.currentPage]);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const profilePhoto = merchantData?.merchant?.brandLogo;

  return (
    <div className="w-full mt-5 ">
      <div className="d-flex align-items-center mb-6 mt-3 ">
        <button
          onClick={() => {
            navigate("/admin/merchants");
          }}
          className="btn textAuthHeading"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="0.4"
              y="0.4"
              width="23.2"
              height="23.2"
              rx="11.6"
              stroke="#474df4"
              strokeWidth="0.8"
            />
            <path
              d="M14 8L10 12L14 16"
              stroke="#474df4"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>{" "}
        </button>
        <div></div>
        <h2 className="text-3xl font-bold text-left ms-2">Merchant Details</h2>
      </div>

      <Tabs
        type="card"
        activeKey={defaultTabKey}
        onChange={(key) => setDefaultTabKey(key)}
        items={[
          {
            label: "Business Details",
            key: "1",
            children: (() => {
              if (merchantData?.id) {
                localStorage.setItem("merchantUserId", merchantData?.id);
              }
              return <RenderPersonalDetails merchantData={merchantData} />;
            })(),
          },

          {
            label: "Wallets",
            key: "4",
            children: (
              <ViewWallet
                wallet={wallet}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            ),
          },
          {
            label: "Offers & Packages",
            key: "5",
            children: (
              <AddOfferPackage
                merchantPData={merchantData}
                showButton={showButton}
                packages={packages}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
                fetchPackages={fetchPackages}
              />
            ),
          },
          {
            label: "Transactions",
            key: "6",
            children: (
              <ViewMerchantTransaction
                transaction={transaction}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default ViewMerchant;
