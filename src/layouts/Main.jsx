import { Outlet } from "react-router-dom"
import Navber from "../components/Shared/Navber/Navber"
import Footer from "../components/Shared/Footer/Footer";

const Main = () => {
  return (
    <>
      <Navber />
      <div className="pt-24 min-h-[calc(100vh-60px)]">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
}

export default Main
