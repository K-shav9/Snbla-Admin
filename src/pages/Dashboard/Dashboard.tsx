import React, { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../../actions/admin";
import { useNavigate } from "react-router-dom";
import { checkuser, userLogout } from "../../actions/user";
import { setAccessToken } from "../../auth";
import { useDispatch } from "react-redux";
import { Card, Row, Col } from "antd";
import riyal from "../../assets/img/riyal_icon.png";
import { formatAmount } from "../../utils/constants";

const Dashboard = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const [statsData, setStatsData] = useState({
    total_users: 0,
    total_merchants: 0,
    total_transactions: 0,
    total_wallets: 0,
    total_transaction_amounts: 0,
    total_rewards: 0,
    welcome_bonus_amounts: 0,
    referral_rewards_amounts: 0,
  });

  useEffect(() => {
    document.title = "Dashboard | Snbla";

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

    getAdminDashboardStats({})
      .then((response: any) => {
        if (response?.data) {
          setStatsData(response?.data);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching dashboard stats:", error);
      });
  }, []);

  // Aggregated Chart Data (Only showing total counts)
  const usersData = [
    { name: "Users", count: statsData.total_users },
    { name: "Merchants", count: statsData.total_merchants },
    { name: "Transactions", count: statsData.total_transactions },
    { name: "Wallets", count: statsData.total_wallets },
  ];

  const transactionsData = [
    { type: "Success", amount: 5000 },
    { type: "Failed", amount: 1500 },
    { type: "Pending", amount: 2500 },
  ];

  return (
    <div className="bg-blue-50">
      <div className="mb-6 mt-3 container-fluid">
        <h1 className="text-3xl font-semibold text-blue-800 mb-8">Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 cursor-pointer">
          {[
            {
              title: "Total Users",
              value: statsData?.total_users || "0",
              icon: "👥",
              onClick: () => navigate("/admin/users"),
            },
            {
              title: "Total Merchants",
              value: statsData?.total_merchants || "0",
              icon: "💳",
              onClick: () => navigate("/admin/merchants"),
            },
            {
              title: "Number of Transactions",
              value: statsData?.total_transactions || "0",
              icon: "💰",
              // onClick: () => navigate("/admin/transactions"),
            },
            {
              title: "Number of Active Wallets",
              value: statsData?.total_wallets || "0",
              icon: "📈",
              onClick: () => navigate("/admin/wallets"),
            },

            // {
            //   title: "Transactions Amounts",
            //   value: statsData?.total_transaction_amounts
            //     ? statsData?.total_transaction_amounts.toFixed(2)
            //     : "0.00",
            //   icon: "💰", // Users
            //   // onClick: () => navigate("/admin/users"),
            // },
            {
              title: "Transactions Amounts",
              value: (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <img
                    src={riyal}
                    alt="SAR"
                    style={{
                      width: "25px",
                      height: "25px",
                      verticalAlign: "middle",
                    }}
                  />
                  {statsData?.total_transaction_amounts
                    ? `${formatAmount(statsData.total_transaction_amounts.toFixed(2))}`
                    : "0.00"}
                </span>
              ),
            },

            {
              title: "Total Rewards",
              value: (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <img
                    src={riyal}
                    alt="SAR"
                    style={{
                      width: "25px",
                      height: "25px",
                      verticalAlign: "middle",
                    }}
                  />
                  {statsData?.total_rewards
                    ? `${formatAmount(statsData.total_rewards.toFixed(2))}`
                    : "0.00"}
                </span>
              ),
            },
            {
              title: "Welcome Bonus Amounts",
              value: (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <img
                    src={riyal}
                    alt="SAR"
                    style={{
                      width: "25px",
                      height: "25px",
                      verticalAlign: "middle",
                    }}
                  />
                  {statsData?.welcome_bonus_amounts
                    ? `${formatAmount(statsData.welcome_bonus_amounts.toFixed(2))}`
                    : "0.00"}
                </span>
              ),
            },
            {
              title: "Referral Rewards Amounts",
              value: (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <img
                    src={riyal}
                    alt="SAR"
                    style={{
                      width: "25px",
                      height: "25px",
                      verticalAlign: "middle",
                    }}
                  />
                  {statsData?.referral_rewards_amounts
                    ? `${formatAmount(statsData.referral_rewards_amounts.toFixed(2))}`
                    : "0.00"}
                </span>
              ),
            },
          ].map((card, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg flex items-center justify-between"
              onClick={card.onClick}
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
        {/* <Row gutter={[10, 10]}>
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
        </Row> */}
      </div>
    </div>
  );
};

export default Dashboard;