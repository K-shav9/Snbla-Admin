"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Input, message, Select, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TransactionTable from "./TransactionTable";
import { createMerchantPayment, getAllAdminMerchants, getAllAdminMerchantTransaction } from "../../../actions/admin";

const MerchantTransaction = () => {
  const dispatch: any = useDispatch();
  const [transaction, setTransaction] = useState<any>([]);
  const [merchants, setMerchants] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });
  const [statusFilter, setStatusFilter] = useState<string | null>(null); 
  const [form] = Form.useForm(); 
  const [formData, setFormData] = useState({
    isModalOpen: false,
    selectedMerchant: null,
    requestedAmount: "",
    remark: "",
    status: "Paid",
    maxRequestedAmount: 0,
  });

  const { isLoading } = useSelector((state: any) => state?.General);

  // Fetch the entire list of merchants and show it in dropdown
  const fetchMerchantsList = (roleId: number) => {
    const data = {
      page: pagination?.currentPage,
      limit: pagination?.pageSize,
    };

    dispatch(getAllAdminMerchants({ roleId, ...data }))
      .then((response: any) => {
        if (response.status === 200) {
          setMerchants(response?.data);

          const paginationData = response?.pagination || {};
          setPagination({
            totalItems: paginationData?.totalItems,
            currentPage: paginationData?.currentPage,
            totalPages: paginationData?.totalPages,
            pageSize: paginationData?.pageSize,
          });
        } else {
          console.error("Error fetching users", response);
          setMerchants([]);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching users", error);
        setMerchants([]);
      });
  };

  // Fetch the list of transactions
  const fetchTransactionList = (page: number, pageSize: number,status?: string | null) => {
    const params:any = {
      page,
      pageSize,
      status}

    dispatch(getAllAdminMerchantTransaction(params))
      .then((response: any) => {
       
        setTransaction(response?.data || []);
        setPagination({
          currentPage: response?.pagination?.currentPage || page,
          totalItems: response?.pagination?.totalItems|| 0,
          totalPages: response?.pagination?.totalPages || 1,
          pageSize,
        });
      })
      .catch((error: any) => {
        console.error("Error fetching Transaction", error);
        setTransaction([]);
      });
  };

  useEffect(() => {
    fetchMerchantsList(2);
  }, []);

  useEffect(() => {
    fetchTransactionList(pagination.currentPage, pagination.pageSize,statusFilter);
  }, [pagination.currentPage,statusFilter]);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const openModal = () => {
    setFormData({ ...formData, isModalOpen: true });
  };

  const closeModal = () => {
    setFormData({
      isModalOpen: false,
      selectedMerchant: null,
      requestedAmount: "",
      remark: "",
      status: "",
      maxRequestedAmount: 0,
    });
    form.resetFields();
  };

  // Handle merchant selection
  const handleMerchantSelect = (merchantId: string) => {
    const selectedMerchant = merchants.find((m: any) => m.merchant?.id === merchantId);

    if (selectedMerchant) {

      const requestedAmount = selectedMerchant.pendingAmount;


      setFormData({
        ...formData,
        selectedMerchant: merchantId,
        requestedAmount,

      });
      console.log("formmm", formData.requestedAmount)
      form.setFieldsValue({
        requestedAmount
      });
    }
  };



  // Submit the form data
  const handleSubmitRequest = () => {
    form
      .validateFields() // Validate all fields
      .then((values) => {
        const data = {
          merchantId: values.selectedMerchant,
          requestedAmount: values.requestedAmount,
          remark: values.remark,
          status: values.status,
        };

        console.log("dataaaa", data)

        dispatch(
          createMerchantPayment(data, (response: any) => {
            if (response.success) {
              closeModal();
              fetchTransactionList(pagination.currentPage, pagination.pageSize);
            }
          })
        );
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

    const handleStatusChange = (value: string | null) => {
    setStatusFilter(value); 
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to the first page
  };

  return (
    <>
      <div className="mt-3 mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Merchant Transactions</h1>
            <div className="flex items-center gap-4">
                <Select
            placeholder="Filter by Status"
            allowClear
            onChange={handleStatusChange}
            style={{ width: 200 }}
            value={statusFilter || "All"} // Default to "All"
            >
            <Select.Option value={null}>All</Select.Option> {/* Option for "All" */}
            <Select.Option value="Paid">Paid</Select.Option>
            <Select.Option value="Requested">Requested</Select.Option>
            </Select>
          <Button type="primary" onClick={openModal}>
            Add Payment
          </Button>
        </div>
      </div>
      <TransactionTable
        data={transaction}
        loading={isLoading}
        pagination={pagination}
        onPageChange={handlePageChange}
        fetchTransactionList={fetchTransactionList}
      />

      <Modal
        title="Add Merchant Transaction"
        open={formData.isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitRequest} loading={isLoading}>
            Submit Request
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            label="Select Merchant"
            name="selectedMerchant"
            rules={[{ required: true, message: "Please select a merchant" }]}
          >
            <Select placeholder="Select Merchant" onChange={handleMerchantSelect}>
              {merchants.map((m) => (
                <Select.Option key={m.merchant?.id} value={m.merchant?.id}>
                  {m.merchant?.businessName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Enter Amount"
            name="requestedAmount"
            rules={[{ required: true, message: "Please enter the amount" }]}
          >
            <Input
              placeholder="Enter amount"
              value={formData.requestedAmount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;

                const value = parseFloat(inputValue);


                const selectedMerchant = merchants.find((m: any) => m.merchant?.id === formData.selectedMerchant);
                const restrictedAmount = selectedMerchant.pendingAmount


                if (!isNaN(value) && value <= restrictedAmount) {
                  setFormData({ ...formData, requestedAmount: inputValue });
                  form.setFieldsValue({ requestedAmount: inputValue });
                } else if (!isNaN(value)) {
                  message.error(`Requested amount cannot exceed ${restrictedAmount.toFixed(2)}`);
                  setFormData({ ...formData, requestedAmount: restrictedAmount.toFixed(2) });
                  form.setFieldsValue({ requestedAmount: restrictedAmount.toFixed(2) });
                }
              }}
            />
          </Form.Item>


          <Form.Item
            label="Enter Remark"
            name="remark"
            rules={[{ required: true, message: "Please enter a remark" }]}
          >
            <Input placeholder="Enter remark" />
          </Form.Item>

          <Form.Item
            label="Select Status"
            name="status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="Paid">Paid</Select.Option>
              <Select.Option value="Requested">Requested</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MerchantTransaction;