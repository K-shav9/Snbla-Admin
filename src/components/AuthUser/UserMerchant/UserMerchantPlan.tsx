import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const UserMerchantPlan = () => {
  const location = useLocation();
  const [merchant, setMerchant] = useState(location.state?.merchant);
  const { isLoading } = useSelector((state: any) => state.General);

  useEffect(() => {
    document.title = "Offers | Snbla";
  }, []);
    

  // Save merchant data in local storage if available
  useEffect(() => {
    if (location.state?.merchant) {
      localStorage.setItem("merchant", JSON.stringify(location.state.merchant));
    } else {
      const storedMerchant = localStorage.getItem("merchant");
      if (storedMerchant) {
        setMerchant(JSON.parse(storedMerchant));
      }
    }
  }, [location.state?.merchant]);

    return (
      <>
        <div className="flex flex-col tab:gap-8 gap-4">
          <div className="flex items-center justify-between">
            <h1 className="tab:text-[28px] text-xl font-semibold text-black">
              Merchant Plan
            </h1>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E9EBF0] w-full">
            {isLoading ? (
              <Spin />
            ) : merchant ? (
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-lg font-bold text-black">Plan Details</h2>
                  <div className="flex mt-2">
                    <div className="w-1/2 pr-2">
                      <strong>Plan Name:</strong>{" "}
                      {merchant?.merchant?.plan?.name}
                    </div>
                    <div className="w-1/2 pl-2">
                      <strong>Price:</strong> ${merchant?.merchant?.plan?.price}
                    </div>
                  </div>
                  <div className="flex mt-2">
                    <div className="w-1/2 pr-2">
                      <strong>Duration:</strong>{" "}
                      {merchant?.merchant?.plan?.duration} days
                    </div>
                    <div className="w-1/2 pl-2">
                      <strong>Offer:</strong> {merchant?.merchant?.plan?.offer}
                    </div>
                  </div>
                  <div className="flex mt-2">
                    <div className="w-1/2 pr-2">
                      <strong>Features:</strong>{" "}
                      {merchant?.merchant?.plan?.features?.join(", ")}
                    </div>

                    <div className="w-1/2 pl-2">
                      <strong>Description:</strong>{" "}
                      {merchant?.merchant?.plan?.description}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No merchant data available.</p>
            )}
          </div>
        </div>
      </>
    );
};

export default UserMerchantPlan;
