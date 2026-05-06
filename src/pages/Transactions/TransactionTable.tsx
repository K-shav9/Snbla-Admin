import React from "react";
import { Button, message, Space, Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import "../../styles/MerchantTable.css"; // Assuming styles remain the same
import { formatAmount, formatDateToMonthDDYYYY } from "../../utils/constants";
import riyal from "../../assets/img/riyal_icon.png";
import { EyeOutlined } from "@ant-design/icons";

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
  onView: (record: Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  // loading,
  onView,
  pagination,
  onPageChange,
}) => {
  const { isLoading } = useSelector((state: any) => state.General);

  // Define columns without Status and Action columns
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a: Transaction, b: Transaction) => (a.id || 0) - (b.id || 0),
      render: (id: number) => id || "-",
      className: "custom_table_td",
    },

    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a: Transaction, b: Transaction) =>
        (a.orderId || "").localeCompare(b.orderId || ""),
      render: (orderId: string) => {
        if (!orderId) return "-";

        // Format Order ID (First 4...Last 4)
        const formattedOrderId =
          orderId?.length > 8
            ? `${orderId?.slice(0, 4)}...${orderId?.slice(-4)}`
            : orderId;

        // Copy Function
        const copyOrderId = (e: React.MouseEvent) => {
          navigator.clipboard.writeText(orderId);

          // Show "Copied!" text next to the icon
          const iconElement = e.currentTarget as HTMLElement;
          iconElement.innerHTML =
            "<span style='color: green; font-weight: bold;'>Copied!</span>";

          // Reset back to Eye icon after 2 seconds
          setTimeout(() => {
            iconElement.innerHTML = "📋"; // Replacing with eye emoji (alternative to icon)
          }, 1500);
        };

        return (
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {formattedOrderId}
            <span
              style={{ cursor: "pointer", color: "#1890ff" }}
              onClick={copyOrderId}
            >
              📋
            </span>
          </span>
        );
      },
      className: "custom_table_td",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (transactionId: string) => {
        if (!transactionId) return "-";

        // Format Order ID (First 4...Last 4)
        const formattedTransactionId =
          transactionId?.length > 8
            ? `${transactionId?.slice(0, 4)}...${transactionId?.slice(-4)}`
            : transactionId;

        // Copy Function
        const copyTransactionId = (e: React.MouseEvent) => {
          navigator.clipboard.writeText(transactionId);

          // Show "Copied!" text next to the icon
          const iconElement = e.currentTarget as HTMLElement;
          iconElement.innerHTML =
            "<span style='color: green; font-weight: bold;'>Copied!</span>";

          // Reset back to Eye icon after 2 seconds
          setTimeout(() => {
            iconElement.innerHTML = "📋"; // Replacing with eye emoji (alternative to icon)
          }, 1500);
        };

        return (
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {formattedTransactionId}
            <span
              style={{ cursor: "pointer", color: "#1890ff" }}
              onClick={copyTransactionId}
            >
              📋
            </span>
          </span>
        );
      },
      className: "custom_table_td",
    },
    {
      title: "Name",
      dataIndex: "user",
      key: "name",
      render: (user: any) => user?.name || "-",
      className: "custom_table_td",
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "email",
      render: (user: any) =>
        user?.email ? (
          <a
            href={`mailto:${user?.email}`}
            className="text-blue-500 hover:underline"
            style={{ color: "#1890ff", textDecoration: "none" }}
          >
            {user?.email}
          </a>
        ) : (
          "-"
        ),
      className: "custom_table_td",
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: any) =>
        totalAmount ? (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <img
              src={riyal}
              alt="SAR"
              style={{ width: "10px", height: "15px" }}
            />
            {formatAmount(totalAmount)}
          </span>
        ) : (
          "-"
        ),
    },

    {
      title: "Reward",
      dataIndex: "reward",
      key: "reward",
      render: (text: string) =>
        text ? (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <img
              src={riyal}
              alt="SAR"
              style={{ width: "10px", height: "15px" }}
            />
            {formatAmount(text)}
          </span>
        ) : (
          "-"
        ),
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
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Transaction) => (
        <Space>
          <Tooltip title="View">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
            />
          </Tooltip>
        </Space>
      ),
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
              showSizeChanger: true, // Allow user to change page size
              pageSizeOptions: ["25", "50", "100", "250"], // Options for different page sizes
              onShowSizeChange: (current, size) => onPageChange(current, size), // Adjust page size
            }
          : false // Hide pagination if totalItems <= 10
      }
      rowKey="key"
    />
  );
};

export default TransactionTable;
