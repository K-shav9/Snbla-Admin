import React from "react";
import { Button, Space, Table } from "antd";
import { useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Package {
  id?: number; // Optional during creation
  title?: string;
  totalAmount?: number;
  offerPercentage?: number;
  saveOnEveryDepo?: number;
  recurringOff?: number;
  icon?: string;
  category?: string;
  merchant?: {
    id?: number;
    businessName?: string;
    website?: string | null;
    description?: string;
  };
}

interface PackageTableProps {
  data: Package[];
  loading: boolean;
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  onEdit: (record: Package) => void;
  onDelete: (record: Package) => void;
  pageSize?: number;
  onPageChange: (page: number, pageSize: number) => void;
}

const PackageTable: React.FC<PackageTableProps> = ({
  data,
  loading,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
}) => {
  const { isLoading } = useSelector((state: any) => state.General);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => text || "-",
      className: "custom_table_td",
    },
    {
      title: " Goal Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text: number) => (text ? `${text} SAR` : "-"),
      className: "custom_table_td",
    },
    {
      title: "Reward Percentage",
      dataIndex: "offerPercentage",
      key: "offerPercentage",
      render: (text: string) => (text ? `${text} %` : "-"),
      className: "custom_table_td",
    },
    {
      title: "Additional Discount Recurring",
      dataIndex: "recurringOff",
      key: "recurringOff",
      render: (text: string) => (text ? `${text} %` : "-"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Package) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
          />
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
              showSizeChanger: false, // Allow user to change page size
              // pageSizeOptions: ["10", "20", "30", "50", "100"], // Options for different page sizes
              onShowSizeChange: (current, size) => onPageChange(current, size), // Adjust page size
            }
          : false // Hide pagination if totalItems <= 10
      }
      rowKey="key"
    />
  );
};

export default PackageTable;
