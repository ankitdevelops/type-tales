import React from "react";
import LeftPanel from "../components/LeftPanel";
import MiddlePanel from "../components/MiddlePanel";
import RightPanel from "../components/RightPanel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBars } from "react-icons/fa";
import FloatingMenu from "../components/FloatingMenu";

const HomePage = () => {
  return (
    <>
      <div className="container mx-auto px-4 my-4 ">
        <div className="grid md:grid-cols-12 gap-4 mx-auto h-[87vh] overflow-hidden">
          <LeftPanel />
          <MiddlePanel />
          <RightPanel />
        </div>
        <FloatingMenu />
      </div>
    </>
  );
};

export default HomePage;
