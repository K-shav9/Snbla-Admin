import React from "react";
import { Button, Space, Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "../../styles/MerchantTable.css"; // Assuming styles remain the same
import { formatAmount, formatDateToMonthDDYYYY } from "../../utils/constants";
import riyal from "../../assets/img/riyal_icon.png";

interface Wallet {
  key: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  goalAmount?: string;
  investedAmount?: string;
  remainingAmount?: string;
  lastInvestedDate?: string;
  merchants?: any;
  user?: any;
}

interface UserWalletTableProps {
  data: Wallet[];
  loading: boolean;
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  pageSize?: number;
  onView: (record: Wallet) => void;
  onAddVoucher: (record: Wallet) => void;
  onMerchant: (record: Wallet) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

const UserWalletTable: React.FC<UserWalletTableProps> = ({
  data,
  // loading,
  pagination,
  onView,
  onAddVoucher,
  onMerchant,
  onPageChange,
}) => {
  const { isLoading } = useSelector((state: any) => state.General);

  // Define columns without Status and Action columns
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id: number) => id || "-",
      className: "custom_table_td",
    },
    {
      title: "Merchant",
      dataIndex: "merchants",
      key: "businessName",
      render: (merchants: any, record: any) =>
        merchants?.businessName ? (
          <Button
            type="link"
            onClick={() => onMerchant(record)}
            style={{ color: "#1890ff", textDecoration: "none" }} // Ant Design link styling
          >
            {merchants.businessName}
          </Button>
        ) : (
          "-"
        ),
      className: "custom_table_td",
    },

    {
      title: "Goal Amount",
      dataIndex: "targetAmount",
      key: "totalAmount",
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
      title: "Deposited Amount",
      dataIndex: "investedAmount",
      key: "investedAmount",
      render: (text: number) =>
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
      title: "Progress",
      dataIndex: "investedAmount",
      key: "progress",
      render: (investedAmount: number, record: any) => {
        const targetAmount = record?.targetAmount || 0;
        const progress =
          targetAmount > 0
            ? ((investedAmount / targetAmount) * 100).toFixed(2)
            : "0";

        return (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {progress}%
          </span>
        );
      },
    },

    {
      title: "Remaining Amount",
      dataIndex: "remainingAmount",
      key: "remainingAmount",
      render: (text: number) =>
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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => (text ? formatDateToMonthDDYYYY(text) : "-"),
    },
    {
      title: "Last Transaction",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => (text ? formatDateToMonthDDYYYY(text) : "-"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Wallet) => (
        <Space>
          <Tooltip>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
            />
          </Tooltip>
          <Tooltip title="Add Voucher">
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={() => onAddVoucher(record)}
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

export default UserWalletTable;
