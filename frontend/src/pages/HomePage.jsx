import React from "react";
import LeftPanel from "../components/LeftPanel";
import MiddlePanel from "../components/MiddlePanel";
import RightPanel from "../components/RightPanel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 my-4 ">
        <div className="grid md:grid-cols-12 gap-4 mx-auto h-[90vh] overflow-hidden">
          <LeftPanel />
          <MiddlePanel />
          <RightPanel />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
