import React from "react";
import { Table, Button, Space, Switch, Tooltip } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "../../styles/MerchantTable.css";
import { formatGulfNumber } from "../../utils/constants";

interface User {
  key: string;
  id?: number;
  name?: string;
  firstName: string;
  lastName: string;
  email?: string;
  dateOfBirth?: string;
  referralCode?: string;
  userName?: string;
  mobileNumber: string;
  status: string;
  gender?: string;
  dob?: string; // Consider using Date type if handling date operations
  totalRef?: number;
  rank?: number;
  referredBy?: string;
  platform?: string;
  appVersion?: string;
  registrationDate?: string;
}

interface UserTableProps {
  data: User[];
  loading: boolean;
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  pageSize?: number;
  onView: (record: User) => void;
  onEdit: (record: User) => void;
  onSendNotification: (record: User) => void;
  onDelete: (record: User) => void;
  onStatusChange: (record: User, newStatus: boolean) => void;
  onPageChange: (page: number, pageSize: number) => void;
  onSort: (field: string) => void; // ✅ Accepts a string (column name)
}

const UserTable: React.FC<UserTableProps> = ({
  data,
  loading,
  pagination,
  onView,
  onEdit,
  onDelete,
  onSendNotification,
  onStatusChange,
  onPageChange,
  onSort,
}) => {
  const { isLoading } = useSelector((state: any) => state.General);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id: number) => id || "-",
      className: "custom_table_td",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // sorter: (a: User, b: User) =>
      //   (a.name || "").localeCompare(b.name || ""),

      render: (text: string) => text || "-",
      className: "custom_table_td",
      // sorter: true, // Enables sorting
      // onHeaderCell: () => ({
      //   onClick: () => onSort("name"), // Calls sorting function
      // }),
    },
    {
      title: "Phone",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (text: string) =>
        text ? (
          <a href={`tel:${text}`} className="text-blue-500 hover:underline">
            {formatGulfNumber(text)}
          </a>
        ) : (
          "-"
        ),
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text: string) => text || "-",
      className: "custom_table_td",
    },
    {
      title: "App Version",
      dataIndex: "deviceInfo",
      key: "app_version",
      render: (deviceInfo: any) => deviceInfo?.app_version || "-",
      className: "custom_table_td",
    },
    {
      title: "Total Ref",
      dataIndex: "totalRef",
      key: "totalRef",
      render: (text: string) => text || "-",
      className: "custom_table_td",
      sorter: true, // Enables sorting
      onHeaderCell: () => ({
        onClick: () => onSort("totalRef"), // Calls sorting function
      }),
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (text: string) => text || "-",
      className: "custom_table_td",
    },
    {
      title: "Referred By",
      dataIndex: "referredBy",
      key: "referredBy",
      render: (text: string) => text || "-",
      className: "custom_table_td",
    },
    {
      title: "Platform",
      dataIndex: "deviceInfo",
      key: "platform",
      render: (deviceInfo: any) => deviceInfo?.platform || "-",
      className: "custom_table_td",
    },

    {
      title: "Status",
      dataIndex: "isActive", // Use 'isActive' for the status logic
      key: "isActive",
      render: (isActive: boolean, record: User) => (
        <Switch
          checked={isActive} // Directly bind to `isActive`
          onChange={(checked) => onStatusChange(record, checked)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
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
          <Tooltip title="Send Notification">
            <Button
              type="link"
              icon={<BellOutlined />}
              onClick={() => onSendNotification(record)} // Add notification function
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
            pageSizeOptions: ["25", "50", "100","250"], // Options for different page sizes
            onShowSizeChange: (current, size) => onPageChange(current, size), // Adjust page size
          }
          : false // Hide pagination if totalItems <= 10
      }
      rowKey="key"
    />
  );
};

export default UserTable;
