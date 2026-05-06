import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import riyal from "../../assets/img/riyal_icon.png";
import { formatAmount } from "../../utils/constants";

const ViewUserWalletDetail = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access location data
  const { walletData } = location.state || {}; // Access walletData from location state

  return (
    <div className="w-full mt-5">
      <div className="d-flex align-items-center mb-6 mt-3">
        <button onClick={() => navigate(-1)} className="btn textAuthHeading">
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
        <h2 className="text-3xl font-bold text-left ms-2">Wallet Details</h2>
      </div>

      <div className="form-wrapper">
        <div className="row mb-4">
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Name:</strong> {walletData?.user?.name || "-"}
            </p>
          </div>
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Email:</strong> {walletData?.user?.email || "-"}
            </p>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Escrow Amount:</strong>{" "}
              {walletData?.targetAmount ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <img
                    src={riyal}
                    alt="SAR"
                    style={{ width: "10px", height: "15px" }}
                  />
                  {formatAmount(walletData?.targetAmount)}
                </span>
              ) : (
                "-"
              )}
            </p>
          </div>
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Deposited Amount:</strong>{" "}
              {walletData?.balance ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <img
                    src={riyal}
                    alt="SAR"
                    style={{ width: "10px", height: "15px" }}
                  />
                  {formatAmount(walletData?.balance)}
                </span>
              ) : (
                "-"
              )}
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Remaining Amount:</strong>{" "}
              {walletData?.remainingAmount ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <img
                    src={riyal}
                    alt="SAR"
                    style={{ width: "10px", height: "15px" }}
                  />
                  {formatAmount(walletData?.remainingAmount)}
                </span>
              ) : (
                "-"
              )}
            </p>
          </div>
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Invested Amount:</strong>{" "}
              {walletData?.investedAmount ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <img
                    src={riyal}
                    alt="SAR"
                    style={{ width: "10px", height: "15px" }}
                  />
                  {formatAmount(walletData?.investedAmount)}
                </span>
              ) : (
                "-"
              )}
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Status:</strong> {walletData?.status || "-"}
            </p>
          </div>
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Order ID:</strong> {walletData?.orderId || "-"}
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Merchant:</strong>{" "}
              {walletData?.merchants?.businessName || "-"}
            </p>
          </div>
          <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(walletData?.createdAt).toLocaleString() || "-"}
            </p>
          </div>
        </div>
        <div className="row mb-4">
          {/* <div className="col-lg-6 col-sm-12">
            <p>
              <strong>Goal Status:</strong>{" "}
              {walletData?.isGoalCompleted ? "Completed" : "Not Completed"}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ViewUserWalletDetail;
