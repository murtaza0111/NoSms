import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const NotFound = () => {
  return (
    <>
      <Nav isActive={"notfound"} />
      <div>Not Found</div>
      <Footer />
    </>
  );
};

export default NotFound;
