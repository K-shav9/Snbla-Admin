import React, { useEffect, useState } from "react";
import { Form, Spin, Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ViewUserWallet } from "./ViewUserWalletListing";
import { ViewUserTransaction } from "./ViewUserTransaction";
import { getUserByUserId } from "../../actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { formatGulfNumber } from "../../utils/constants";

interface ViewUserProps {
  user: {
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
  } | null;
}

const ViewUser: React.FC<ViewUserProps> = () => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state;

  useEffect(() => {
    document.title = "User Details | Snbla";
  }, []);

  const [wallet, setwallet] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [transaction, setTransaction] = useState<any>([]);
  const { isLoading } = useSelector((state: any) => state.General);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });

  function handlePageChange(page: number, pageSize: number): void {
    throw new Error("Function not implemented.");
  }

  // USER LISTING API
  const fetchUsersList = (roleId: number) => {
    setLoading(true);

    // Define the data (without roleId) that will be passed to the API
    const data = {
      userId: userData?.id || localStorage.getItem("userId"),
    };

    // Directly call the API and handle response using .then and .catch
    dispatch(getUserByUserId({ roleId, ...data }))
      .then((response: any) => {
        if (response.status === 200) {
          // Set the users with the fetched data
          // setUsers(response?.data);
          setUsers(response?.data?.length > 0 ? response.data[0] : null);
        } else {
          console.error("Error fetching users", response);
          setUsers([]); // Clear users on error
        }
        setLoading(false); // Stop loading after the response
      })
      .catch((error: any) => {
        console.error("Error fetching users", error);
        setUsers([]); // Clear users on error
        setLoading(false); // Stop loading
      });
  };

  useEffect(() => {
    fetchUsersList(3);
  }, []);

  const renderPersonalDetails = () => (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Spin />
        </div>
      ) : (
        <Form
          layout="vertical"
          className="form-wrapper"
          initialValues={{
            firstName: userData?.firstName || users?.firstName || "",
            lastName: userData?.lastName || users?.lastName || "",
            email: userData?.email || users?.email || "",
            mobileNumber: userData?.mobileNumber || users?.mobileNumber || "",
            dateOfBirth: userData?.dateOfBirth || users?.dateOfBirth || "",
            name: userData?.name || users?.name || "",
            address: userData?.address || users?.address || "",
            city: userData?.city || users?.city || "",
            state: userData?.state || users?.state || "",
          }}
        >
          <div className="row mb-4">
            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>First Name:</strong>{" "}
                {userData?.firstName || users?.firstName || "-"}
              </p>
            </div>

            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>Last Name:</strong>{" "}
                {userData?.lastName || users?.lastName || "-"}
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>Email:</strong>{" "}
                {userData?.email || users?.email || "-"}
              </p>
            </div>

            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>Phone Number:</strong>{" "}
                {userData?.mobileNumber || users?.mobileNumber ? (
                  <a
                    href={`tel:${
                      userData?.mobileNumber || users?.mobileNumber
                    }`}
                    className="text-blue-500 hover:underline"
                  >
                    {formatGulfNumber(
                      userData?.mobileNumber || users?.mobileNumber
                    )}
                  </a>
                ) : (
                  "-"
                )}
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>Name:</strong> {userData?.name || users?.name || "-"}
              </p>
            </div>

            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>Address:</strong>{" "}
                {userData?.address || users?.address || "-"}
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>Zip Code:</strong>{" "}
                {userData?.zipCode || users?.zipCode || "-"}
              </p>
            </div>
            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>City:</strong> {userData?.city || users?.city || "-"}
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>State:</strong>{" "}
                {userData?.state || users?.state || "-"}
              </p>
            </div>
            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>Country:</strong>{" "}
                {userData?.country || users?.country || "-"}
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>Referral Code:</strong>{" "}
                {userData?.referralCode || users?.referralCode || "-"}
              </p>
            </div>

            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>Number of Referrals:</strong>{" "}
                {userData?.referredBy || users?.referredBy || "-"}
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-sm-12">
              <p>
                <strong>DOB:</strong>{" "}
                {userData?.dateOfBirth || users?.dateOfBirth || "-"}
              </p>
            </div>
          </div>
        </Form>
      )}
    </>
  );

  return (
    <div className="w-full mt-5">
      <div className="d-flex align-items-center mb-6 mt-3">
        <button
          onClick={() => {
            navigate(-1);
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
        <h2 className="text-3xl font-bold text-left ms-2">User Details</h2>
      </div>

      <Tabs
        type="card"
        items={[
          {
            label: "Personal Details",
            key: "1",
            children: renderPersonalDetails(),
          },
          {
            label: "Wallets",
            key: "4",
            children: (
              <ViewUserWallet
                wallet={wallet}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            ),
          },
          {
            label: "Transactions",
            key: "5",
            children: (
              <ViewUserTransaction
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

export default ViewUser;
