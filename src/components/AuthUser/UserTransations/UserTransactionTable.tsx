import React from "react";
import { Button, Space, Table } from "antd";
import { useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../../styles/MerchantTable.css"; // Assuming styles remain the same
import { formatDateToMonthDDYYYY } from "../../../utils/constants";

interface Transaction {
  key: string;
  id?: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  amount?: number;
  status?: string;
  orderId?: string;
  transactionId?: string;
  createdAt?: string;
  cardScheme?: string;
  cardNumber?: string;
  orderCurrency?: string;
  orderDescription?: string;
  stack?: any;
  merchant?: any;
  user?: any;
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
}

const UserTransactionTable: React.FC<TransactionTableProps> = ({
  data,
  // loading,
  pagination,
  onPageChange,
}) => {
  const { isLoading } = useSelector((state: any) => state.General);

  // Define columns without Status and Action columns
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text: string) => text || "-",
      className: "custom_table_td",
    },
    // {
    //   title: "Transaction ID",
    //   dataIndex: "transactionId",
    //   key: "transactionId",
    //   render: (text: string) => text || "-",
    //   className: "custom_table_td",
    // },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text: string | undefined) =>
        typeof text === "string" && text.length > 6
          ? `${text.slice(0, 3)}*****${text.slice(-3)}`
          : text || "-",
      className: "custom_table_td",
    },




    {
      title: "Business Name",
      dataIndex: "merchant",
      key: "businessName",
      render: (merchant: any) => merchant?.businessName || "-",
      className: "custom_table_td",
    },
    {
      title: "Contact Name",
      dataIndex: "user",
      key: "name",
      render: (user: any) => user?.name || "-",
      className: "custom_table_td",
    },
    {
      title: "Email",
      dataIndex: "stack",
      key: "payer_email",
      render: (stack: any) => stack?.payer_email || "-",
      className: "custom_table_td",
    },
    {
      title: "Amount",
      dataIndex: "stack",
      key: "order_amount",
      render: (stack: any) =>
        stack?.order_amount ? `${stack.order_amount} SAR` : "-",
      className: "custom_table_td",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "custom_table_td",
      render: (text: string) => {
        let backgroundColor = "";
        const textColor = "white"; // Default text color

        switch (text) {
          case "REDIRECT":
            backgroundColor = "orange";
            break;
          case "PENDING":
            backgroundColor = "red";
            break;
          case "SETTLED":
            backgroundColor = "green";
            break;
          default:
            backgroundColor = "gray"; // Default color if no match
        }

        return (
          <span
            style={{
              backgroundColor,
              color: textColor,
              padding: "4px 8px",
              borderRadius: "4px",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            {text || "-"}
          </span>
        );
      },
    },
    {
      title: "Payment Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => (text ? formatDateToMonthDDYYYY(text) : "-"),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={
        pagination.totalItems > 10
          ? {
            total: pagination.totalItems,
            current: pagination.currentPage,
            pageSize: pagination.pageSize || 10, // Default page size of 10, can be adjusted dynamically
            onChange: onPageChange, // Handle page change
            // pageSizeOptions: ["10", "20", "30", "50", "100"], // Options for different page sizes
            // onShowSizeChange: (current, size) => onPageChange(current, size), // Adjust page size
          }
          : false // Hide pagination if totalItems <= 10
      }
      rowKey="key"
    />
  );
};

export default UserTransactionTable;
