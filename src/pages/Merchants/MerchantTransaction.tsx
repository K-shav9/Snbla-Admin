"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Input, message } from "antd";
import axios from "axios";

const MerchantTransaction = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestedAmount, setRequestedAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(false);

  // Fetch total transaction amount from API
  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        // const response = await axios.get("/merchant/transactions/total");
        // setTotalAmount(response.data.totalAmount);
      } catch (error) {
        message.error("Failed to fetch total amount");
      }
    };

    fetchTotalAmount();
  }, []);

  // Handle input change and validate amount
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRequestedAmount(value);
    setIsAmountValid(!isNaN(Number(value)) && Number(value) > 0);
  };

  // Handle submit request
  const handleRequestAmount = async () => {
    if (!isAmountValid) {
      return message.warning("Please enter a valid amount");
    }

    try {
      await axios.post("/merchant/transactions/request", {
        amount: Number(requestedAmount),
      });
      message.success("Request submitted successfully");
      setIsModalOpen(false);
      setRequestedAmount(""); // Reset input after submission
      setIsAmountValid(false); // Reset validation state
    } catch (error) {
      message.error("Failed to request amount");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      {/* Display Total Amount */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Total Amount</h2>
        <p className="text-3xl font-bold text-green-600 mt-2">
          ${totalAmount.toFixed(2)}
        </p>
      </div>

      {/* Request Amount Button */}
      <div className="mt-6 flex justify-center">
        <Button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Request Amount
        </Button>
      </div>

      {/* Modal for Requesting Amount */}
      <Modal
        title="Request Amount"
        open={isModalOpen}
        onOk={handleRequestAmount}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ disabled: !isAmountValid }}
        okText="Submit"
        cancelText="Cancel"
      >
        <div className="flex flex-col gap-4">
          <label className="font-semibold">Enter Amount</label>
          <input
            type="number"
            value={requestedAmount}
            onChange={handleAmountChange}
            className="w-full p-2 border rounded-lg "
            placeholder="Enter amount"
          />
        </div>
      </Modal>
    </div>
  );
};

export default MerchantTransaction;