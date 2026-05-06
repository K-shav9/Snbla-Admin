import React from "react";
import { Table } from "antd";

// The CommonTable component
const CommonTable = ({ userType, dataSource }) => {
  // Define columns based on userType
  const columns =
    userType === "admin"
      ? [
          {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
          },
          {
            title: "Username",
            dataIndex: "username",
            key: "username",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
          },
        ]
      : [
          {
            title: "Order ID",
            dataIndex: "orderId",
            key: "orderId",
          },
          {
            title: "Product",
            dataIndex: "product",
            key: "product",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
          },
          {
            title: "Price",
            dataIndex: "price",
            key: "price",
          },
        ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={userType === "admin" ? "userId" : "orderId"}
    />
  );
};

export default CommonTable;
