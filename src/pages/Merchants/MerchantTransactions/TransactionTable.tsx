import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table, Tag, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { manageMerchantPaymentDataService } from "../../../actions/admin";
import riyal from "../../../assets/img/riyal_icon.png"

import { formatAmount } from "../../../utils/constants";


interface Transaction {
  key: string;
  id?: number;
  merchantId?: number;
  totalAmount?: string;
  requestedAmount?: string;
  paidAmount?: string;
  remark?: string;
  status?: string;
}

interface TransactionTableProps {
  data: Transaction[];
  loading: boolean;
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  pageSize?: number;
  onPageChange: (page: number, pageSize: number) => void;
  fetchTransactionList: (page: number, pageSize: number) => void; // Add fetchTransactionList as a prop
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  pagination,
  onPageChange,
  fetchTransactionList, // Destructure fetchTransactionList from props
}) => {
  const { isLoading } = useSelector((state: any) => state.General);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const [form] = Form.useForm();

  const handleOpenModal = (transaction: Transaction) => {
    setIsModalVisible(true);
    setSelectedTransaction(transaction);
    form.setFieldsValue({
      remark: transaction.remark || "",
      status: transaction.status || "Pending",
    });
  };

  const handleUpdatePayment = async () => {
    try {
      const values = await form.validateFields();
      if (selectedTransaction) {
        const data = {
          paymentId: selectedTransaction.id,
          remark: values.remark,
          status: values.status,
        };

        dispatch<any>(manageMerchantPaymentDataService(data, (response: any) => {
          if (response.success) {
            closeModal();
            fetchTransactionList(pagination.currentPage, pagination.pageSize);
          }
        }));
      }
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id: number) => id || "-",
      className: "custom_table_td",
    },
    {
      title: "Merchant Name",
      dataIndex: "merchant",
      key: "merchantName",
      render: (merchant: any) => merchant?.businessName || "-",
      className: "custom_table_td",
    },
    {
      title: "Requested Amount",
      dataIndex: "requestedAmount",
      key: "requestedAmount",
      sorter: true, // Enables sorting
      render: (text: string) => (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          {text ? (
            <>
              <img
                src={riyal}
                alt="Riyal Icon"
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              {formatAmount(Number(text)?.toFixed(2))}
            </>
          ) : (
            "-"
          )}
        </span>
      ),
      className: "custom_table_td",
    },
    {
      title: "Remarks",
      dataIndex: "remark",
      key: "remark",
      render: (remark: string) => remark || "-",
      className: "custom_table_td",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Requested" ? "orange" : status === "Paid" ? "green" : "default"}>
          {status || "-"}
        </Tag>
      ),
      className: "custom_table_td",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Transaction) => (
        <Space>
          <Tooltip title="Update Payment">
            <Button type="link" onClick={() => handleOpenModal(record)}>
              Update Payment
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={
          pagination.totalItems > 10
            ? {
              total: pagination.totalItems,
              current: pagination.currentPage,
              pageSize: pagination.pageSize || 10,
              onChange: onPageChange,
              showSizeChanger: false,
              onShowSizeChange: (current, size) => onPageChange(current, size),
            }
            : false
        }
        rowKey="key"
      />
      <Modal
        title="Update Payment"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdatePayment}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            label="Remark"
            name="remark"
            rules={[{ required: true, message: "Please enter a remark" }]}
          >
            <Input placeholder="Enter remark" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Paid">Paid</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TransactionTable;