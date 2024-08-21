import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="my-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
