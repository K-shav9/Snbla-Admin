import React from "react";
import WebFooter from "./common/WebFooter";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import arrowUp from "../assets/img/arrow-up.svg";
import WebHeader from "./common/WebHeader";

const WebLayout = ({ children }: any) => {
  const { loading } = useSelector((state: any) => state?.General);

  return (
    <div className="">
      <WebHeader />
      {/* <!-- ===== Main Content Start ===== --> */}
      <main className="webmaxwidth">{children}</main>
      {/* <!-- ===== Main Content End ===== --> */}
      <WebFooter />
    </div>
  );
};

export default WebLayout;
