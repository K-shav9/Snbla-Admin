import React from "react";
import { Button, Space, Table } from "antd";
import { useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../../styles/MerchantTable.css"; // Assuming styles remain the same
import { formatDateToMonthDDYYYY } from "../../../utils/constants";

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
}


interface WalletTableProps {
  data: Wallet[];
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

const WalletTable: React.FC<WalletTableProps> = ({
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
      {
        title: "Business Name",
        dataIndex: "merchants",
        key: "businessName",
        render: (merchants: any) => merchants?.businessName || "-",
        className: "custom_table_td",
      },
      {
        title: "Email",
        dataIndex: "user",
        key: "email",
        render: (user: any) => user?.email || "-",
        className: "custom_table_td",
      },
      {
        title: "Goal Amount",
        dataIndex: "targetAmount",
        key: "targetAmount",
        render: (text: number) => (text ? `${text} SAR` : "-"),
      },
      {
        title: "Invested Amount",
        dataIndex: "balance",
        key: "balance",
        render: (text: number) => (text ? `${text} SAR` : "-"),
      },
      {
        title: "Remaining Amount",
        dataIndex: "remainingAmount",
        key: "remainingAmount",
        render: (text: number) => (text ? `${text} SAR` : "-"),
      },
      {
        title: "Last Invested Date",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (text: string) => (text ? formatDateToMonthDDYYYY(text) : "-"),
      },
      // {
      //   title: "Action",
      //   key: "action",
      //   render: (_: any, record: Wallet) => (
      //     <Space>
      //       <Button
      //         type="link"
      //         icon={<EyeOutlined />}
      //         // onClick={() => onView(record)}
      //       />
      //       <Button
      //         type="link"
      //         icon={<EditOutlined />}
      //         // onClick={() => onEdit(record)}
      //       />
      //       <Button
      //         type="link"
      //         danger
      //         icon={<DeleteOutlined />}
      //         // onClick={() => onDelete(record)}
      //       />
      //     </Space>
      //   ),
      // },
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

export default WalletTable;
