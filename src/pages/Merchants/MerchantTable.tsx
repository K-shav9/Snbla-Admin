import React from "react";
import { Table, Button, Space, Switch, Tooltip } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "../../styles/MerchantTable.css";
import { NavLink } from "react-router-dom";
import riyal from "../../assets/img/riyal_icon.png";
import { formatAmount, formatGulfNumber } from "../../utils/constants";

interface Merchant {
  key: string;
  id?: number;
  name: string;
  email: string;
  mobileNumber: string;
  commercialRegistrationNumber?: string;
  businessName?: string;
  activeWallets?: string;
  escrowAmount?: string;
  status: string;
  merchant: any;
}

interface MerchantTableProps {
  data: Merchant[];
  loading: boolean;
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  pageSize?: number;
  onView: (record: Merchant) => void;
  onEdit: (record: Merchant) => void;
  onDelete: (record: Merchant) => void;
  onReset: (record: Merchant) => void;
  onWallet: (record: Merchant) => void;
  onStatusChange: (record: Merchant, newStatus: boolean) => void;
  onPageChange: (page: number, pageSize: number) => void;
  onSort: (field: string) => void;

}

const MerchantTable: React.FC<MerchantTableProps> = ({
  data,
  loading,
  pagination,
  onView,
  onEdit,
  onDelete,
  onReset,
  onWallet,
  onStatusChange,
  onPageChange,
  onSort
}) => {
  const { isLoading } = useSelector((state: any) => state.General);
  const columns = [
    {
      title: "Id",
      dataIndex: "merchant",
      key: "id",
      render: (merchant: any) => merchant?.id || "-",
      className: "custom_table_td",
    },
    {
      title: "Business Name",
      dataIndex: "merchant",
      key: "businessName",
      render: (merchant: any, record: any) =>
        merchant?.businessName ? (
          <Button
            type="link"
            onClick={() => onView(record)}
            style={{ color: "#1890ff", textDecoration: "none" }}
          >
            {merchant?.businessName}
          </Button>
        ) : (
          "-"
        ),
      className: "custom_table_td",
    },

    {
      title: "Contact Person",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) =>
        record.name ||
        `${record.firstName || ""} ${record.lastName || ""}`.trim() ||
        "-",
      className: "custom_table_td",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) =>
        text ? (
          <a
            href={`mailto:${text}`}
            className="text-blue-500 hover:underline"
            style={{ color: "#1890ff", textDecoration: "none" }}
          >
            {text}
          </a>
        ) : (
          "-"
        ),
      className: "custom_table_td",
    },
    {
      title: "Phone",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (text: string) =>
        text ? (
          <a href={`tel:+${text}`} className="text-blue-500 hover:underline">
            {formatGulfNumber(text)}
          </a>
        ) : (
          "-"
        ),
      className: "custom_table_td",
    },

    {
      title: "Active Wallets",
      dataIndex: "activeWalletCount",
      key: "activeWalletCount",
      render: (text: string, record: any) =>
        text ? (
          <Button
            type="link"
            onClick={() => onWallet(record)}
            style={{ color: "#1890ff", textDecoration: "none" }} // Ant Design link styling
          >
            {text}
          </Button>
        ) : (
          "-"
        ),
      className: "custom_table_td",
    },
    {
      title: "Escrow Amount",
      dataIndex: "escrowAmount",
      key: "escrowAmount",
      sorter: true, // Enables sorting
      onHeaderCell: () => ({
        onClick: () => onSort("escrowAmount"), // Calls sorting function
      }),
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
                alt="Escrow Icon"
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
      title: "Status",
      dataIndex: "isActive", // Use 'isActive' for the status logic
      key: "isActive",
      render: (isActive: boolean, record: Merchant) => (
        <Switch
          checked={isActive} // Directly bind to `isActive`
          onChange={(checked) => onStatusChange(record, checked)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Merchant) => (
        <Space>
          <Tooltip title="View">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
            />
          </Tooltip>
          <Tooltip title="Reset Password">
            <Button
              type="link"
              icon={<KeyOutlined />}
              onClick={() => onReset(record)}
            />
          </Tooltip>{" "}
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

export default MerchantTable;
