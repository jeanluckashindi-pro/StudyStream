import ExpandingButtonSidebar from "@/components/ExpandingButtonSidebar";
import { BorderLeft, BorderRight } from "@mui/icons-material";
import React from "react";
import containerStyle from "./components/containerStyle";
import HeaderHome from "./components/HeaderHome";
import MainHome from "./components/MainHome";
const Page = () => {
  return (
    <div style={containerStyle} className="custom-scrollbar">
      <HeaderHome />
      <MainHome />
    </div>
  );
};

export default Page;
