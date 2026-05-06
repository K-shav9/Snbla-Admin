import React from "react";
import { Table, Button, Space, Switch } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "../../styles/MerchantTable.css";

// interface Notification {
//   key: string;
 
// }

interface NOtificationTableProps {
  data: Notification[];
  loading: boolean;
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
//   pageSize?: number;
//   onView: (record: Notification) => void;
//   onEdit: (record: Notification) => void;
//   onDelete: (record: Notification) => void;
//   onReset: (record: Notification) => void;
//   onStatusChange: (record: Notification, newStatus: boolean) => void;
  onPageChange: (page: number, pageSize: number) => void;
}


const NotificationTable: React.FC<NOtificationTableProps> = ({
  data,
  pagination,
//   onView,
//   onEdit,
//   onDelete,
//   onReset,
//   onStatusChange,
  onPageChange,
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
      title: "Mobile",
      dataIndex: "user",
      key: "mobileNumber",
      render: (user: any) => user?.mobileNumber || "-",
      className: "custom_table_td",
    },
    {
      title: "Title En",
      dataIndex: "title_en",
      key: "title_en",
      className: "custom_table_td",
    },

    {
      title: "Title Ar",
      dataIndex: "title_ar",
      key: "title_ar",
      render: (text: string) => text || "-",
      className: "custom_table_td",
    },
    {
      title: "Description En",
      dataIndex: "description_en",
      key: "description_en",
      render: (text: string) => text || "-",
    },
    {
      title: "Description Ar",
      dataIndex: "descriptionAr", // This is where we reference the 'merchant' object
      key: "descriptionAr",
      render: (text: string) => text || "-",
      className: "custom_table_td",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        text ? new Date(text).toLocaleDateString() : "-",
      className: "custom_table_td",
    },

    {
      title: "Img",
      dataIndex: "img", // This is where we reference the 'merchant' object
      key: "img",
      render: (text: string) => text || "-",
      className: "custom_table_td",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let style = {};
        let text = "";

        switch (status) {
          case "sent":
            style = {
              backgroundColor: "green",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            };
            text = "Sent";
            break;
          case "failed":
            style = {
              backgroundColor: "red",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            };
            text = "Failed";
            break;
          case "pending":
            style = {
              backgroundColor: "orange",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            };
            text = "Pending";
            break;
          default:
            style = {
              backgroundColor: "gray",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            };
            text = "Unknown";
        }

        return <span style={style}>{text}</span>;
      },
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_: any, record: Notification) => (
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
        (pagination.totalItems || 0) > 10
          ? {
              total: pagination.totalItems || 0,
              current: pagination.currentPage || 1,
              pageSize: pagination.pageSize || 10,
              onChange: onPageChange, // Handles page change
              showSizeChanger: false, // Prevent user from changing page size
            }
          : false // Hide pagination if totalItems <= 10
      }
      rowKey="key"
    />
  );
};

export default NotificationTable;
