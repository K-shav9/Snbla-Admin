import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkuser, userLogout } from "../../actions/user";
import { setAccessToken } from "../../auth";
import { getDashboardStats, updateMerchantKey } from "../../actions/merchant";
import { Button, Card, Col, Row, Spin, Tooltip } from "antd";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { getAdminDashboardStats } from "../../actions/admin";

const Dashboard = () => {
  const dispatch: any = useDispatch();
  const user = useSelector((state: any) => state?.Auth);
  const [isKeyLoading, setIsKeyLoading] = useState(false);
  const [statsData, setStatsData] = useState({
    total_referrals: 0,
    total_users: 0,
    active_wallets: 0,
    total_transactions: 0,
  });

  useEffect(() => {
    document.title = "Dashboard | Snbla";
  }, []);

  const fetchDashboardStats = () => {
    // Fetch dashboard stats
    getAdminDashboardStats({})
      .then((response: any) => {
        if (response?.data) {
          setStatsData(response?.data); // Update the stats data
        }
      })
      .catch((error: any) => {
        console.error("Error fetching dashboard stats:", error);
      });
  };

  useEffect(() => {
    dispatch(
      checkuser((res: any) => {
        if (res?.status === 401) {
          setAccessToken("");
          localStorage.removeItem("token");
          dispatch(
            userLogout(() => {
              window.location.href = "/";
            })
          );
        }
      })
    );

    if (user?.user?.data?.roleId === 2) {
      fetchDashboardStats(); // Call API only if roleId is 2
    }
  }, [dispatch,user?.user?.data?.roleId]);

  const generateSecretKey = () => {
      setIsKeyLoading(true);
      const payload = {};
      dispatch(
        updateMerchantKey(payload, (resp: any) => {
          dispatch(
            checkuser((res: any) => {
              if (res?.status === 401) {
                localStorage.removeItem("token");
              }
              setIsKeyLoading(false);
            })
          );
        })
      );
    };

  
    const secretKey = user?.user?.data?.merchant?.secretKey;

  const stats = [
    {
      title: "Total Users",
      value: statsData.total_users || "0",
      icon: "👥",
    },
    {
      title: "Number Of Wallets",
      value: statsData.active_wallets || "0",
      icon: "💳",
    },
    {
      title: "Number Of Transactions",
      value: statsData.total_transactions || "0",
      icon: "💸",
    },
    {
      title: "Total Referrals",
      value: statsData.total_referrals || "0",
      icon: "📈",
    },
  ];

  // Aggregated Chart Data (Only showing total counts)
  const usersData = [
    { name: "Users", count: statsData.total_users },
    { name: "Transactions", count: statsData.total_transactions },
    { name: "Wallets", count: statsData.active_wallets },
    { name: "Referrals", count: statsData.total_referrals },
  ];

  const transactionsData = [
    { type: "Success", amount: 5000 },
    { type: "Failed", amount: 1500 },
    { type: "Pending", amount: 2500 },
  ];

  return (
    <div className="bg-blue-50">
      <div className="mb-6 mt-3 container-fluid">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8">
          Dashboard
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 cursor-pointer">
          {[
            {
              title: "Total Users",
              value: statsData.total_users || "0",
              icon: "👥",
            },
            {
              title: "Number of Transactions",
              value: statsData.total_transactions || "0",
              icon: "💰",
            },
            {
              title: "Number of Active Wallets",
              value: statsData.active_wallets || "0",
              icon: "📈",
            },
            {
              title: "Total Referrals",
              value: statsData.total_referrals || "0",
              icon: "💳",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-blue-700">
                  {card.title}
                </h2>
                <p className="text-2xl font-bold text-blue-900">{card.value}</p>
              </div>
              <div className="text-4xl">{card.icon}</div>
            </div>
          ))}
        </div>

        {/* Aggregated Graphs */}
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12}>
            <Card title="📈 Users Overview ">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1890ff" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="💰 Transactions Breakdown">
              <ResponsiveContainer width="100%" height={300}>
                {transactionsData.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={transactionsData}
                      dataKey="amount"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      innerRadius={70} // Donut effect
                      outerRadius={100}
                      label
                    >
                      {transactionsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.type === "Success"
                              ? "#1890ff" // Blue for Success
                              : entry.type === "Failed"
                              ? "#ff4d4f" // Red for Failed
                              : "#52c41a" // Green for Pending
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Data Available
                  </div>
                )}
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <div className="mt-8">
          {/* Secret Key Management */}
          {user?.user?.data?.roleId === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-black mb-3">
                Secret Key Management
              </h2>
              {isKeyLoading ? (
                <Spin />
              ) : (
                <div className="py-4 bg-white border-y border-borderlight flex flex-wrap items-center gap-4">
                  {!secretKey ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={generateSecretKey}
                    >
                      Generate Secret Key
                    </Button>
                  ) : (
                    <div className="bg-gray-100 p-4 rounded-lg text-black w-full">
                      <span className="text-sm font-medium">Secret Key:</span>
                      <span className="text-base ml-5 font-semibold text-black">
                        {secretKey}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
